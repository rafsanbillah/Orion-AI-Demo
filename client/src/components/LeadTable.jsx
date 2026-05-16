const statusStyles = {
  New: 'bg-sky-100 text-sky-800',
  Contacted: 'bg-amber-100 text-amber-800',
  Qualified: 'bg-emerald-100 text-emerald-800',
  Closed: 'bg-slate-200 text-slate-700',
}

function formatDate(date) {
  if (!date) {
    return '-'
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(date))
}

function LeadTable({ leads, onSelectLead, selectedLeadId }) {
  if (leads.length === 0) {
    return (
      <p className="rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
        No leads match this view.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="border-b border-slate-200 text-slate-500">
          <tr>
            <th className="py-3 pr-4 font-semibold">Name</th>
            <th className="py-3 pr-4 font-semibold">Phone</th>
            <th className="py-3 pr-4 font-semibold">Industry</th>
            <th className="py-3 pr-4 font-semibold">Inquiry</th>
            <th className="py-3 pr-4 font-semibold">Status</th>
            <th className="py-3 pr-4 font-semibold">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => {
            const isSelected = selectedLeadId === lead._id

            return (
              <tr
                className={`cursor-pointer transition hover:bg-slate-50 ${
                  isSelected ? 'bg-emerald-50' : ''
                }`}
                key={lead._id}
                onClick={() => onSelectLead(lead)}
              >
                <td className="py-3 pr-4 font-medium text-slate-950">
                  {lead.name || '-'}
                </td>
                <td className="py-3 pr-4 text-slate-600">{lead.phone || '-'}</td>
                <td className="py-3 pr-4 text-slate-600">{lead.industry || '-'}</td>
                <td className="py-3 pr-4 text-slate-600">
                  {lead.inquiryType || '-'}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
                      statusStyles[lead.status] || statusStyles.New
                    }`}
                  >
                    {lead.status || 'New'}
                  </span>
                </td>
                <td className="py-3 pr-4 text-slate-600">
                  {formatDate(lead.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTable
