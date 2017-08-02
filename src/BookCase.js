import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class BookCase extends Component {
  state = {
    books: []
  }

  constructor(props){
    super(props)
    this.shelves = [
      {title: 'Currently Reading', status:'currentlyReading'},
      {title: 'Want To Read', status:'wantToRead'},
      {title: 'Read', status:'read'}
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateBook = (updatedBook) => {
    this.setState({books:this.state.books})
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          {this.shelves.map((shelf) => (
            <BookShelf
              key={shelf.status}
              title={shelf.title}
              books={this.state.books.filter((book)=>book.shelf===shelf.status)}
              cb={this.updateBook}
            />
          ))}
        </div>
      </div>
    )
  }
}
export default BookCase
