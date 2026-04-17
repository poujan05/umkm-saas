'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "Apa itu UMKM SaaS?",
    answer: "Platform untuk membantu UMKM mengelola produk dan bisnis mereka."
  },
  {
    question: "Apakah gratis?",
    answer: "Ya, saat ini masih gratis."
  },
  {
    question: "Apakah data saya aman?",
    answer: "Data disimpan menggunakan Firebase yang aman."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 shadow"
          >
            <button
              className="w-full text-left font-semibold"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              {faq.question}
            </button>

            {openIndex === index && (
              <p className="mt-2 text-gray-700">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}