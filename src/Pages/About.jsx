import React from 'react';
import "../Style/About.css";

const About = () => {

  return (
    <>
      <p id='about-top'></p>
      <h3 className='about-title'>
        Laxmo Technology is Gujrat base manufacturer and supplier every type of pumps-motor & powertools for various purpose
      </h3>
      <div id="about-main">

        <div className="about-section">
          <img src="./about-us-1.jpg" alt="About Us Image 1" className="about-img" />
          <div className="about-content">

            <p>    <h2 className='about-title'>OUR STORY</h2>Founded in 2010, Laxmo Pump's journey began with a simple vision: to revolutionize the pump and motor manufacturing industry by delivering high-quality, innovative products. Starting as a small workshop, we have grown into a leading manufacturer known for our commitment to excellence and customer satisfaction. Our early days were marked by dedication and a relentless pursuit of perfection, which set the foundation for our growth. Over the years, we have continually invested in cutting-edge technology and skilled craftsmanship to ensure our pumps and motors meet the highest standards. Our team of talented engineers works tirelessly to bring innovative concepts to life, ensuring every product we produce is not only efficient but also durable and reliable. Our passion for engineering and attention to detail has allowed us to collaborate with a diverse range of clients, from local businesses to multinational corporations. Each project presents an opportunity to push the boundaries of innovation and design, and we take pride in delivering products that reflect our clients' unique needs. Our journey has been one of continuous improvement and learning, driven by our desire to set new benchmarks in the industry. Every pump and motor we produce reflects our dedication to quality, innovation, and the unique requirements of our clients. We believe that our success is measured by the satisfaction and success of our clients, and this belief drives us to excel in every project we undertake.
            </p>
          </div>
        </div>
        <div className="about-section">
          <img src="./about-us-2.jpg" alt="About Us Image 2" className="about-img" />
          <div className="about-content">
            <p><h2 className='about-title'>OUR MISSION</h2>At our core, we strive to be the premier choice for pump and motor manufacturing by consistently exceeding our clients' expectations. Our mission is to deliver top-notch, customizable pumps and motors that effectively meet our clients' needs and enhance their operational efficiency. We are committed to sustainability, using eco-friendly materials and practices to minimize our environmental impact. By adopting sustainable practices, we aim to contribute positively to the environment while providing high-quality products. Innovation is at the heart of everything we do. We continuously explore new designs and manufacturing techniques to stay ahead in the industry. Our research and development team is dedicated to finding new ways to improve our products and processes, ensuring that we remain at the forefront of the pump and motor manufacturing industry. Our team is dedicated to providing exceptional service, ensuring that each project is completed on time and to the highest standards. We believe in building lasting relationships with our clients through integrity, quality, and a shared vision for success. Our mission is not only to meet but to exceed our clients' expectations, delivering pumps and motors that make a lasting impact and contribute to their success. We are proud of the reputation we have built and are committed to continuing our tradition of excellence in pump and motor manufacturing.
            </p>
          </div>
        </div>


        
      </div>
    
      
    </>

  );
}

export default About;
