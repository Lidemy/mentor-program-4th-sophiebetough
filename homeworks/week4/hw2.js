const request = require('request');
const process = require('process');

if (process.argv[2] === 'list') {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      let bookList;
      try {
        bookList = JSON.parse(body);
        for (let i = 0; i < bookList.length; i += 1) {
          console.log(`${bookList[i].id} ${bookList[i].name}`);
        }
      } catch (e) {
        console.log(e);
      }
    },
  );
}

if (process.argv[2] === 'read') {
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      let book;
      try {
        book = JSON.parse(body);
        console.log(`${book.id} ${book.name}`);
      } catch (e) {
        console.log(e);
      }
    },
  );
}

if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: { name: `${process.argv[3]}` },
    },
    (error, response, body) => {
      console.log(body);
    },
  );
}

if (process.argv[2] === 'delete') {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response) => {
      console.log('status code:', response.statusCode);
    },
  );
}

if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: { name: `${process.argv[4]}` },
    },
    (error, response, body) => {
      console.log(body);
    },
  );
}
