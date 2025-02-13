import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
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
    company: 'Google',
    content: 'The program exceeded my expectations. The instructors are fantastic and the content is up-to-date with modern industry practices.',
    avatar: '/path-to-avatar.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Data Science Graduate',
    company: 'Microsoft',
    content: 'This course transformed my career. The hands-on projects and mentorship were invaluable in helping me land my dream job.',
    avatar: '/path-to-avatar.jpg',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Design Student',
    company: 'Adobe',
    content: 'The community support and real-world projects made learning engaging and practical. Highly recommend to anyone looking to switch careers.',
    avatar: '/path-to-avatar.jpg',
    rating: 5
  }
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 px-6 bg-[#024D5E]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our graduates who have transformed their careers through our programs
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-24 h-24 md:w-32 md:h-32">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover border-4 border-[#024D5E]/10"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-[#C18721]">★</span>
                          ))}
                        </div>
                        <blockquote className="text-xl md:text-2xl text-gray-900 italic mb-6">
                          "{testimonial.content}"
                        </blockquote>
                        <div>
                          <div className="font-semibold text-[#024D5E]">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 
                       w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 
                       flex items-center justify-center transition-transform
                       hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#024D5E]/20"
          >
            <FiChevronLeft className="w-6 h-6 text-[#024D5E]" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 
                       w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 
                       flex items-center justify-center transition-transform
                       hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#024D5E]/20"
          >
            <FiChevronRight className="w-6 h-6 text-[#024D5E]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                           ${currentIndex === index 
                             ? 'bg-[#024D5E] w-8' 
                             : 'bg-[#024D5E]/20 hover:bg-[#024D5E]/40'}`}
              />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
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
