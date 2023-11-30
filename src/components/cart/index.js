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
      {!!props.cartList.length && (
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
        Итого <span>{formatNumberWithSpaces(props.total.price)}₽</span>
      </div>
    </div>
  );
};

Cart.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  total: PropTypes.object,
  cartList: PropTypes.array,
  onDeleteItemFromCartList: PropTypes.func,
  hideCart: PropTypes.hideCart,
};

export default React.memo(Cart);
