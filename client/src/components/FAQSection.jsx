function FAQSection({ faqs }) {
  return (
    <section className="space-y-4" id="faq">
      <div>
        <p className="text-sm font-semibold uppercase text-emerald-700">FAQ</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Common customer questions
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {faqs.map((faq) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            key={faq.question}
          >
            <h3 className="text-base font-semibold text-slate-950">{faq.question}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FAQSection
