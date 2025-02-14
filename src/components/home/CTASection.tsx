import Button from '../common/button'

const CTASection = () => {
  return (
    <section className="py-24 bg-[#024D5E]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have already transformed their careers through our programs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" className="bg-[#C18721] text-[#024D5E] hover:bg-white/10">
            Get Started Today
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection 