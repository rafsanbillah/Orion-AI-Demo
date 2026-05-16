import { ArrowRight } from 'lucide-react'

function Hero({ config }) {
  return (
    <section className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.35fr_1fr] md:p-8">
      <div className="space-y-6">
        <div className="inline-flex rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          {config.tagline}
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase text-slate-500">
            {config.brandName}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold text-slate-950 sm:text-5xl">
            {config.heroTitle}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            {config.heroSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            href="#contact"
          >
            Start a request
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            className="inline-flex rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            href="#services"
          >
            View services
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold text-slate-950">Lead capture flow</p>
        <div className="mt-4 space-y-3">
          {config.leadQualificationFields.slice(0, 4).map((field, index) => (
            <div className="flex items-center gap-3 rounded-md bg-white p-3" key={field}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-sm font-semibold text-emerald-700">
                {index + 1}
              </span>
              <span className="text-sm text-slate-700">{field}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
