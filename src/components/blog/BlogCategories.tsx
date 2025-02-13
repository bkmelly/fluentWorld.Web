interface BlogCategoriesProps {
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
}

const categories = [
  'All',
  'Development',
  'UX/UI Design',
  'QA Engineering',
  'DevOps',
  'Career'
]

const BlogCategories = ({ selectedCategory, onCategorySelect }: BlogCategoriesProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto bg-[#024D5E]/5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category === 'All' ? null : category)}
          className={`
            px-4 py-2 rounded-full whitespace-nowrap text-sm transition-colors
            ${selectedCategory === (category === 'All' ? null : category)
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default BlogCategories 