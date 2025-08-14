import Navbar from '../common/Navbar';
import Faq from '../sections/Faq';
import Features from '../sections/Features';
import Footer from '../sections/Footer';
import Hero from '../sections/Hero';
import HowItWorks from '../sections/HowItWorks';
import JoinForm from '../sections/JoinForm';
import Partners from '../sections/Partners';
import Video from '../sections/Video';
import WhyNow from '../sections/WhyNow';

const HomeComponent = () => {
  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <Navbar />
      <Hero />
      <Partners />
      <WhyNow />
      <Features />
      <HowItWorks />
      <Video />
      <JoinForm />
      <Faq />
      <Footer />
    </div>
  );
};

export default HomeComponent;
