import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase text-emerald-700">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-slate-950">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-slate-600">
        This route does not exist yet. Add a page in the pages folder and connect it
        in App.jsx.
      </p>
      <Link
        className="mt-6 inline-flex rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        to="/"
      >
        Back home
      </Link>
    </section>
  )
}

export default NotFound
