import { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import Button from '../common/button'
import type { BlogPost } from '../../types/blog'

interface EditPostCardProps {
  post?: BlogPost
  onSave: (postId: string, data: Partial<BlogPost>) => Promise<void>
  onCancel: () => void
  onImageUpload: (file: File) => Promise<string>
}

const EditPostCard = ({ post, onSave, onCancel, onImageUpload }: EditPostCardProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    image: post?.image || '',
    category: post?.category || 'Uncategorized',
    readTime: post?.readTime || '5 min'
  })
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const imageUrl = await onImageUpload(file)
      setFormData(prev => ({ ...prev, image: imageUrl }))
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate required fields
    if (!formData.title || !formData.excerpt || !formData.image) {
      setError('Please fill in all required fields')
      return
    }

    try {
      await onSave(post?.id || 'new', formData)
    } catch (error) {
      setError('Failed to save post. Please try again.')
      console.error('Error saving post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt *
          </label>
          <textarea
            value={formData.excerpt}
            onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
          >
            <option value="Language Learning">Language Learning</option>
            <option value="Grammar">Grammar</option>
            <option value="Study Tips">Study Tips</option>
            <option value="Culture">Culture</option>
            <option value="Teaching">Teaching</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Read Time
          </label>
          <select
            value={formData.readTime}
            onChange={e => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
          >
            <option value="3 min">3 min</option>
            <option value="5 min">5 min</option>
            <option value="7 min">7 min</option>
            <option value="10 min">10 min</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image *
          </label>
          <div className="flex items-center gap-4">
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <label className="flex-1">
              <div className="px-4 py-2 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                <FiUpload className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm text-gray-600">
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  )
}

export default EditPostCard 