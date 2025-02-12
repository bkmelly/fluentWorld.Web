import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Button from '../common/button'
import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
interface Resource {
  id: string
  title: string
  description: string
  image: string
  price: number
  category: string
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Web Development Guide',
    description: 'Comprehensive guide to modern web development',
    image: '/path-to-image.jpg',
    price: 29.99,
    category: 'Books'
  },
  {
    id: '2',
    title: 'Web Development Guide',
    description: 'Comprehensive guide to modern web development',
    image: '/path-to-image.jpg',
    price: 29.99,
    category: 'Books'
  },
  {
    id: '3',
    title: 'Web Development Guide',
    description: 'Comprehensive guide to modern web development',
    image: '/path-to-image.jpg',
    price: 29.99,
    category: 'Books'
  },
  {
    id: '4',
    title: 'Web Development Guide',
    description: 'Comprehensive guide to modern web development',
    image: '/path-to-image.jpg',
    price: 29.99,
    category: 'Books'
  },
  {
    id: '5',
    title: 'Web Development Guide',
    description: 'Comprehensive guide to modern web development',
    image: '/path-to-image.jpg',
    price: 29.99,
    category: 'Books'
  },
  {
    id: '6',
    title: 'Web Development Guide',
    description: 'Comprehensive guide to modern web development',
    image: '/path-to-image.jpg',
    price: 29.99,
    category: 'Books'
  }
  // Add more resources...
]

const ResourceGrid = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(resources.map(resource => resource.category))]

  const filteredResources = selectedCategory
    ? resources.filter(resource => resource.category === selectedCategory)
    : resources

  const CategoryFilters = () => (
    <div className="mb-8 flex gap-4">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {category}
        </button>
      ))}
    </div>
  )

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-video bg-gray-100">
        <img
          src={resource.image}
          alt={resource.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {resource.title}
        </h3>
        <p className="text-gray-600">
          {resource.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">${resource.price}</span>
          <Button variant="primary" onClick={() => handleAddToCart(resource)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )

  const handleAddToCart = (resource: Resource) => {
    // Implement cart functionality
    console.log('Added to cart:', resource)
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <CategoryFilters />
        {isMobile ? (
          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            centeredSlides
            loop
          >
            {filteredResources.map((resource) => (
              <SwiperSlide key={resource.id}>
                <ResourceCard resource={resource} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ResourceGrid 