import React, { useEffect } from "react"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import MediaPage from "./pages/MediaPage.jsx"
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router-dom"
import CategoryPage from "./pages/CategoryPage.jsx"
import ScrollToTop from "./utiles/ScrollToTop.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import AIPicks from "./pages/AIPicks.jsx"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authStore.js"

const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (fetchingUser) {
    return null
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/home"} element={<HomePage />} />
        <Route path={"/media/:type/:id"} element={<MediaPage />} />
        <Route path={"/tv_shows"} element={<CategoryPage category={"tv_shows"} />} />
        <Route path={"/movies"} element={<CategoryPage category={"movies"} />} />
        <Route path={"/new"} element={<CategoryPage category={"new"} />} />
        <Route path={"/popular"} element={<CategoryPage category={"popular"} />} />
        <Route path={"/upcoming"} element={<CategoryPage category={"upcoming"} />} />
        <Route path={"/signin"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/ai-picks"} element={<AIPicks />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
