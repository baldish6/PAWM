import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Home } from './pages/Home'
import { useSelector } from "react-redux";



function App() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='app'>  
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<LoginPage></LoginPage>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
     </Routes>
     </BrowserRouter>
  </div>
  )
}

export default App
