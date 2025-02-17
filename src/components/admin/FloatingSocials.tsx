import { useState } from 'react'
import { 
  FiShare2, FiTwitter, FiFacebook, FiLinkedin, 
  FiLink, FiPlus, FiInstagram, FiYoutube, FiX 
} from 'react-icons/fi'

interface SocialLink {
  id: string
  icon: typeof FiTwitter
  name: string
}

const FloatingSocials = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: '1', icon: FiTwitter, name: 'Twitter' },
    { id: '2', icon: FiFacebook, name: 'Facebook' },
    { id: '3', icon: FiLinkedin, name: 'LinkedIn' }
  ])

  const availableSocials = [
    { icon: FiTwitter, label: 'Twitter' },
    { icon: FiFacebook, label: 'Facebook' },
    { icon: FiLinkedin, label: 'LinkedIn' },
    { icon: FiInstagram, label: 'Instagram' },
    { icon: FiYoutube, label: 'YouTube' }
  ]

  return (
    <>
      <div className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3 z-[9999]">
        <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group">
          <FiShare2 className="w-5 h-5 text-gray-600 group-hover:text-primary" />
        </button>

        <div className="w-px h-6 bg-gray-300/50" />

        <div className="space-y-3 relative">
          {socialLinks.map((social) => (
            <div key={social.id} className="group relative">
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110">
                <social.icon className="w-5 h-5 text-gray-600 group-hover:text-primary" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-px h-6 bg-gray-300/50" />

        <button 
          onClick={() => setShowAddModal(true)}
          className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        >
          <FiPlus className="w-5 h-5 text-gray-600 group-hover:text-primary" />
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000]">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Social Link</h3>
              <button onClick={() => setShowAddModal(false)}>
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {availableSocials.map((social, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSocialLinks([
                      ...socialLinks,
                      { id: Date.now().toString(), icon: social.icon, name: social.label }
                    ])
                    setShowAddModal(false)
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <social.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">{social.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingSocials 