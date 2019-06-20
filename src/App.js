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
    BooksAPI.getAll().then((books) => {
        this.setState(() => ({books}))
      })
  }

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.componentDidMount()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onMoveShelf={this.moveShelf}/>
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBook books={this.state.books} onMoveShelf={(book, shelf) => {
            this.moveShelf(book, shelf)
            history.push('/')            
          }} />
        )} />        
      </div>
    )
  }
}

export default BooksApp
