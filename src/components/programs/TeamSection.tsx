interface TeamMember {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

const team: TeamMember[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Lead Instructor',
    image: '/path-to-image.jpg',
    bio: '10+ years of industry experience in web development and teaching.'
  },
  // Add more team members...
]

const TeamSection = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member) => (
            <div 
              key={member.id}
              className="text-center space-y-4"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </div>
              <p className="text-gray-600 text-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection 