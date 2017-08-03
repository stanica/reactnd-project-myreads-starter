import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    let found = false;
    this.setState({query}, () => {
      if(this.state.query.length > 0){
        BooksAPI.search(this.state.query, 20).then((books) => {
          if(books.length > 0){
            for(const newBook of books){
              for(const oldBook of this.props.books){
                if(newBook.id === oldBook.id){
                  newBook.shelf = oldBook.shelf;
                  found = true;
                }
              }
              if(!found){
                newBook.shelf = 'none';
              }
            }
            this.setState({books});
          }
          else {
            this.setState({books:[]});
          }
        })
        .catch(e => console.log('There was an error searching'))
      }
      else {
        this.setState({books:[]});
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books ? this.state.books.map((book) => (
              <Book
                key={book.id}
                book={book}
                cb={this.props.cb}
              />
          )): ''}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
