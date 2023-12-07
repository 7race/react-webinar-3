import React, { useState, useEffect, useCallback, memo } from "react";
import useStore from "../../store/use-store";
import List from "../list";
import useSelector from "../../store/use-selector";
import Item from "../item";
import Pagination from "./pagination";
import "./style.css";

function ArticlesWithPagination() {
  const store = useStore();
  const articles = useSelector((state) => state.catalog.list);
  const [totalCount, setTotalCount] = useState(null);

  const callbacks = {
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  const handlePageChange = (item) => {
    store.actions.catalog.setArticles({ limit: 10, skip: (item - 1) * 10 });
  };

  useEffect(() => {
    store.actions.catalog.setArticles({ limit: 10, skip: 0 });
    store.actions.catalog
      .getTotalCount()
      .then((totalCount) => setTotalCount(totalCount));
  }, []);

  return (
    <div>
      <List list={articles} renderItem={renders.item} />
      {!!totalCount && (
        <Pagination totalItems={totalCount} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

export default memo(ArticlesWithPagination);
