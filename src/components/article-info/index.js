import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/use-store";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
function ArticleInfo() {
  const { id } = useParams();
  const store = useStore();
  const [articleInfo, setArticleInfo] = useState(null);

  const cn = bem("ArticleInfo");

  useEffect(() => {
    store.actions.catalog.getArticleInfoById({ id }).then((articleInfo) => {
      setArticleInfo({
        title: articleInfo.title,
        description: articleInfo.description,
        madeIn: articleInfo.madeIn.title,
        category: articleInfo.category.title,
        edition: articleInfo.edition,
        price: articleInfo.price,
      });
    });
  }, []);

  const callbacks = {
    addToBasket: useCallback(
      (_id) => {
        store.actions.basket.addToBasket(_id);
      },
      [store]
    ),
  };

  return (
    !!articleInfo && (
      <div className={cn()}>
        <p>{articleInfo.description}</p>
        <p>
          Страна производитель:{" "}
          <span className={cn("info")}>{articleInfo.madeIn}</span>
        </p>
        <p>
          Категория: <span className={cn("info")}>{articleInfo.category}</span>
        </p>
        <p>
          Год выпуска: <span className={cn("info")}>{articleInfo.edition}</span>
        </p>
        <p className={cn("price")}>
          <span className={cn("info")}>Цена:</span>
          <span className={cn("info")}>{articleInfo.price} ₽</span>
        </p>
        <button onClick={() => callbacks.addToBasket(id)}>Добавить</button>
      </div>
    )
  );
}

export default ArticleInfo;
