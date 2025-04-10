import './App.css'
import { Button } from "@/components/ui/button"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp'
import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from './pages/NavBar';


function App() {

  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <div className='app'>  
      <BrowserRouter>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode}  />
      <Main>
      <Navbar />
      <Wrapper>
        <Routes>
        <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="image">
                    <Route path=":id" element={<Image />} />
                  </Route>
                </Route>
        </Routes>
        </Wrapper>
        </Main>
      </BrowserRouter>
  </div>
  </ThemeProvider>
  )
}

export default App
