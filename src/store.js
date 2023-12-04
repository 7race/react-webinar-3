/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  getCartList() {
    return this.state.cartList;
  }

  getCartSummary() {
    return this.state.cartSummary;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addItemToCartList(item) {
    const cartList = this.getCartList();
    const existingItem = cartList.find(
      (cartItem) => cartItem.code === item.code
    );

    if (existingItem) {
      existingItem.count++;
    } else {
      cartList.push({ ...item, count: 1 });
    }

    this.setState({
      ...this.state,
      cartList: [...cartList],
    });
  }

  deleteItemFromCartList(item) {
    const cartList = this.getCartList();
    const updatedCartList = cartList.filter(
      (cartItem) => cartItem.code !== item.code
    );

    this.setState({
      ...this.state,
      cartList: [...updatedCartList],
    });
  }

  calculateCartSummary(arr) {
    let totalCost = 0;
    let totalItemCount = 0;

    for (let i = 0; i < arr.length; i++) {
      totalCost += arr[i].price * arr[i].count;
      totalItemCount += arr[i].count;
    }

    this.setState({
      ...this.state,
      cartSummary: {
        uniqueProductsCount: arr.length,
        totalCost,
        totalItemCount,
      },
    });
  }
}

export default Store;
