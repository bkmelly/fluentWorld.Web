import { useState, useRef, useEffect } from 'react'
import { 
  FiBold, FiItalic, FiLink, FiList, FiCode, 
  FiAlignLeft, FiAlignCenter, FiAlignRight 
} from 'react-icons/fi'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value)
    updateValue()
  }

  const updateValue = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleLink = () => {
    if (showLinkInput) {
      if (linkUrl) {
        execCommand('createLink', linkUrl)
      }
      setLinkUrl('')
    }
    setShowLinkInput(!showLinkInput)
  }

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [])

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <button
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bold"
        >
          <FiBold />
        </button>
        <button
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Italic"
        >
          <FiItalic />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Bullet List"
        >
          <FiList />
        </button>
        <button
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Numbered List"
        >
          <FiList className="rotate-180" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={handleLink}
          className="p-2 hover:bg-gray-200 rounded"
          title="Insert Link"
        >
          <FiLink />
        </button>
        <button
          onClick={() => execCommand('formatBlock', '<pre>')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Code Block"
        >
          <FiCode />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => execCommand('justifyLeft')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Align Left"
        >
          <FiAlignLeft />
        </button>
        <button
          onClick={() => execCommand('justifyCenter')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Align Center"
        >
          <FiAlignCenter />
        </button>
        <button
          onClick={() => execCommand('justifyRight')}
          className="p-2 hover:bg-gray-200 rounded"
          title="Align Right"
        >
          <FiAlignRight />
        </button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="p-2 border-b bg-gray-50 flex gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL..."
            className="flex-1 px-2 py-1 border rounded"
          />
          <button
            onClick={handleLink}
            className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
          >
            Add Link
          </button>
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none"
        placeholder={placeholder}
        onInput={updateValue}
      />
    </div>
  )
}

export default RichTextEditor 