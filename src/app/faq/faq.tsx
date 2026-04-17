import FAQItem from '@/components/FAQItem'

export default function FAQPage() {
  const faqs = [
    {
      question: "Bagaimana cara meningkatkan penjualan?",
      answer: "Coba gunakan foto produk yang menarik dan deskripsi jelas."
    },
    {
      question: "Kapan waktu terbaik jualan?",
      answer: "Biasanya sore hingga malam hari."
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">FAQ UMKM</h1>

      {faqs.map((faq, index) => (
        <FAQItem key={index} {...faq} />
      ))}
    </div>
  )
}