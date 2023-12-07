import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
function Pagination({ totalItems, onPageChange }) {
  const [leftItems, setLeftItems] = useState([1, 2, 3]);
  const [centerItems, setCenterItems] = useState([]);
  const [rightItems, setRightItems] = useState([totalItems]);
  const [selectedItem, setSelectedItem] = useState(leftItems[0]);
  const cn = bem("Pagination");

  const handleClick = (item) => {
    setSelectedItem(item);

    const leftItemsBase = [1];
    const centerItemsBase = [];
    const rightItemsBase = [totalItems];

    if (item < 3) {
      setLeftItems([...leftItemsBase, 2, 3]);
      setCenterItems(centerItemsBase);
      setRightItems(rightItemsBase);
    } else if (item === 3) {
      setLeftItems([...leftItemsBase, 2, 3, 4]);
      setCenterItems(centerItemsBase);
    } else if (item > 3 && item < totalItems - 2) {
      setLeftItems(leftItemsBase);
      setCenterItems([item - 1, item, item + 1]);
      setRightItems(rightItemsBase);
    } else if (item >= totalItems - 2 && item < totalItems - 1) {
      setLeftItems(leftItemsBase);
      setCenterItems(centerItemsBase);
      setRightItems([
        totalItems - 3,
        totalItems - 2,
        totalItems - 1,
        totalItems,
      ]);
    } else if (item >= totalItems - 1) {
      setLeftItems(leftItemsBase);
      setCenterItems(centerItemsBase);
      setRightItems([totalItems - 2, totalItems - 1, totalItems]);
    }

    onPageChange(item);
  };

  return (
    <nav aria-label="pagination">
      <ul className={cn()}>
        {leftItems.map((item, key) => (
          <li
            key={key}
            onClick={() => handleClick(item)}
            className={
              item === selectedItem
                ? cn("Item", { selected: true })
                : cn("Item")
            }
          >
            {item}
          </li>
        ))}
        {centerItems.length === 0 ? (
          <span className={cn("Skip")}>...</span>
        ) : (
          <>
            <span className={cn("Skip")}>...</span>
            {centerItems.map((item, key) => (
              <li
                key={key}
                onClick={() => handleClick(item)}
                className={
                  item === selectedItem
                    ? cn("Item", { selected: true })
                    : cn("Item")
                }
              >
                {item}
              </li>
            ))}
            <span className={cn("Skip")}>...</span>
          </>
        )}
        {rightItems.map((item, key) => (
          <li
            key={key}
            onClick={() => handleClick(item)}
            className={
              item === selectedItem
                ? cn("Item", { selected: true })
                : cn("Item")
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
