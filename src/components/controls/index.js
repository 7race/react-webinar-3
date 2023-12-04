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
        {!!props.cartSummary.uniqueProductsCount ? (
          <span className={cn("cartSummary")}>
            {props.cartSummary.uniqueProductsCount}{" "}
            {plural(props.cartSummary.uniqueProductsCount, {
              one: "товар",
              few: "товаров",
              many: "товара",
            })}{" "}
            / {formatNumberWithSpaces(props.cartSummary.totalCost)} ₽
          </span>
        ) : (
          <span className={cn("cartSummary")}>пусто</span>
        )}
      </div>
      <button onClick={() => props.showCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  cartList: PropTypes.array,
  cartSummary: PropTypes.object,
  showCart: PropTypes.func,
};

Controls.defaultProps = {
  showCart: () => {},
};

export default React.memo(Controls);
