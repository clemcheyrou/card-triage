import { Route, Routes as Router } from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard/Dashboard'
import PageNotFound from './pages/PageNotFound/PageNotFound'

function App() {
  
  return (
      <Router>
        <Route index element={<Dashboard />}/>
        <Route path="*" element={<PageNotFound />} />
      </Router>
  )
}

export default App
