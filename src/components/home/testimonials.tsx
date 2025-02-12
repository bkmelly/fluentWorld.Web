import { useState } from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
  rating: number
}

interface FAQ {
  question: string
  answer: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Web Development Student',
    content: 'The program exceeded my expectations. The instructors are fantastic and the content is up-to-date.',
    avatar: '/path-to-avatar.jpg',
    rating: 5
  },
  // Add more testimonials...
]

const faqs: FAQ[] = [
  {
    question: 'How long are the programs?',
    answer: 'Program lengths vary from 8 to 24 weeks, depending on the course and your pace of learning.'
  },
  {
    question: 'How long are the programs?',
    answer: 'Program lengths vary from 8 to 24 weeks, depending on the course and your pace of learning.'
  },
  {
    question: 'How long are the programs?',
    answer: 'Program lengths vary from 8 to 24 weeks, depending on the course and your pace of learning.'
  },
  {
    question: 'How long are the programs?',
    answer: 'Program lengths vary from 8 to 24 weeks, depending on the course and your pace of learning.'
  },
  {
    question: 'How long are the programs?',
    answer: 'Program lengths vary from 8 to 24 weeks, depending on the course and your pace of learning.'
  },
  {
    question: 'How long are the programs?',
    answer: 'Program lengths vary from 8 to 24 weeks, depending on the course and your pace of learning.'
  },
  // Add more FAQs...
]

const Testimonials = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-neutral-50 p-6 rounded-lg space-y-4"
              >
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-600">{testimonial.content}</p>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-50"
                  onClick={() => setOpenFAQ(openFAQ === faq.question ? null : faq.question)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-2xl">{openFAQ === faq.question ? '−' : '+'}</span>
                </button>
                {openFAQ === faq.question && (
                  <div className="px-6 py-4 bg-neutral-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
