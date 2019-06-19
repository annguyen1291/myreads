import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom' 

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks />
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
