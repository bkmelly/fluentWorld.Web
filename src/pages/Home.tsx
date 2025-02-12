import Hero from '../components/home/hero'
import Programs from '../components/home/Programs'
import AboutPrograms from '../components/home/AboutPrograms'
import Testimonials from '../components/home/testimonials'
import BlogIntro from '../components/home/BlogIntro'
import BlogSection from '../components/home/BlogSection'
import CTASection from '../components/home/CTASection'

const Home = () => {
  return (
    <main>
       <Hero 
        title="Educational Resources"
        description="Browse through our collection of learning materials, tools, and resources"
        ctaText="Browse Resources"
        scrollTo="resources"
        image="/path-to-your-hero-image.jpg"
      />
      <Programs />
      <AboutPrograms />
      <Testimonials />
      <BlogIntro />
      <BlogSection />
      <CTASection />
    </main>
  )
}

export default Home 