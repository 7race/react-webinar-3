import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head(props) {
  return (
    <div className="Head">
      <h1>{props.title}</h1>
      {props.type === "cart" && (
        <div>
          <button onClick={props.hideCart}>Закрыть</button>
        </div>
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  type: PropTypes.string,
  hideCart: PropTypes.func,
};

export default React.memo(Head);
