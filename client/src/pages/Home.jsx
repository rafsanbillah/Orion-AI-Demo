import { ArrowRight, Code2, Database, Rocket, Server } from 'lucide-react'
import { API_BASE_URL } from '../configs/api.js'

const stackItems = [
  {
    icon: Rocket,
    title: 'Client',
    description: 'React + Vite with React Router, Tailwind CSS, and Lucide icons.',
  },
  {
    icon: Server,
    title: 'Server',
    description: 'Express API with route, controller, middleware, and service folders.',
  },
  {
    icon: Database,
    title: 'Database',
    description: 'Mongoose is ready for MongoDB models and connection logic.',
  },
]

function Home() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.5fr_1fr] md:p-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            <Code2 size={16} aria-hidden="true" />
            Beginner-friendly starter
          </div>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-bold text-slate-950 sm:text-5xl">
              Build your MERN MVP from this clean foundation.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              The folders are ready for components, pages, API routes, MongoDB
              models, middleware, services, and environment variables.
            </p>
          </div>

          <a
            className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            href={`${API_BASE_URL}/health`}
            rel="noreferrer"
            target="_blank"
          >
            Check API health
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-900">Next files to edit</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>
              <span className="font-mono text-slate-900">client/src/pages</span> for
              screens
            </p>
            <p>
              <span className="font-mono text-slate-900">server/routes</span> for API
              endpoints
            </p>
            <p>
              <span className="font-mono text-slate-900">server/models</span> for
              MongoDB schemas
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stackItems.map((item) => {
          const Icon = item.icon

          return (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={item.title}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-100 text-sky-700">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          )
        })}
      </section>
    </div>
  )
}

export default Home
