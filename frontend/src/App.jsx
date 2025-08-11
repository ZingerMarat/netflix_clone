import React from "react"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import MoviePage from "./pages/MoviePage.jsx"
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/movie/:id"} element={<MoviePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
