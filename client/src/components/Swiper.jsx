import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/free-mode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import './Swiper.css'



const slider = [
  {
      title: "Environment & Climate Change",
      description: "Orchids are plants that belong to the family Orchidaceae, a diverse and widespread group of flowering plants with blooms that are often colourful and fragrant. Orchidaceae is one of the two largest families of flowering plants, along with the Asteraceae.",
      url: "https://github.com/NgandalaLopes/imagery/blob/main/climate.jpg?raw=true",
      explore: "https://donate.stripe.com/14k4j87YU8Xd97q9AA"
    },
    {
      title: "Hunger & Food Policy",
      description: "Hydrangea, commonly named the hortensia, is a genus of more than 75 species of flowering plants native to Asia and the Americas. By far the greatest species diversity is in eastern Asia, notably China, Korea, and Japan.",
      url: "https://github.com/NgandalaLopes/imagery/blob/main/hunger.jpg?raw=true",
      explore: "https://donate.stripe.com/14k4j83IE7T9cjC289"
    },
    {
      title: "Health General",
      description: "Lilium is a genus of herbaceous flowering plants growing from bulbs, all with large prominent flowers. They are the true lilies. Lilies are a group of flowering plants which are important in culture and literature in much of the world.",
      url: "https://github.com/NgandalaLopes/imagery/blob/main/medical.jpg?raw=true",
      explore: "https://donate.stripe.com/28o4j81Aw6P5erKfZ0"
    },
  
    {
      title: "Mental Health",
      description: "Tulips are a genus of spring-blooming perennial herbaceous bulbiferous geophytes. The flowers are usually large, showy and brightly coloured, generally red, pink, yellow, or white. They often have a different coloured blotch at the base of the tepals, internally.",
      url: "https://github.com/NgandalaLopes/imagery/blob/main/mental.jpg?raw=true",
      explore: "https://donate.stripe.com/fZe16W3IE2yPfvO147"
    },
    {
      title: "Veterans & Military",
      description: "Chrysanthemums, sometimes called mums or chrysanths, are flowering plants of the genus Chrysanthemum in the family Asteraceae. They are native to East Asia and northeastern Europe. Most species originate from East Asia and the center of diversity is in China. Countless horticultural varieties and cultivars exist.",
      url: "https://github.com/NgandalaLopes/imagery/blob/main/veterans.jpg?raw=true",
      explore: "https://donate.stripe.com/5kA8zofrm8Xd5Ve6os"
    },
]
const PowerPointSwiper = () => {
  return (
    <div className='carousel'>
    <div>
        <div className='carousel-content'>
            <span>discover</span>
            <h1>Top-Rated Charities</h1>
            <hr />
            <p>Top-Rated list generally spend 75% or more of their budgets on programs.</p>
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
        {
            slider.map(data => (
                <SwiperSlide style={{ backgroundImage: `url(${data.url})` }} className="myswiper-slider">
                    <div>
                        <h2>{data.title}</h2>
                        <p>{data.description}</p>
                        <a href={`${data.explore}`} target="_blank" className='slider-btn'>donate</a>
                    </div>
                </SwiperSlide>
            ))
        }
    </Swiper>

    {/* <img src={flower1} alt="bg image" className='bgdonut1' />
    <img src={flower2} alt="bg image" className='bgdonut2' /> */}
</div>
)
}


export default PowerPointSwiper;
