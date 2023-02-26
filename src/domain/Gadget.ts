import Buyable from './Buyable';

export default class Gadget implements Buyable {
  quantity: number;
  constructor(
    readonly id: number,
    readonly name: string,
    quantity: number,
    readonly multiple: boolean,
    readonly price: number,
  ) {
    this.quantity = quantity;
  }
}