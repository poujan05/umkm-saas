'use client'

import { useState } from 'react'

export default function FAQItem({ question, answer }: any) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border p-4 mb-2 rounded">
      <h2
        className="font-semibold cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {question}
      </h2>

      {open && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  )
}