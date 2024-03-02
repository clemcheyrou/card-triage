import { Route, Routes as Router } from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Help from './pages/Help/Help'

function App() {
  
  return (
      <Router>
        <Route index element={<Dashboard />}/>
        <Route path="/help" element={<Help />}/>
        <Route path="*" element={<PageNotFound />} />
      </Router>
  )
}

export default App
