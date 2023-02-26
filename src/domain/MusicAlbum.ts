import Buyable from './Buyable';

export default class MusicAlbum implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly quantity: number,
    readonly author: string,
    readonly multiple: boolean,
    readonly price: number,
  ) { }
}