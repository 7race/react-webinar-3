import React, { useState, useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Overlay from "./components/overlay";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const list = store.getState().list;
  const cartList = store.getCartList();

  const [total, setTotal] = useState({
    price: 0,
    count: 0,
  });

  const [isCartShowed, setIsCartShowed] = useState(false);

  const callbacks = {
    onAddItemToCartList: useCallback(
      (item) => {
        store.addItemToCartList(item);
        const total = calculateTotal(cartList);
        setTotal(total);
      },
      [store, cartList]
    ),

    onDeleteItemFromCartList: useCallback(
      (item) => {
        store.deleteItemFromCartList(item);
        total.price = total.price - item.price * item.count;
        total.count -= item.count;

        setTotal(total);
      },
      [store, cartList]
    ),

    onShowCart: useCallback(() => {
      setIsCartShowed(true);
    }),

    onHideCart: useCallback(() => {
      setIsCartShowed(false);
    }),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls total={total} showCart={callbacks.onShowCart} />
      <List
        list={list}
        action={{
          actionType: "Добавить",
          callback: callbacks.onAddItemToCartList,
        }}
      />
      {isCartShowed && (
        <Overlay>
          <Cart
            title="Корзина"
            type="cart"
            total={total}
            cartList={cartList}
            onDeleteItemFromCartList={callbacks.onDeleteItemFromCartList}
            hideCart={callbacks.onHideCart}
          />
        </Overlay>
      )}
    </PageLayout>
  );
}

function calculateTotal(arr) {
  let totalPrice = 0;
  let totalCount = 0;

  for (let i = 0; i < arr.length; i++) {
    totalPrice += arr[i].price * arr[i].count;
    totalCount += arr[i].count;
  }

  return {
    price: totalPrice,
    count: totalCount,
  };
}

export default App;
