import Button from '../common/button'

const CommunitySection = () => {
  return (
    <section className="py-16 px-6 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Join Our Online Student Community
            </h2>
            <p className="text-lg text-gray-600">
              Connect with fellow learners, share experiences, and grow together
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto px-6 py-3 border rounded-lg"
              />
              <Button variant="primary">
                Join Community
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                  />
                ))}
              </div>
              <span className="text-gray-600">200+ Members</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection 