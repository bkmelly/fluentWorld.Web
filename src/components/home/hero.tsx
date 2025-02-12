import Button from '../common/button'

interface HeroProps {
    title: string;
    description: string;
    ctaText: string;
    scrollTo: string;
    image?: string;
  }
const Hero = ({ title, description, ctaText, scrollTo }: HeroProps) => {
  const handleScroll = () => {
    const element = document.getElementById(scrollTo);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          {title}
          </h1>
          <p className="text-lg text-gray-600">
          {description}
          </p>
          <div className="flex gap-4">
            <Button variant="primary" onClick={handleScroll}>
              {ctaText}
            </Button>
            <Button variant="secondary">
              Browse Programs
            </Button>
          </div>
          
          {/* Student Avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                />
              ))}
            </div>
            <span className="text-gray-600">Our Happy Students</span>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden">
            {/* Replace with your actual image */}
            <img
              src="/path-to-your-hero-image.jpg"
              alt="Students learning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
