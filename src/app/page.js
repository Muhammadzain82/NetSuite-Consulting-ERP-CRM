import Image from "next/image";
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
import Stepper from "./components/stepper";

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
    <Testimonal/> 
    <Stepper/>
    <Footer/>
    </>
  );
}
