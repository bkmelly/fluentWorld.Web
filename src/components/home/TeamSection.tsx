import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi'

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Lead Instructor, Web Development',
    image: '/path-to-image.jpg',
    bio: '15+ years of experience in full-stack development. Former Tech Lead at Microsoft.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    expertise: ['React', 'Node.js', 'Cloud Architecture']
  },
  {
    name: 'Michael Chen',
    role: 'Senior Instructor, Data Science',
    image: '/path-to-image.jpg',
    bio: 'PhD in Machine Learning. Previously AI Researcher at Google Brain.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    expertise: ['Machine Learning', 'Python', 'Deep Learning']
  },
  {
    name: 'Emma Rodriguez',
    role: 'Lead Instructor, UX Design',
    image: '/path-to-image.jpg',
    bio: 'Award-winning designer with experience at top tech companies.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    expertise: ['UI/UX', 'Product Design', 'User Research']
  },
  {
    name: 'James Wilson',
    role: 'Senior Instructor, DevOps',
    image: '/path-to-image.jpg',
    bio: 'Cloud architecture expert. Previously DevOps Lead at Amazon.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    expertise: ['AWS', 'Docker', 'Kubernetes']
  }
]

const TeamSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn from Industry Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our instructors bring years of real-world experience from top tech companies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay with social links */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#024D5E]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-4 justify-center">
                      {Object.entries(member.social).map(([platform, link]) => (
                        <a
                          key={platform}
                          href={link}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                          {platform === 'linkedin' && <FiLinkedin className="w-5 h-5 text-white" />}
                          {platform === 'twitter' && <FiTwitter className="w-5 h-5 text-white" />}
                          {platform === 'github' && <FiGithub className="w-5 h-5 text-white" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-[#024D5E] font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, i) => (
                    <span 
                      key={i}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#024D5E]/5 text-[#024D5E]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection 