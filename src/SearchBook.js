import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState(() => ({query: query.trim()}))

    BooksAPI.search(query)
      .then((books) => {
        this.setState(() => (books === undefined ? {books: []} : {books: books}))
      })
  }

  render() {
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to='/'><button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button></Link>
        <div className="search-books-input-wrapper">
          <input type="text" onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.map((book) => (<Book key={book.id} book={book} onMoveShelf={this.props.onMoveShelf} />))}
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBook