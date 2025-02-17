import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import AdminNav from '../../components/admin/AdminNav'
import { storage, db } from '../../config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'
import type { BlogPost } from '../../types/blog'
import BlogPostCard from '../../components/admin/BlogPostCard'
import EditPostCard from '../../components/admin/EditPostCard'
import { initializeBlogPosts } from '../../utils/adminUtils'

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAndFetch = async () => {
      try {
        setIsLoading(true)
        const wasInitialized = await initializeBlogPosts()
        if (wasInitialized) {
          console.log('Blog collection initialized with sample posts')
        }
        await fetchPosts()
      } catch (error) {
        console.error('Error setting up blog management:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAndFetch()
  }, [])

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const blogRef = collection(db, 'blogs') // Make sure this matches your Firestore collection name
      const querySnapshot = await getDocs(blogRef)
      
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure date is properly formatted
        date: doc.data().date?.toDate?.() || new Date(doc.data().date),
      })) as BlogPost[]

      console.log('Fetched posts:', fetchedPosts) // For debugging
      setPosts(fetchedPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `blog_images/${file.name}-${Date.now()}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  const handleEdit = async (postId: string, updatedData: Partial<BlogPost>) => {
    try {
      const blogRef = collection(db, 'blogs')
      
      if (postId === 'new') {
        // Create new post
        const newPost = {
          ...updatedData,
          date: new Date().toISOString(),
          author: {
            name: 'Admin', // You might want to get this from the current user
            role: 'Administrator',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' // Default avatar
          },
          // Ensure all required fields are present
          readTime: updatedData.readTime || '5 min',
          category: updatedData.category || 'Uncategorized',
          content: updatedData.content || '',
        }

        // Log the new post data for debugging
        console.log('Creating new post:', newPost)

        // Add the new post to Firestore
        const docRef = await addDoc(blogRef, newPost)
        console.log('New post created with ID:', docRef.id)
      } else {
        // Update existing post
        const docRef = doc(db, 'blogs', postId)
        await updateDoc(docRef, {
          ...updatedData,
          lastUpdated: new Date().toISOString()
        })
      }
      
      await fetchPosts() // Refresh posts
      setIsEditing(null)
    } catch (error) {
      console.error('Error updating/creating post:', error)
      // You might want to show an error message to the user here
    }
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      const docRef = doc(db, 'blogs', postId)
      await deleteDoc(docRef)
      console.log('Post deleted:', postId)
      await fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <main className="ml-64 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="h-4 w-96 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Existing Blog Posts */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {isEditing === post.id ? (
                <EditPostCard
                  post={post}
                  onSave={handleEdit}
                  onCancel={() => setIsEditing(null)}
                  onImageUpload={handleImageUpload}
                />
              ) : (
                <BlogPostCard
                  post={post}
                  onEdit={() => setIsEditing(post.id)}
                  onDelete={() => handleDelete(post.id)}
                />
              )}
            </div>
          ))}

          {/* Add New Post Card */}
          {isEditing === 'new' ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <EditPostCard
                onSave={handleEdit}
                onCancel={() => setIsEditing(null)}
                onImageUpload={handleImageUpload}
              />
            </div>
          ) : (
            <button
              onClick={() => setIsEditing('new')}
              className="group bg-white rounded-lg shadow-sm p-6 border-2 border-dashed border-gray-200 
                hover:border-primary hover:shadow-md transition-all duration-200 
                flex flex-col items-center justify-center gap-4"
            >
              <FiPlus className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors duration-200" />
              <span className="font-medium text-gray-600 group-hover:text-primary transition-colors duration-200">
                Add New Post
              </span>
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default BlogManagement 