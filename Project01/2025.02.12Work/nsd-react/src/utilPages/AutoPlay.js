import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner_1 from '../images/banner_1.jpg';
import banner_2 from '../images/banner_2.png';
import banner_3 from '../images/banner_3.png';

// npm install react-slick --save
// npm install slick-carousel --save

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <a href="https://heroes.nexon.com/promotion/2025/0116/update"><img src={banner_1} alt="banner_1.jpg" /></a>
        </div>
        <div>
          <a href="https://bluearchive.nexon.com/events/2024/10/minigame"><img src={banner_2} alt="banner_2.png" /></a>
        </div>
        <div>
          <a href="https://df.nexon.com/pg/venus?intro=yes"><img src={banner_3} alt="banner_3.png" /></a>
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;
