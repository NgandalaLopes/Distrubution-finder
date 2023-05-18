import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css/free-mode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import './Swiper.css'
//import images
import img1 from "../img/Screenshot11.png";
import img2 from "../img/Screenshot12.png";
import img3 from "../img/Screenshot13.png";
import img4 from "../img/Screenshot14.png";
import img5 from "../img/Screenshot15.png";
import img6 from "../img/Screenshot1.png";
import img7 from "../img/Screenshot2.png";
import img8 from "../img/Screenshot3.png";
import img9 from "../img/Screenshot4.png";


const ResourceSwiper =  [
  
    
     {},
  ]


const Resources = () => {
  return (
    <div className='carousel'>
    <div>
        <div className='carousel-content'>
            
            <h1>React Project</h1>
            <hr />
           
        </div>
    </div>

    <Swiper 
    className='myswiper'
    modules={[Pagination, EffectCoverflow, Autoplay]}
    effect={"coverflow"}
    grabCursor={true}
    centeredSlides={true}
    coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true
    }}
    loop={true}
    pagination={{clickable: true}}

    autoplay={{
        delay: 5000,
        disableOnInteraction: false
    }}
    breakpoints={{
        640: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 1
        },
        1024: {
            slidesPerView: 2
        },
        1560: {
            slidesPerView: 3
        },
    }}
    
    >
       <SwiperSlide>
          <img src={img1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img7} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img8} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img9} alt="slide_image" />
        </SwiperSlide>
        
        

        {
            ResourceSwiper.map(data => (
                <SwiperSlide style={{ backgroundimg: `url(${data.img})` }} className="myswiper-slider">
                    <div>
                        
                        
                    </div>
                </SwiperSlide>
            ))
        }
    

    <img src={img1} alt="bg image" className='bgdonut1' />
    <img src={img2} alt="bg image" className='bgdonut2' />
    <img src={img3} alt="bg image" className='bgdonut2' />
    <img src={img4} alt="bg image" className='bgdonut2' />
    <img src={img5} alt="bg image" className='bgdonut2' />
    <img src={img6} alt="bg image" className='bgdonut2' />
    <img src={img7} alt="bg image" className='bgdonut2' />
    <img src={img8} alt="bg image" className='bgdonut2' />
    <img src={img9} alt="bg image" className='bgdonut2' />

  
    </Swiper>
</div>
)
}



export default Resources;


     
     
       
       
