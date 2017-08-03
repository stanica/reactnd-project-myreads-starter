import React, { Component } from 'react';
import BookShelf from './BookShelf';

class BookCase extends Component {
  state = {
    books: this.props.books
  }

  constructor(props){
    super(props);
    this.shelves = [
      {title: 'Currently Reading', status:'currentlyReading'},
      {title: 'Want To Read', status:'wantToRead'},
      {title: 'Read', status:'read'}
    ]
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          {this.shelves.map((shelf) => (
            <BookShelf
              key={shelf.status}
              title={shelf.title}
              books={this.props.books.filter((book)=>book.shelf===shelf.status)}
              cb={this.props.cb}
            />
          ))}
        </div>
      </div>
    )
  }
}
export default BookCase;
