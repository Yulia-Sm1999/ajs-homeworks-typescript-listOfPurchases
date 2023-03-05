import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Gadget from '../domain/Gadget';

test('should show movie from Cart', () => {
  const cart = new Cart();
  cart.add(new Movie(1005, 'Мстители', 2012, 'США', '"Avengers Assemble!"', ['фантастика','боевик', 'фэнтези', 'приключения'], '137 мин. / 2:17', 450));
  expect(cart.items).toEqual([{
    id: 1005,
    name: 'Мстители',
    quantity: 1,
    year: 2012,
    country: 'США',
    slogan: '"Avengers Assemble!"',
    genre: ['фантастика','боевик', 'фэнтези', 'приключения'],
    duration: '137 мин. / 2:17',
    multiple: false,
    price: 450,
  }]);
});

test('should show totalCost without discount', () => {
  const cart = new Cart();
  cart.add(new Movie(1005, 'Мстители', 2012, 'США', '"Avengers Assemble!"', ['фантастика','боевик', 'фэнтези', 'приключения'], '137 мин. / 2:17', 450));
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  expect(cart.getTotalCost()).toBe(3350);
});

test('should show totalCost with discount', () => {
  const cart = new Cart();
  cart.add(new Movie(1005, 'Мстители', 2012, 'США', '"Avengers Assemble!"', ['фантастика','боевик', 'фэнтези', 'приключения'], '137 мин. / 2:17', 450));
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  expect(cart.getCostWithDiscount(10)).toBe(3015);
});

test('should delete item from cart', () => {
  const cart = new Cart();
  cart.add(new Movie(1005, 'Мстители', 2012, 'США', '"Avengers Assemble!"', ['фантастика','боевик', 'фэнтези', 'приключения'], '137 мин. / 2:17', 450));
  cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  cart.deleteFromCart(1001);
  expect(cart.items.length).toBe(2);
  expect(cart.items).toEqual([{
    id: 1005,
    name: 'Мстители',
    quantity: 1,
    year: 2012,
    country: 'США',
    slogan: '"Avengers Assemble!"',
    genre: ['фантастика','боевик', 'фэнтези', 'приключения'],
    duration: '137 мин. / 2:17',
    multiple: false,
    price: 450,
  },{
    id: 1008,
    name: 'Meteora',
    quantity: 1,
    author: 'Linkin Park',
    multiple: false,
    price: 900,
  }
  ]);
});

test('should multiply gadget', () => {
  const cart = new Cart();
  cart.add(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000));
  cart.add(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000));
  expect(cart.items).toEqual([{
    id: 1015,
    name: 'Ноутбук ASUS 128Гб, 15,6"',
    quantity: 2,
    multiple: true,
    price: 55000,
  }]);
});

test('should not reduce the quantity of gadget', () => {
  const cart = new Cart();
  cart.add(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000));
  expect(() => cart.reduce(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000))).toThrow(new Error('Нажмите "Удалить товар из корзины"'));
});

test('should reduce the quantity of gadget', () => {
  const cart = new Cart();
  cart.add(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000));
  cart.add(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000));
  cart.add(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000));
  cart.reduce(new Gadget(1015, 'Ноутбук ASUS 128Гб, 15,6"', 1, true, 55000))
  expect(cart.items).toEqual([{
    id: 1015,
    name: 'Ноутбук ASUS 128Гб, 15,6"',
    quantity: 2,
    multiple: true,
    price: 55000,
  }]);
});

test('should not add item that cannot be multiply', () => {
  const cart = new Cart();
  cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
  expect(() => cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900))).toThrow(new Error('Товар продается в единственном экземпляре!'));
});