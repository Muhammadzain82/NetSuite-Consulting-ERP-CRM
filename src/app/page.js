
import Navbar from "./components/header";
import Herosection from "./components/herosection";
import Customer from "./components/customer";
import Footer from "./components/footer";
import Testimonal from "./components/testimonal";
import FAQ from "./components/question";
import Feature from "./components/feature";
import Slider from "./components/slider";
import Experts from "./components/experts";
import Service from "./components/service";
import Chatform from "./components/Chatform";
import Blogs from "./components/blog";



export default function Home() {
  return (
    <>
    <Navbar/>
    <Herosection/>
    <Slider/>
    <Customer/>
    <Service/>
    <Feature/>
    <Experts/>
    <FAQ/>
    <Blogs/>
    <Testimonal/> 
    <Chatform/>
    <Footer/>
    </>
  );
}

