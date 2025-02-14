import Hero from '../components/home/hero'
import ResourceGrid from '../components/resources/ResourceGrid'
import CategoryFilter from '../components/resources/CategoryFilter'
import CommunitySection from '../components/resources/CommunitySection'
import ContactForm from '../components/resources/ContactForm'
import BlogSection from '../components/home/BlogSection'

const Resources = () => {
  return (
    <main>
      <Hero 
        title="Educational Resources"
        description="Browse through our collection of learning materials, tools, and resources"
        ctaText="Browse Resources"
        scrollTo="resources"
      />
      <CategoryFilter />
      <div id="resources">
        <ResourceGrid />
      </div>
      <CommunitySection />
      <ContactForm />
      <BlogSection />
    </main>
  )
}

export default Resources 