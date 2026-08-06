
import Navbar from "../components/landing/navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import TechStack from "../components/landing/TechStack";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
function LandingPage() {
    return (

        <>
            <Navbar />
            <Hero />
            <Features />
            <TechStack />
            <CTA />
            <Footer />
        </>
    );
}
export default LandingPage;