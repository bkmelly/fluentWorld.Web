interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-2 rounded-lg font-medium transition-colors"
  const variants = {
    primary: "bg-cta hover:bg-cta/90 text-white",
    secondary: "bg-primary hover:bg-primary/90 text-white"
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
