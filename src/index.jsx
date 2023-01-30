import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, About } from '@page'
import createStore, { ReduxContext } from './store'
import '@asset/styles/common.global.less'

const App = () => {
    const store = createStore.getStore()
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
