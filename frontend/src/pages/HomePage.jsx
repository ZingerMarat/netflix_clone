import React from "react"
import Hero from "../components/Hero.jsx"
import CardList from "../components/CardList.jsx"

const HomePage = () => {
  return (
    <div className="p-5">
      <Hero />
      <CardList />
      <CardList />
      <CardList />
    </div>
  )
}

export default HomePage
