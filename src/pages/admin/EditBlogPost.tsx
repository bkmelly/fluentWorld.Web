import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiX, FiPlus, FiImage, FiCheck, FiSave } from 'react-icons/fi'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Button from '../../components/common/button'
import type { BlogPost } from '../../types/blog'
import RichTextEditor from '../../components/admin/RichTextEditor'
import AIAssistant from '../../components/admin/AIAssistant'
import FloatingToolbox from '../../components/admin/FloatingToolbox'
import { FiCalendar, FiClock, FiTag, FiUser } from 'react-icons/fi'

type BlockType = 'heading1' | 'heading2' | 'paragraph' | 'image' | 'checklist' | 'quote'

interface ContentBlock {
  id: string
  type: BlockType
  content: string
}

const EditBlogPost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Header section state
  const [title, setTitle] = useState(post?.title || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [headerImage, setHeaderImage] = useState(post?.image || '')

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return
      
      try {
        const docRef = doc(db, 'blogs', postId)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() } as BlogPost
          setPost(postData)
          setTitle(postData.title)
          setExcerpt(postData.excerpt)
          setHeaderImage(postData.image)
          
          if (postData.content) {
            try {
              setBlocks(JSON.parse(postData.content))
            } catch (error) {
              console.error('Error parsing content:', error)
              setBlocks([{ id: '1', type: 'paragraph', content: '' }])
            }
          }
        } else {
          console.error('Post not found')
          navigate('/admin/blog')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        navigate('/admin/blog')
      }
    }

    fetchPost()
  }, [postId, navigate])

  const handleSave = async () => {
    if (!postId || !post) return

    try {
      setSaving(true)
      const docRef = doc(db, 'blogs', postId)
      await updateDoc(docRef, {
        title,
        excerpt,
        image: headerImage,
        content: JSON.stringify(blocks),
        lastUpdated: new Date().toISOString()
      })
      navigate('/admin/blog')
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateBlock = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ))
  }

  const addBlock = (type: string) => {
    const newBlock = {
      id: Date.now().toString(),
      type: type as BlockType,
      content: ''
    }
    
    if (activeBlock) {
      const index = blocks.findIndex(b => b.id === activeBlock)
      setBlocks([
        ...blocks.slice(0, index + 1),
        newBlock,
        ...blocks.slice(index + 1)
      ])
    } else {
      setBlocks([...blocks, newBlock])
    }
    setActiveBlock(newBlock.id)
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Save/Cancel Buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4 bg-white rounded-lg shadow-lg px-4 py-2">
        <Button variant="outline" onClick={() => navigate('/admin/blog')}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={headerImage}
            alt={title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16">
          <div className="flex items-center gap-4 text-gray-300 mb-4">
            <span className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              {new Date().toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2">
              <FiTag className="w-4 h-4" />
              {post.category}
            </span>
          </div>
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl md:text-5xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 mb-4"
            placeholder="Enter post title..."
          />
          
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="text-xl text-gray-200 bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
            placeholder="Enter post excerpt..."
            rows={2}
          />

          <div className="flex items-center gap-4 mt-8">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="text-white font-medium">{post.author.name}</div>
              <div className="text-gray-300 text-sm">{post.author.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          {blocks.map((block) => (
            <div
              key={block.id}
              className={`group relative my-8 ${
                activeBlock === block.id ? 'ring-2 ring-primary/20 rounded-lg p-2' : ''
              }`}
              onClick={() => setActiveBlock(block.id)}
            >
              {/* Block Content */}
              {block.type === 'heading1' && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  className="w-full text-4xl font-bold focus:outline-none"
                  placeholder="Heading 1"
                />
              )}

              {block.type === 'heading2' && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  className="w-full text-3xl font-semibold focus:outline-none"
                  placeholder="Heading 2"
                />
              )}

              {block.type === 'paragraph' && (
                <RichTextEditor
                  value={block.content}
                  onChange={(content) => updateBlock(block.id, content)}
                  placeholder="Type your content here..."
                />
              )}

              {block.type === 'quote' && (
                <blockquote>
                  <textarea
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, e.target.value)}
                    className="w-full italic focus:outline-none resize-none"
                    placeholder="Enter a quote..."
                    rows={2}
                  />
                </blockquote>
              )}

              {/* ... other block types ... */}
            </div>
          ))}
        </div>
      </section>

      {/* Floating Tools */}
      <FloatingToolbox 
        onAddBlock={addBlock}
        activeBlock={activeBlock}
      />

      {/* AI Assistant */}
      <AIAssistant
        content={blocks.map(b => b.content).join('\n')}
        onApplyTitle={setTitle}
        onApplyExcerpt={setExcerpt}
      />
    </div>
  )
}

export default EditBlogPost 