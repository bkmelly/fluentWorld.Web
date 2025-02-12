import Button from '../common/button'

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-primary mt-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-lg text-black max-w-2xl mx-auto">
          Join thousands of students who have already transformed their careers through our programs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button variant="primary" className="bg-white text-primary hover:bg-white/90">
            Get Started Today
          </Button>
          <Button variant="secondary" className="border-2 border-white bg-transparent text-white hover:bg-white/10">
            Browse Programs
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection 