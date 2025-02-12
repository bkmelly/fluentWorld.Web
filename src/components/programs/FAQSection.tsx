import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

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
  }
  // Add more FAQs...
]

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
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
    </section>
  )
}

export default FAQSection 