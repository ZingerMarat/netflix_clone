import React from "react"
import CardImg from "../assets/cardimg.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

const CardList = () => {
  const data = [
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Card 2",
      description: "This is the second card.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Card 3",
      description: "This is the third card.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Card 3",
      description: "This is the third card.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Card 3",
      description: "This is the third card.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      title: "Card 3",
      description: "This is the third card.",
      imageUrl: "https://via.placeholder.com/150",
    },
  ]
  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">Upcoming</h2>

      <Swiper className="mySwiper h-60 items-center justify-center" spaceBetween={20} slidesPerView={"auto"}>
        {data.map((item, index) => (
          <SwiperSlide key={index} className="max-w-72 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xs border border-white/20">
            <img src={CardImg} alt="" className="h-44 w-80 object-center object-cover " />
            <p className="text-center pt-4">A very good movie</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CardList
