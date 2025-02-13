import { FiUsers, FiAward, FiBookOpen } from 'react-icons/fi'
import { useState } from 'react'
import Button from '../components/common/button'
import TeamGrid from '../components/about/TeamGrid'
import CommunitySection from '../components/resources/CommunitySection'

const stats = [
  {
    label: 'Students Enrolled',
    value: '10,000+',
    icon: FiUsers,
    growth: '+25% from last year'
  },
  {
    label: 'Course Completion Rate',
    value: '94%',
    icon: FiAward,
    growth: '+5% from last year'
  },
  {
    label: 'Available Courses',
    value: '50+',
    icon: FiBookOpen,
    growth: 'New courses monthly'
  }
]

const values = [
  {
    title: 'Innovation',
    description: 'We constantly push boundaries and embrace new technologies to provide cutting-edge education.'
  },
  {
    title: 'Excellence',
    description: 'We strive for the highest standards in everything we do, from course content to student support.'
  },
  {
    title: 'Inclusivity',
    description: 'We believe in making quality education accessible to everyone, regardless of their background.'
  },
  {
    title: 'Community',
    description: 'We foster a supportive environment where students can learn, grow, and connect with peers.'
  }
]

const faqs = [
  {
    question: 'What makes your education platform different?',
    answer: 'Our platform combines industry-led curriculum, personalized mentorship, and hands-on projects to ensure practical learning outcomes.'
  },
  {
    question: 'Do you offer job placement assistance?',
    answer: 'Yes, we provide comprehensive career services including resume reviews, mock interviews, and direct connections with hiring partners.'
  },
  {
    question: 'Are the courses self-paced?',
    answer: 'Most of our courses offer flexible, self-paced learning options while maintaining structured milestones and deadlines.'
  },
  {
    question: 'What kind of support do students receive?',
    answer: 'Students receive 1-on-1 mentorship, access to our community forum, live Q&A sessions, and dedicated technical support.'
  }
]

const About = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-gray-900 opacity-90" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("/path-to-pattern.png")',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Transforming Education for the Digital Age
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We're on a mission to make quality education accessible to everyone and prepare students for the future of work.
          </p>
        </div>
      </section>

      {/* Improved Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="relative p-6 rounded-xl bg-neutral-50 overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                <stat.icon className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-primary">
                  {stat.growth}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, we started with a simple idea: to make quality education accessible to everyone. What began as a small collection of online courses has grown into a comprehensive learning platform.
                </p>
                <p>
                  Today, we're proud to have helped thousands of students achieve their goals and advance their careers through our programs.
                </p>
              </div>
              <Button variant="primary" className="mt-8">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <img
                src="/path-to-about-image.jpg"
                alt="Our story"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and help us deliver the best possible experience for our students.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team of experts is passionate about education and committed to your success.
            </p>
          </div>
          <TeamGrid />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about our platform and programs.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-50"
                  onClick={() => setOpenFaq(openFaq === faq.question ? null : faq.question)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className="text-2xl text-primary">
                    {openFaq === faq.question ? '−' : '+'}
                  </span>
                </button>
                {openFaq === faq.question && (
                  <div className="px-6 py-4 bg-neutral-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <CommunitySection />
    </main>
  )
}

export default About 