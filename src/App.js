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
    const book = this.state.books.filter((book) => (book.id === id))[0]

    this.setState((state) => {{
      book.shelf = shelf
      return state
    }})

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onMoveShelf={this.moveShelf}/>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBook 
              onMoveShelf={this.moveShelf}
          />
        )} />        
      </div>
    )
  }
}

export default BooksApp
