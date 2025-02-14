import { Link } from 'react-router-dom'
import Button from './button'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', url: '#', icon: FaFacebookF },
    { name: 'Twitter', url: '#', icon: FaTwitter },
    { name: 'Instagram', url: '#', icon: FaInstagram },
    { name: 'LinkedIn', url: '#', icon: FaLinkedinIn }
  ]

  return (
    <footer className="bg-[#024D5E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-2xl font-bold">Logo</h3>
            <p className="text-white/80">
              Empowering global communication through expert language education.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@example.com" className="flex items-center gap-2 text-white/80 hover:text-white">
                <FiMail className="w-5 h-5" />
                info@example.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-white/80 hover:text-white">
                <FiPhone className="w-5 h-5" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-2 text-white/80">
                <FiMapPin className="w-5 h-5 flex-shrink-0" />
                <span>123 Language Street, Education City, 12345</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C18721] flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Home
              </Link>
              <Link 
                to="/programs" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Programs
              </Link>
              <Link 
                to="/about" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Programs - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <div className="flex flex-col gap-3">
              <Link 
                to="/programs/english" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                English Courses
              </Link>
              <Link 
                to="/programs/spanish" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Spanish Courses
              </Link>
              <Link 
                to="/programs/french" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                French Courses
              </Link>
              <Link 
                to="/programs/german" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                German Courses
              </Link>
            </div>
          </div>

          {/* Resources - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="flex flex-col gap-3">
              <Link 
                to="/blog" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Blog
              </Link>
              <Link 
                to="/study-materials" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Study Materials
              </Link>
              <Link 
                to="/resources/faq" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                FAQs
              </Link>
              <Link 
                to="/resources/community" 
                className="text-white/80 relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Community
              </Link>
            </div>
          </div>

          {/* Join Our Community - 3 columns */}
          <div className="lg:col-span-3 bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Join Our Community</h3>
            <p className="text-white/80 text-sm mb-6">
              Subscribe to our newsletter for language learning tips, cultural insights, and exclusive offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-[#C18721]"
              />
              <Button 
                variant="secondary"
                className="w-full bg-[#C18721] hover:bg-[#C18721]/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-white/60 text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p>© 2024 Language School. All rights reserved.</p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                className="relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="relative w-fit after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#C18721] after:transition-all after:duration-300 after:w-0 hover:after:w-full hover:text-white"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
