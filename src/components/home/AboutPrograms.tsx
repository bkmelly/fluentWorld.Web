import Button from '../common/button'

const AboutPrograms = () => {
  return (
    <section className="py-16 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Our Programs
            </h2>
            <p className="text-lg text-gray-600">
              Transform your future with our comprehensive educational programs. 
              Our expert-led courses are designed to give you the skills you need 
              to succeed in today's competitive world.
            </p>
            <Button variant="secondary">
              Explore All Programs
            </Button>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src="/path-to-featured-image.jpg"
              alt="Students learning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPrograms 