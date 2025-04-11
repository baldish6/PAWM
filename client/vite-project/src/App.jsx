import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'


function App() {

  return (
    <div className='app'>  
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LoginPage/>}>
      </Route>
     </Routes>
     </BrowserRouter>
  </div>
  )
}

export default App
