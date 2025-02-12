const ContactForm = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Do You Have Any Inquiries?
        </h2>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="tel"
            placeholder="WhatsApp No"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full px-4 py-3 border rounded-lg resize-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm 