export default function Banner() {
  return (
    <div className="bg-gray-50 py-16 w-full">
      <main className="max-w-7xl mx-auto text-center px-6">
        <h1 className="text-5xl font-bold text-gray-800">Welcome to Zalorant</h1>
        <p className="text-lg text-gray-600 mt-4">
          Explore our exclusive collection of products tailored just for you. Style meets comfort at its finest.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <a
            href="#"
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Shop Now
          </a>
          <a
            href="#"
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-800 hover:border-gray-500 transition"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  )
}
