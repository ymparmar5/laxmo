import React, { useEffect, useState } from 'react';
import '../Style/HeroSection.css'; // Update this path as needed

const HeroSection = () => {
  const slides = [
    { src: "/LAXMO-7.jpg", alt: "Slide 7" },
    { src: "/LAXMO-1.jpg", alt: "Slide 1" },
    { src: "/LAXMO-2.jpg", alt: "Slide 2" },
    { src: "/LAXMO-3.jpg", alt: "Slide 3" },
    { src: "/LAXMO-4.jpg", alt: "Slide 4" },
    { src: "/LAXMO-5.jpg", alt: "Slide 5" },
    { src: "/LAXMO-6.jpg", alt: "Slide 6" },
    
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const showSlides = () => {
      const slides = document.getElementsByClassName('hero-bannerSlides');
      const dots = document.getElementsByClassName('dot');
      
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        dots[i].className = dots[i].className.replace(' active', '');
      }

      slides[slideIndex].style.display = 'block';
      dots[slideIndex].className += ' active';
    };

    showSlides();

    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Delay increased to 4 seconds

    return () => clearInterval(interval);
  }, [slideIndex]);

  // const previousSlide = () => {
  //   setSlideIndex((slideIndex) =>
  //     slideIndex > 0 ? slideIndex - 1 : slides.length - 1
  //   );
  // };

  // const nextSlide = () => {
  //   setSlideIndex((slideIndex) =>
  //     slideIndex + 1 < slides.length ? slideIndex + 1 : 0
  //   );
  // };

  return (
    <div id="hero">
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="hero-bannerSlides fade"
            style={{ display: index === slideIndex ? 'block' : 'none' }}
          >
            <img className="banner" src={slide.src} alt={slide.alt} />
            {/* <div className="text">{slide.caption}</div> */}
          </div>
        ))}
      </div>

      {/* <div className="hero-icons-left" onClick={previousSlide}>
        <i className="fa-solid fa-chevron-left fa-fade fa-xl"></i>
      </div>
      <div className="hero-icons-right" onClick={nextSlide}>
        <i className="fa-solid fa-chevron-right fa-fade fa-xl"></i>
      </div> */}

      <br />
      <div style={{ textAlign: 'center' }}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === slideIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
