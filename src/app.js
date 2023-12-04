import React, { useState, useEffect, useCallback } from "react";
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
  const cartSummary = store.getCartSummary();

  const [isCartShowed, setIsCartShowed] = useState(false);

  const callbacks = {
    onAddItemToCartList: useCallback(
      (item) => {
        store.addItemToCartList(item);
      },
      [store, cartList]
    ),

    onDeleteItemFromCartList: useCallback(
      (item) => {
        store.deleteItemFromCartList(item);
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

  useEffect(() => {
    store.calculateCartSummary(cartList);
  }, [cartList, store]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        cartList={cartList}
        cartSummary={cartSummary}
        showCart={callbacks.onShowCart}
      />
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
            cartSummary={cartSummary}
            cartList={cartList}
            onDeleteItemFromCartList={callbacks.onDeleteItemFromCartList}
            hideCart={callbacks.onHideCart}
          />
        </Overlay>
      )}
    </PageLayout>
  );
}

export default App;
