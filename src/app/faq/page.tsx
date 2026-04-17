'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "Apa itu UMKM SaaS?",
    answer: "Platform untuk membantu UMKM mengelola bisnis."
  },
  {
    question: "Apakah gratis?",
    answer: "Ya, saat ini gratis."
  }
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">FAQ</h1>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
          >
            <button
              className="font-semibold w-full text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {faq.question}
            </button>

            {open === i && (
              <p className="text-gray-600 mt-2">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}