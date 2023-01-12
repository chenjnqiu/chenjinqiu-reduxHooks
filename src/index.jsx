import React, { useReducer } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, About } from '@page'
import CreateStore, { ReduxContext } from './store'
import '@asset/styles/common.global.less'

const createStore = new CreateStore()

const App = () => {
    const store = createStore.getStore(useReducer)
    return (
        <ReduxContext.Provider value={store}>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
            </Routes>
          </Router>
        </ReduxContext.Provider>
      )
}

render(<App/>, document.getElementById('app'))
