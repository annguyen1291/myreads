import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom' 

class BooksApp extends React.Component {
  state = { 
    books: ['currentlyReading', 'wantToRead', 'read']
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.filter((b) => {
        return b.id !== book.id
      })
    }))

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books}/>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBook 
            onUpdateBook={() => {
              history.push('/')
            }}
          />
        )} />        
      </div>
    )
  }
}

export default BooksApp
