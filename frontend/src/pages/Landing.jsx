
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import TechStack from "../components/landing/TechStack";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";
import "./../styles/variables.css";
import "./../styles/globals.css";
function LandingPage() {
    return (

        <>
            <Navbar />
            
                <Hero />
                <Features />
                <DashboardPreview />
                <TechStack />
                <CTA />
            
            <Footer />
        </>
    );
}
export default LandingPage;
