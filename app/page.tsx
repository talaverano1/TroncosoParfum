import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Hero from "@/app/components/sections/Hero";
import TrustBar from "@/app/components/sections/TrustBar";
import FeaturedProducts from "@/app/components/sections/FeaturedProducts";
import WhyChooseUs from "@/app/components/sections/WhyChooseUs";
import Bestsellers from "@/app/components/sections/Bestsellers";
import Testimonials from "@/app/components/sections/Testimonials";
import FinalCTA from "@/app/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <FeaturedProducts />
        <WhyChooseUs />
        <Bestsellers />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
