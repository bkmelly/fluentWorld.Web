import Button from '../common/button'

const BlogIntro = () => {
  return (
    <section className="py-16 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src="/path-to-featured-blog-image.jpg"
              alt="Featured blog post"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with the latest insights, student success stories, and industry trends.
            </p>
            <Button variant="primary">
              Read More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogIntro 