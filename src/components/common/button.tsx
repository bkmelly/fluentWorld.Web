interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  className?: string
}

const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "relative px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ease-out transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: `bg-[#024D5E] text-white shadow-sm
              hover:shadow-md hover:bg-[#024D5E]/90 
              active:shadow-sm active:bg-[#024D5E]/95
              focus:ring-[#024D5E]/50`,
    
    secondary: `bg-[#C18721] text-white shadow-sm
                hover:shadow-md hover:bg-[#C18721]/90
                active:shadow-sm active:bg-[#C18721]/95
                focus:ring-[#C18721]/50`,
    
    outline: `border-2 border-[#024D5E] text-[#024D5E] 
              hover:bg-[#024D5E]/5 hover:border-[#024D5E]/90
              active:bg-[#024D5E]/10
              focus:ring-[#024D5E]/30`
  }

  // Add ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size/2
    const y = e.clientY - rect.top - size/2
    
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.className = 'absolute rounded-full pointer-events-none bg-white/20 animate-ripple'
    
    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 1000)

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} overflow-hidden`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
