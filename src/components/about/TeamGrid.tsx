import { FaLinkedinIn, FaTwitter } from 'react-icons/fa'

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
  social: {
    linkedin?: string
    twitter?: string
  }
}

const team: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: '/path-to-image.jpg',
    bio: 'Former Google engineer with 15+ years in EdTech',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  // Add more team members...
]

const TeamGrid = () => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
      {team.map((member) => (
        <div 
          key={member.id}
          className="group relative"
        >
          <div className="aspect-square rounded-xl overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
            <div className="p-6 text-white">
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-gray-300">{member.role}</p>
              <p className="text-sm mt-2 text-gray-300">{member.bio}</p>
              <div className="flex gap-3 mt-4">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                    <FaTwitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamGrid 