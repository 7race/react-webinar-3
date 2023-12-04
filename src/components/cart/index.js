import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import List from "../list";
import { formatNumberWithSpaces } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Cart = (props) => {
  const cn = bem("Cart");

  return (
    <div className={cn()}>
      <Head title={props.title} type={props.type} hideCart={props.hideCart} />
      {!!props.cartSummary.uniqueProductsCount && (
        <List
          className={cn("content")}
          list={props.cartList}
          type={props.type}
          action={{
            actionType: "Удалить",
            callback: props.onDeleteItemFromCartList,
          }}
        />
      )}
      <div className={cn("subtitle")}>
        Итого{" "}
        <span>{formatNumberWithSpaces(props.cartSummary.totalCost)}₽</span>
      </div>
    </div>
  );
};

Cart.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  cartSummary: PropTypes.object,
  cartList: PropTypes.array,
  onDeleteItemFromCartList: PropTypes.func,
  hideCart: PropTypes.func,
};

export default React.memo(Cart);
