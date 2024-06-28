import HeroSection from '../Components/HeroSection';
import Category from '../Components/Category';
import HomeProductCard from '../Components/HomeProductCard';
import HomeAbout from '../Components/HomeAbout';




const Home = () => {
    


    return <div  className="main-content min-h-screen" >
       

       <HeroSection />
    
       <Category />
  
      <HomeProductCard />
      <HomeAbout />     
       {/* <Testimonial /> */}
    </div>;

};


export default Home;

