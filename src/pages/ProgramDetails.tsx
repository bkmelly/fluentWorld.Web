import { useParams, useNavigate } from 'react-router-dom'
import { FiCheck, FiClock, FiBook, FiUsers } from 'react-icons/fi'
import Button from '../components/common/button'
import TestimonialSlider from '../components/programs/TestimonialSlider'


interface ProgramFeature {
  title: string
  description: string
}

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  recommended?: boolean
}

const features: ProgramFeature[] = [
  {
    title: 'Industry-Led Curriculum',
    description: 'Curriculum designed and updated regularly with input from industry experts'
  },
  {
    title: 'Hands-on Projects',
    description: 'Build real-world projects that you can add to your portfolio'
  },
  {
    title: 'Expert Mentorship',
    description: '1-on-1 mentoring sessions with industry professionals'
  },
  {
    title: 'Career Support',
    description: 'Resume reviews, interview prep, and job placement assistance'
  }
]

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: '$499',
    description: 'Perfect for beginners starting their journey',
    features: [
      'Full course access',
      'Basic project reviews',
      'Community access',
      '3 months access'
    ]
  },
  {
    name: 'Pro',
    price: '$999',
    description: 'Most popular choice for serious learners',
    features: [
      'Everything in Basic',
      'Personal mentor',
      'Career coaching',
      'Lifetime access'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Custom curriculum',
      'Dedicated support',
      'Group discounts'
    ]
  }
]

const ProgramDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleEnrollClick = (tier: PricingTier) => {
    navigate(`/checkout/program/${id}`, {
      state: {
        item: {
          id,
          type: 'program',
          name: `Web Development Bootcamp - ${tier.name} Plan`,
          description: tier.description,
          price: parseInt(tier.price.replace('$', '')),
          duration: '12 months',
          features: tier.features,
          image: '/path-to-program-image.jpg'
        }
      }
    })
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-gray-900 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 text-white/80 mb-6">
                <FiClock className="w-5 h-5" />
                <span>12 Weeks</span>
                <span className="mx-2">•</span>
                <FiBook className="w-5 h-5" />
                <span>24 Modules</span>
                <span className="mx-2">•</span>
                <FiUsers className="w-5 h-5" />
                <span>500+ Students</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Web Development Bootcamp
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Master modern web development from scratch. Learn by building real projects with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => handleEnrollClick(pricingTiers[1])}
                >
                  Enroll Now
                </Button>
                <Button variant="secondary" className="border-2 border-white bg-transparent text-white hover:bg-white/10">
                  Download Syllabus
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <img
                src="/path-to-program-image.jpg"
                alt="Web Development"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Program Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Flexible Pricing Plans
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`
                  relative p-8 rounded-2xl bg-white
                  ${tier.recommended ? 'ring-2 ring-primary shadow-lg' : 'shadow-sm'}
                `}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm rounded-full">
                    Recommended
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {tier.price}
                  </div>
                  <p className="text-gray-600">
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FiCheck className="w-5 h-5 text-primary" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.recommended ? 'primary' : 'secondary'}
                  className="w-full"
                  onClick={() => handleEnrollClick(tier)}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who have completed this program
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about this program
            </p>
          </div>
          {/* Reuse the FAQ component from the About page */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of successful graduates who have transformed their careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => handleEnrollClick(pricingTiers[1])}
            >
              Enroll Now
            </Button>
            <Button variant="secondary" className="border-2 border-white bg-transparent text-white hover:bg-white/10">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProgramDetails 