import { useState } from 'react'

const leadStatuses = ['New', 'Contacted', 'Qualified', 'Closed']

function LeadDetails({ isSaving = false, lead, onSave, readOnly = false }) {
  const [status, setStatus] = useState(lead?.status || 'New')
  const [notes, setNotes] = useState(lead?.notes || '')

  if (!lead) {
    return (
      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">Select a lead to view details.</p>
      </aside>
    )
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (onSave) {
      onSave(lead._id, { status, notes })
    }
  }

  const qualificationEntries = Object.entries(lead.qualificationData || {})

  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase text-emerald-700">
          Lead details
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          {lead.name || 'Unnamed lead'}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{lead.message || 'No message yet.'}</p>
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div>
          <dt className="font-medium text-slate-500">Phone</dt>
          <dd className="mt-1 text-slate-950">{lead.phone || '-'}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Email</dt>
          <dd className="mt-1 text-slate-950">{lead.email || '-'}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">Source</dt>
          <dd className="mt-1 text-slate-950">
            {lead.sourceProject || '-'} / {lead.sourceType || '-'}
          </dd>
        </div>
      </dl>

      {qualificationEntries.length > 0 && (
        <div className="mt-5 rounded-md bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-950">Qualification data</p>
          <dl className="mt-3 space-y-2 text-sm">
            {qualificationEntries.map(([key, value]) => (
              <div className="flex justify-between gap-4" key={key}>
                <dt className="text-slate-500">{key}</dt>
                <dd className="text-right text-slate-900">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700">
          Status
          <select
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            disabled={readOnly}
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          >
            {leadStatuses.map((leadStatus) => (
              <option key={leadStatus} value={leadStatus}>
                {leadStatus}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Notes
          <textarea
            className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            disabled={readOnly}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add follow-up notes"
            value={notes}
          />
        </label>

        {!readOnly && (
          <button
            className="inline-flex w-full justify-center rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? 'Saving...' : 'Save lead'}
          </button>
        )}
      </form>
    </aside>
  )
}

export default LeadDetails
