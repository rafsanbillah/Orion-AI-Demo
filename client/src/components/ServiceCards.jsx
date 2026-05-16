import { CheckCircle2 } from 'lucide-react'

function ServiceCards({ services }) {
  return (
    <section className="space-y-4" id="services">
      <div>
        <p className="text-sm font-semibold uppercase text-emerald-700">Services</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          What this industry site can handle
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            key={service}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={20} aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-slate-950">{service}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Capture the request, qualify the lead, and prepare the next follow-up.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServiceCards
