import { motion } from 'framer-motion'
import { FiCheck, FiFileText, FiCreditCard, FiFlag } from 'react-icons/fi'

interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
  type: 'program' | 'resource' | 'membership'
}

const ProgressSteps = ({ currentStep, totalSteps, type }: ProgressStepsProps) => {
  const getStepIcon = (stepNumber: number) => {
    if (type === 'program') {
      switch (stepNumber) {
        case 1: return <FiFileText className="w-5 h-5" />
        case 2: return <FiCreditCard className="w-5 h-5" />
        case 3: return <FiFlag className="w-5 h-5" />
        default: return null
      }
    } else {
      switch (stepNumber) {
        case 1: return <FiCreditCard className="w-5 h-5" />
        case 2: return <FiFlag className="w-5 h-5" />
        default: return null
      }
    }
  }

  const getStepLabel = (stepNumber: number) => {
    if (type === 'program') {
      switch (stepNumber) {
        case 1: return 'Application'
        case 2: return 'Payment'
        case 3: return 'Success'
        default: return ''
      }
    } else {
      switch (stepNumber) {
        case 1: return 'Payment'
        case 2: return 'Success'
        default: return ''
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Steps */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isCompleted = currentStep > stepNumber
          const isCurrent = currentStep === stepNumber

          return (
            <div key={stepNumber} className="relative z-10 flex flex-col items-center">
              <motion.div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-primary' : 'bg-gray-200'}
                  text-white transition-colors duration-200
                `}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {isCompleted ? (
                  <FiCheck className="w-6 h-6" />
                ) : (
                  getStepIcon(stepNumber)
                )}
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 whitespace-nowrap text-sm font-medium"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
              >
                <span className={`
                  ${isCompleted ? 'text-green-500' : isCurrent ? 'text-primary' : 'text-gray-400'}
                `}>
                  {getStepLabel(stepNumber)}
                </span>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressSteps 