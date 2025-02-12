const categories = [
  'All',
  'Books',
  'Video Courses',
  'Templates',
  'Tools',
  'Workshops'
]

const CategoryFilter = () => {
  return (
    <section className="py-8 px-6 bg-neutral-50 border-b">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Browse Resources by Category
        </h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-white border hover:border-primary hover:text-primary transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryFilter 