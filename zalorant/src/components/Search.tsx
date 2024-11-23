export default function Search() {
  return (
    <div className="flex items-center justify-between w-full max-w-md bg-white p-2 rounded-full shadow-sm">
      <input
        type="text"
        placeholder="Cari produk, brand, atau kategori..."
        className="w-full p-3 text-sm text-gray-700 focus:ring-0 focus:outline-none placeholder:text-gray-400 rounded-full"
      />
      <button
        className="px-4 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-700 focus:ring-2 focus:ring-black focus:ring-opacity-50 transition duration-300"
      >
        Cari
      </button>
    </div>
  )
}
