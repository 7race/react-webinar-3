import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List(props) {
  return (
    <div className={`${props.className}`}>
      {props.list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            type={props.type}
            onAddItemToCartList={props.action.callback}
            actionType={props.action.actionType}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  action: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(List);
