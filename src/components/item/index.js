import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatNumberWithSpaces } from "../../utils";
import "./style.css";

function Item(props) {
  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onAddItemToCartList(props.item);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-content">
        <div className="Item-title">{props.item.title}</div>
        <div className="Item-actions">
          <div>{formatNumberWithSpaces(props.item.price)} ₽</div>
          {props.type === "cart" && <span>{props.item.count} шт</span>}
          <button onClick={callbacks.onClick}>{props.actionType}</button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
  }).isRequired,
  onAddItemToCart: PropTypes.func,
};

Item.defaultProps = {
  onAddItemToCart: () => {},
};

export default React.memo(Item);
