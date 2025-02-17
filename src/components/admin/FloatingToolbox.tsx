import { 
  FiType, FiImage, FiList, FiCheckSquare, FiCode, 
  FiYoutube, FiLink, FiFileText, FiTable, FiColumns,
  FiMessageSquare, FiBookOpen
} from 'react-icons/fi'

interface FloatingToolboxProps {
  onAddBlock: (type: string) => void
  activeBlock: string | null
}

const FloatingToolbox = ({ onAddBlock, activeBlock }: FloatingToolboxProps) => {
  if (!activeBlock) return null

  const tools = [
    { id: 'heading1', icon: FiType, label: 'H1', style: 'font-bold text-lg' },
    { id: 'heading2', icon: FiType, label: 'H2', style: 'font-semibold' },
    { id: 'paragraph', icon: FiFileText, label: 'Text' },
    { id: 'quote', icon: FiMessageSquare, label: 'Quote' },
    { id: 'image', icon: FiImage, label: 'Image' },
    { id: 'video', icon: FiYoutube, label: 'Video' },
    { id: 'code', icon: FiCode, label: 'Code' },
    { id: 'checklist', icon: FiCheckSquare, label: 'Checklist' },
    { id: 'bulletList', icon: FiList, label: 'List' },
    { id: 'table', icon: FiTable, label: 'Table' },
    { id: 'columns', icon: FiColumns, label: 'Columns' },
    { id: 'callout', icon: FiBookOpen, label: 'Callout' }
  ]

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg">
      <div className="p-2 grid grid-cols-6 gap-1">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => onAddBlock(tool.id)}
            className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-xl transition-colors group"
            title={`Add ${tool.label}`}
          >
            <tool.icon className="w-5 h-5 text-gray-600 group-hover:text-primary mb-1" />
            <span className={`text-xs text-gray-600 group-hover:text-primary ${tool.style || ''}`}>
              {tool.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FloatingToolbox 