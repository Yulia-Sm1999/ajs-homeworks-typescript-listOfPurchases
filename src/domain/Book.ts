import Buyable from './Buyable';

export default class Book implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly quantity: number,
    readonly author: string,
    readonly price: number,
    readonly multiple: boolean,
    readonly pages: number,
  ) { }
}