import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { formatNumberWithSpaces } from "../../utils";
import { plural } from "../../utils";
import "./style.css";

function Controls(props) {
  const cn = bem("Controls");

  return (
    <div className="Controls">
      <div>
        В корзине:{" "}
        <span className={cn("total")}>
          {props.total.count}{" "}
          {plural(props.total.count, {
            one: "товар",
            few: "товаров",
            many: "товара",
          })}{" "}
          / {formatNumberWithSpaces(props.total.price)} ₽
        </span>
      </div>
      <button onClick={() => props.showCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  total: PropTypes.object,
  showCart: PropTypes.func,
};

Controls.defaultProps = {
  showCart: () => {},
};

export default React.memo(Controls);
