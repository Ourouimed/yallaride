import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimons from "@/components/sections/Testimons";


export default function Home() {
  return <>
    <Header/>
    <Hero/>
    <About/>
    <Services/>
    <Contact/>
    <Testimons/>
  </>
}
