import React, { useEffect, useState } from 'react';
import '../Style/HeroSection.css'; // Update this path as needed

const HeroSection = () => {
  const slides = [
    { src: "/Master.jpg", alt: "Slide 0" },
    { src: "/Machinery.jpg", alt: "Slide 1" },
    { src: "/Industries.jpg", alt: "Slide 2" },
    { src: "/Agriculture.jpg", alt: "Slide 3" },
    { src: "/Presure.jpg", alt: "Slide 4" },
    { src: "/Residential.jpg", alt: "Slide 5" },
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
          </div>
        ))}
      </div>

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
