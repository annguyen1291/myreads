import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

const shelves = [
  {
    name: 'currentlyReading', 
    text: 'Currently Reading'
  },
  {
    name: 'wantToRead',
    text: 'Want to Read' 
  },
  {
    name: 'read', 
    text: 'Read'
  }
]

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (<BookShelf key={shelf.name} books={this.props.books.filter((book) => (book.shelf === shelf.name))} shelf={shelf.text} />))}
        </div>
        <div className="open-search">          
          <Link to='/search'><button></button></Link>          
        </div>
      </div>
    )
  }
}

export default ListBooks