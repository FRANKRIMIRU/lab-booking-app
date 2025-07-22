import heroImage from "../assets/call-us.jpg";

function Contact() {
  return (
    <section className="relative bg-gray-50 ">
      {/* Mobile heading */}
      <div className="block lg:hidden text-center py-6 px-4">
        <h1 className="text-3xl font-bold text-blue-600">
          We'd love to hear from you
        </h1>
      </div>

      {/* Image + Overlay for larger screens */}
      <div className="relative w-full overflow-hidden shadow-md  block h-[80vh] lg:h-[90vh]">
        <img
          src={heroImage}
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/40 flex items-center p-8  ">
          <h1 className="hidden lg:block text-5xl font-bold text-white ">
            We'd love to hear from you
          </h1>
        </div>

        {/* Contact Form on Image */}
        <div className="absolute inset-0 flex justify-center  lg:justify-end p-12 h-full ">
          <form className="bg-white max-w-md w-full p-8 rounded shadow-lg space-y-4 ">
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
