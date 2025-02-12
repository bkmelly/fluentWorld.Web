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
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Community Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Join Our Online Student Community
            </h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <Button variant="primary">Join</Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-gray-600">200 Members</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-gray-600 hover:text-primary">Programs</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-primary">Shop</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Student Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Follow Us Online</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
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
