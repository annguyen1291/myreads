import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query, books) => {
    this.setState(() => ({query: query.trim()}))
    const bookIDs = books.map((book) => (book.id))

    BooksAPI.search(query)
      .then((b) => {   
        if (Array.isArray(b)) {
          b.forEach((b) => {
            if (bookIDs.includes(b.id)) {
              b.shelf =  books.filter((book) => (book.id === b.id))[0].shelf
            }
          })
          this.setState(() => ({books: b}))
        } else {
          this.setState(() => ({books: []}))
        }
      })
  }

  render() {
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to='/'><button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button></Link>
        <div className="search-books-input-wrapper">
          <input type="text" onChange={(event) => this.updateQuery(event.target.value, this.props.books)} placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.filter((book) => (book.imageLinks !== undefined && book.authors !== undefined)).map((book) => (<Book key={book.id} book={book} onMoveShelf={this.props.onMoveShelf} />))}
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBook