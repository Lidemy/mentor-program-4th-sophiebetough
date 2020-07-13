const request = require('request');

request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    let book;
    try {
      book = JSON.parse(body);
      for (let i = 0; i < book.length; i += 1) {
        console.log(`${book[i].id} ${book[i].name}`);
      }
    } catch (e) {
      console.log(e);
    }
  },
);
