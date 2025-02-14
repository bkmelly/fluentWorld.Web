import ProgramGrid from '../components/programs/ProgramGrid'
import FAQSection from '../components/programs/FAQSection'
import TeamSection from '../components/home/TeamSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import StudentSuccess from '../components/home/StudentSuccess'

const Programs = () => {
  return (
    <main>
      <div className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Educational Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of programs designed to help you succeed in your career
          </p>
        </div>
      </div>
      <ProgramGrid />
      <FAQSection />
      <WhyChooseUs />
      <StudentSuccess />
      <TeamSection />
     
    </main>
  )
}

export default Programs 