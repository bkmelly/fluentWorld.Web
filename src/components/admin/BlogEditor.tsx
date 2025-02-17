import { useState, useEffect } from 'react'
import { FiX, FiPlus, FiImage, FiCheck, FiEdit2 } from 'react-icons/fi'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Button from '../common/button'
import type { BlogPost } from '../../types/blog'

interface BlogEditorProps {
  post: BlogPost
  onClose: () => void
}

type BlockType = 'heading1' | 'heading2' | 'paragraph' | 'image' | 'checklist'

interface ContentBlock {
  id: string
  type: BlockType
  content: string
}

const BlogEditor = ({ post, onClose }: BlogEditorProps) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Initialize blocks from post content or create default structure
    if (post.content) {
      try {
        setBlocks(JSON.parse(post.content))
      } catch (error) {
        console.error('Error parsing content:', error)
        setBlocks([{ id: '1', type: 'paragraph', content: '' }])
      }
    } else {
      setBlocks([{ id: '1', type: 'paragraph', content: '' }])
    }
  }, [post])

  const handleSave = async () => {
    try {
      setSaving(true)
      const docRef = doc(db, 'blogs', post.id)
      await updateDoc(docRef, {
        content: JSON.stringify(blocks),
        lastUpdated: new Date().toISOString()
      })
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setSaving(false)
    }
  }

  const addBlock = (type: BlockType, afterId: string) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: ''
    }
    
    const index = blocks.findIndex(b => b.id === afterId)
    const newBlocks = [
      ...blocks.slice(0, index + 1),
      newBlock,
      ...blocks.slice(index + 1)
    ]
    
    setBlocks(newBlocks)
    setActiveBlock(newBlock.id)
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ))
  }

  const deleteBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter(block => block.id !== id))
    }
  }

  const handleImageUpload = async (file: File, blockId: string) => {
    try {
      const storageRef = ref(storage, `blog_content/${post.id}/${file.name}-${Date.now()}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      updateBlock(blockId, url)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Edit Blog Content
            </h2>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Editor */}
          <div className="p-6 space-y-6">
            {blocks.map((block) => (
              <div
                key={block.id}
                className={`group relative ${
                  activeBlock === block.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveBlock(block.id)}
              >
                {/* Block Controls */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => addBlock('paragraph', block.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>

                {/* Block Content */}
                {block.type === 'heading1' && (
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    className="w-full text-3xl font-bold focus:outline-none"
                    placeholder="Heading 1"
                  />
                )}

                {block.type === 'heading2' && (
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    className="w-full text-2xl font-semibold focus:outline-none"
                    placeholder="Heading 2"
                  />
                )}

                {block.type === 'paragraph' && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    className="w-full min-h-[100px] focus:outline-none resize-none"
                    placeholder="Type your content here..."
                  />
                )}

                {block.type === 'image' && (
                  <div className="relative">
                    {block.content ? (
                      <img
                        src={block.content}
                        alt=""
                        className="w-full rounded-lg"
                      />
                    ) : (
                      <label className="block aspect-video bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, block.id)
                          }}
                        />
                        <div className="h-full flex items-center justify-center">
                          <FiImage className="w-8 h-8 text-gray-400" />
                        </div>
                      </label>
                    )}
                  </div>
                )}

                {block.type === 'checklist' && (
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      <FiCheck className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      className="flex-1 focus:outline-none"
                      placeholder="Checklist item"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Block Type Menu */}
          {activeBlock && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              <button
                onClick={() => addBlock('heading1', activeBlock)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Add Heading 1"
              >
                H1
              </button>
              <button
                onClick={() => addBlock('heading2', activeBlock)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Add Heading 2"
              >
                H2
              </button>
              <button
                onClick={() => addBlock('image', activeBlock)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Add Image"
              >
                <FiImage className="w-5 h-5" />
              </button>
              <button
                onClick={() => addBlock('checklist', activeBlock)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Add Checklist"
              >
                <FiCheck className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogEditor 