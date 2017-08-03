import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  state = {
    shelf: this.props.book.shelf
  }

  changeShelf = (event) => {
    this.setState({shelf:event.target.value}, () => {
      BooksAPI.update({id:this.props.book.id}, this.state.shelf).then((data) => {
        if(data[this.state.shelf] && data[this.state.shelf].indexOf(this.props.book.id) > -1){
          this.props.book.shelf = this.state.shelf;
        }
        else {
          this.props.book.shelf = 'none';
        }
        this.props.cb(this.props.book);
      })
      .catch(e => console.log('There was an error updating the book'))
    })
  }

  render(){
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks['smallThumbnail'] : ''})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.changeShelf}>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors ? this.props.book.authors.map((author) => (
            <div className="book-authors" key={author}>{author}</div>
          )) : ''}
        </div>
      </li>
    )
  }
}

export default Book;
