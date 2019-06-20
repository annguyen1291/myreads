import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom' 

class BooksApp extends React.Component {
  state = { 
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  moveShelf = (id, shelf) => {
    this.setState((state) => {{
      const book = this.state.books.filter((book) => (book.id === id))[0]
      book.shelf = shelf
      BooksAPI.update(book, shelf)
      return state
    }})    
  }

  addBook = (id, shelf) => {
    BooksAPI.get(id)
      .then((book) => {
        this.setState((state) => ({
          book: state.books.concat(book)
        }))
        BooksAPI.update(book, shelf)
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onMoveShelf={this.moveShelf}/>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBook books={this.state.books} onAddBook={this.addBook} />
        )} />        
      </div>
    )
  }
}

export default BooksApp
