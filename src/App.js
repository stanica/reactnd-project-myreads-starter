import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import BookCase from './BookCase';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
    .catch(e => console.log('There was an error getting all books'))
  }

  componentDidMount() {
    this.getBooks();
  }

  updateBook = (updatedBook) => {
    this.getBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <Search
            books={this.state.books}
            cb={this.updateBook}
          />
          )}/>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookCase
              books={this.state.books}
              cb={this.updateBook}
            />
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
