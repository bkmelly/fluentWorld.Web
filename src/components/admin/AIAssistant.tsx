import { useState } from 'react'
import { FiZap, FiRefreshCw } from 'react-icons/fi'
import Button from '../common/button'

interface AIAssistantProps {
  content: string
  onApplyTitle: (title: string) => void
  onApplyExcerpt: (excerpt: string) => void
}

const AIAssistant = ({ content, onApplyTitle, onApplyExcerpt }: AIAssistantProps) => {
  const [suggestions, setSuggestions] = useState<{
    titles: string[]
    excerpts: string[]
  }>({
    titles: [],
    excerpts: []
  })
  const [loading, setLoading] = useState(false)

  const generateSuggestions = async () => {
    setLoading(true)
    try {
      // Here you would integrate with your AI service (OpenAI, etc.)
      // For now, we'll simulate some suggestions
      const mockSuggestions = {
        titles: [
          "Master the Art of Language Learning: 5 Proven Strategies",
          "The Ultimate Guide to Accelerated Language Acquisition",
          "Breaking Down Language Barriers: A Comprehensive Approach"
        ],
        excerpts: [
          "Discover powerful techniques that will transform your language learning journey...",
          "Learn how to effectively immerse yourself in a new language...",
          "Unlock your potential with these research-backed learning methods..."
        ]
      }
      setSuggestions(mockSuggestions)
    } catch (error) {
      console.error('Error generating suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
          <Button
            variant="outline"
            onClick={generateSuggestions}
            disabled={loading}
            className="!p-2"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <Button
          variant="primary"
          onClick={generateSuggestions}
          disabled={loading}
          className="w-full"
        >
          <FiZap className="w-4 h-4 mr-2" />
          Generate Suggestions
        </Button>
      </div>

      {(suggestions.titles.length > 0 || suggestions.excerpts.length > 0) && (
        <div className="p-4 space-y-4">
          {suggestions.titles.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                Suggested Titles
              </h4>
              <div className="space-y-2">
                {suggestions.titles.map((title, i) => (
                  <button
                    key={i}
                    onClick={() => onApplyTitle(title)}
                    className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded"
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions.excerpts.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-gray-700 mb-2">
                Suggested Excerpts
              </h4>
              <div className="space-y-2">
                {suggestions.excerpts.map((excerpt, i) => (
                  <button
                    key={i}
                    onClick={() => onApplyExcerpt(excerpt)}
                    className="w-full text-left p-2 text-sm hover:bg-gray-50 rounded"
                  >
                    {excerpt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AIAssistant 