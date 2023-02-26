import Buyable from '../domain/Buyable';

export default class Cart {
  private _items: Buyable[] = [];

  add(item: Buyable): void {
    const itemName = item.name;
    const isAlreadyInCart = (item: Buyable) => item.name === itemName;
    const itemsIndex = this._items.findIndex(isAlreadyInCart);

    if (itemsIndex === -1) {
      this._items.push(item);
    } else if (itemsIndex !== -1) {
      if (item.multiple === true) {
        this._items[itemsIndex].quantity += 1
      } else {
        throw new Error('Товар продается в единственном экземпляре!');
      }
    }
  }

  reduce(item: Buyable): void {
    const itemName = item.name;
    const isAlreadyInCart = (item: Buyable) => item.name === itemName;
    const itemsIndex = this._items.findIndex(isAlreadyInCart);

    if (this._items[itemsIndex].quantity === 1) {
      throw new Error('Нажмите "Удалить товар из корзины"');
    } else {
      this._items[itemsIndex].quantity -= 1;
    }
  }

  get items(): Buyable[] {
    return [...this._items];
  }

  getTotalCost(): number{
    let result: number = 0;
    this._items.forEach((item) => result += item.price)
    return result;
  }

  getCostWithDiscount(discount: number): number {
    let totalCost = this.getTotalCost();
    return totalCost -= (totalCost * discount / 100);
  }

  deleteFromCart(id: number): void {
    const itemToDelete = this._items.findIndex(item => item.id === id);
    this._items.splice(itemToDelete, 1);
  }
}