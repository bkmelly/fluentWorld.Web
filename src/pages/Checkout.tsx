import { useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'
import { FiLock, FiCreditCard, FiCheckCircle, FiShoppingCart } from 'react-icons/fi'
import Button from '../components/common/button'
import ProgressSteps from '../components/checkout/ProgressSteps'

interface CheckoutItem {
  id: string
  type: 'program' | 'resource' | 'membership'
  name: string
  description: string
  price: number
  duration?: string
  features?: string[]
  image?: string
}

interface PaymentForm {
  cardNumber: string
  expiry: string
  cvc: string
  name: string
  email: string
  country: string
}

interface ApplicationForm {
  experience: string
  goals: string[]
  background: string
  timeCommitment: string
  hearAbout: string
  additionalInfo: string
}

const goalOptions = [
  'Career Change into Tech',
  'Skill Enhancement',
  'Personal Project Development',
  'Professional Development',
  'Starting a Business',
  'Academic Purpose'
]

const experienceLevels = [
  'Beginner - No prior experience',
  'Basic - Some understanding',
  'Intermediate - Worked on few projects',
  'Advanced - Professional experience'
]

const timeCommitments = [
  '5-10 hours/week',
  '10-20 hours/week',
  '20-30 hours/week',
  '30+ hours/week'
]

const Checkout = () => {
  const location = useLocation()
  const { type, id } = useParams()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    email: '',
    country: ''
  })
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    experience: '',
    goals: [],
    background: '',
    timeCommitment: '',
    hearAbout: '',
    additionalInfo: ''
  })

  const item = location.state?.item || {
    id: '1',
    type: 'program',
    name: 'Web Development Bootcamp - Pro Plan',
    description: 'Complete web development bootcamp with mentorship',
    price: 999,
    duration: '12 months',
    features: ['Full course access', 'Personal mentor', 'Career coaching', 'Lifetime access'],
    image: '/path-to-image.jpg'
  }

  const isProgram = item.type === 'program'
  const totalSteps = isProgram ? 3 : 2

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(totalSteps)
  }

  const renderApplicationForm = () => (
    <form onSubmit={handleApplicationSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is your current experience level?
        </label>
        <select
          required
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={applicationForm.experience}
          onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
        >
          <option value="">Select your experience level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are your primary goals? (Select all that apply)
        </label>
        <div className="space-y-2">
          {goalOptions.map((goal) => (
            <label key={goal} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={applicationForm.goals.includes(goal)}
                onChange={(e) => {
                  const goals = e.target.checked
                    ? [...applicationForm.goals, goal]
                    : applicationForm.goals.filter(g => g !== goal)
                  setApplicationForm({ ...applicationForm, goals })
                }}
                className="rounded text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tell us about your background and what interests you about this {item.type}
        </label>
        <textarea
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          value={applicationForm.background}
          onChange={(e) => setApplicationForm({ ...applicationForm, background: e.target.value })}
          placeholder="Share your story..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How much time can you commit weekly?
        </label>
        <select
          required
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={applicationForm.timeCommitment}
          onChange={(e) => setApplicationForm({ ...applicationForm, timeCommitment: e.target.value })}
        >
          <option value="">Select time commitment</option>
          {timeCommitments.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about us?
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={applicationForm.hearAbout}
          onChange={(e) => setApplicationForm({ ...applicationForm, hearAbout: e.target.value })}
          placeholder="Google, Social Media, Friend, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Anything else you'd like to share?
        </label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          value={applicationForm.additionalInfo}
          onChange={(e) => setApplicationForm({ ...applicationForm, additionalInfo: e.target.value })}
          placeholder="Optional"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Continue to Payment
      </Button>
    </form>
  )

  return (
    <main className="min-h-screen bg-neutral-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <ProgressSteps 
            currentStep={step}
            totalSteps={totalSteps}
            type={item.type}
          />

          <div className="grid md:grid-cols-5 gap-8">
            {/* Order Summary - Moved to left side */}
            <div className="md:col-span-2 order-1 md:order-1">
              <div className="bg-white rounded-2xl p-8 shadow-sm sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiShoppingCart className="w-5 h-5" />
                  Order Summary
                </h2>
                <div className="flex items-start gap-4 pb-6 border-b">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                    {item.duration && (
                      <p className="text-sm text-gray-600 mt-2">
                        Duration: {item.duration}
                      </p>
                    )}
                  </div>
                </div>
                {item.features && (
                  <div className="py-6 border-b">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Included Features:
                    </h4>
                    <ul className="space-y-2">
                      {item.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-6">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>${item.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>${item.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Moved to right side */}
            <div className="md:col-span-3 order-2 md:order-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                {isProgram && step === 1 ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Tell Us About Yourself
                    </h2>
                    {renderApplicationForm()}
                  </>
                ) : step < totalSteps ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-600 mb-8">
                      <FiLock className="w-5 h-5" />
                      <span>Secure Payment</span>
                    </div>
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                          value={paymentForm.name}
                          onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                          value={paymentForm.email}
                          onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          required
                          className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                          value={paymentForm.country}
                          onChange={(e) => setPaymentForm({ ...paymentForm, country: e.target.value })}
                        >
                          <option value="">Select a country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          {/* Add more countries */}
                        </select>
                      </div>
                      <div className="pt-6 border-t">
                        <div className="flex items-center gap-2 text-gray-600 mb-8">
                          <FiCreditCard className="w-5 h-5" />
                          <span>Payment Information</span>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={19}
                              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                              value={paymentForm.cardNumber}
                              onChange={(e) => setPaymentForm({ 
                                ...paymentForm, 
                                cardNumber: formatCardNumber(e.target.value)
                              })}
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={5}
                                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={paymentForm.expiry}
                                onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVC
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={3}
                                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={paymentForm.cvc}
                                onChange={(e) => setPaymentForm({ ...paymentForm, cvc: e.target.value })}
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button type="submit" variant="primary" className="w-full mt-8">
                        Pay ${item.price}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiCheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {isProgram ? 'Application Successful!' : 'Payment Successful!'}
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Thank you for your {isProgram ? 'application' : 'purchase'}. You will receive a confirmation email shortly.
                    </p>
                    <Button variant="primary">
                      {isProgram ? 'Get Started' : `View ${item.type === 'resource' ? 'Resource' : 'Membership'}`}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout 