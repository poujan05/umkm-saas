export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">
        Kelola UMKM Kamu Lebih Mudah
      </h1>

      <p className="text-gray-600 mb-6">
        Platform sederhana untuk mengatur produk dan bisnis UMKM
      </p>

      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Mulai Sekarang
      </a>
    </div>
  )
}