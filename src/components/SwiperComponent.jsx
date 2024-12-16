import React from 'react'
import { Swiper ,SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Slider1 from '../assets/slider1.jpg'
import Slider2 from '../assets/slider2.jpg'
import Slider3 from '../assets/slider3.jpg'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SwiperComponent = () => {
    const slideClass = 'w-full min-h-[150px]'
  return (
    <div id="slider" className="flex transition-transform duration-300 my-5 sm:w-[80%] sm:mx-auto">
        <div className="flex-none w-full" >
            <Swiper className='mySwiper'
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    pagination={{
                        clickable: true
                    }}   
                    modules={[Autoplay, Pagination, Navigation]}
                    >
                <SwiperSlide>{<img src={Slider1} alt="Slide 1" className={slideClass} />}</SwiperSlide>
                <SwiperSlide>{<img src={Slider2} alt="Slide 2" className={slideClass} />}</SwiperSlide>
                <SwiperSlide>{<img src={Slider3} alt="Slide 3" className={slideClass} />}</SwiperSlide>
            </Swiper>
        </div>
    </div>
  )
}

export default SwiperComponent
