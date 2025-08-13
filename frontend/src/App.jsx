import React from "react"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import MoviePage from "./pages/MoviePage.jsx"
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router"
import CategoryPage from "./pages/CategoryPage.jsx"
import ScrollToTop from "./utiles/ScrollToTop.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/movie/:id"} element={<MoviePage />} />
        <Route path={"/tv_shows"} element={<CategoryPage />} />
        <Route path={"/movies"} element={<CategoryPage />} />
        <Route path={"/anime"} element={<CategoryPage />} />
        <Route path={"/games"} element={<CategoryPage />} />
        <Route path={"/new_popular"} element={<CategoryPage />} />
        <Route path={"/upcoming"} element={<CategoryPage />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
