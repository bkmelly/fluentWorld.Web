interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
}

const Button = ({ variant = 'primary', children, className, ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-2 rounded-lg font-medium transition-all duration-200"
  const variants = {
    primary: "bg-brand-primary hover:bg-brand-primary/90 text-white shadow-sm hover:shadow",
    secondary: "bg-brand-secondary hover:bg-brand-secondary/90 text-white shadow-sm hover:shadow",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5"
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
