import React from "react"
import Hero from "../components/Hero.jsx"
import CardList from "../components/CardList.jsx"

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CardList title="Upcoming" category="upcoming" />
      <CardList title="Now Playing" category="now_playing" />
      <CardList title="Popular" category="popular" />
      <CardList title="Top Rated" category="top_rated" />
    </div>
  )
}

export default HomePage
