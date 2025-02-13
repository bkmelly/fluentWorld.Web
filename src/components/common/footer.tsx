import { Link } from 'react-router-dom'
import Button from './button'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', url: '#', icon: FaFacebookF },
    { name: 'Twitter', url: '#', icon: FaTwitter },
    { name: 'Instagram', url: '#', icon: FaInstagram },
    { name: 'LinkedIn', url: '#', icon: FaLinkedinIn }
  ]

  return (
    <footer className="bg-[#024D5E]/5 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Community Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#024D5E]">
              Join Our Online Student Community
            </h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024D5E]/20"
              />
              <Button variant="primary">Join</Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#C18721] border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-gray-600">200 Members</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#024D5E]">Quick Links</h4>
            <ul className="space-y-2">
              {['Programs', 'About Us', 'Contact', 'Shop'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-600 hover:text-[#024D5E] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#024D5E]">Resources</h4>
            <ul className="space-y-2">
              {['Blog', 'Student Support', 'FAQs', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-gray-600 hover:text-[#024D5E] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#024D5E]">Follow Us Online</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#024D5E] hover:text-white hover:border-transparent transition-all duration-200"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
