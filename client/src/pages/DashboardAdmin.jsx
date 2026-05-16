import { Download, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import LeadDetails from '../components/LeadDetails.jsx'
import LeadTable from '../components/LeadTable.jsx'
import { API_BASE_URL } from '../configs/api.js'

function DashboardAdmin() {
  const [leads, setLeads] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [industryFilter, setIndustryFilter] = useState('all')
  const [statusMessage, setStatusMessage] = useState('Loading leads...')
  const [actionMessage, setActionMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    async function loadLeads() {
      if (!token) {
        setStatusMessage('Please log in to view protected lead data.')
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/leads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('adminToken')
          }

          throw new Error(data.message || 'Could not load leads')
        }

        setLeads(data.leads || [])
        setSelectedLead(data.leads?.[0] || null)
        setStatusMessage('')
      } catch (error) {
        setStatusMessage(error.message)
      }
    }

    loadLeads()
  }, [token])

  const industryOptions = useMemo(
    () => [...new Set(leads.map((lead) => lead.industry).filter(Boolean))],
    [leads],
  )

  const filteredLeads = useMemo(() => {
    if (industryFilter === 'all') {
      return leads
    }

    return leads.filter((lead) => lead.industry === industryFilter)
  }, [industryFilter, leads])

  async function handleExport() {
    setActionMessage('')

    if (!token) {
      setActionMessage('Please log in before exporting leads.')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/leads/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken')
        }

        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Could not export leads')
      }

      const csvBlob = await response.blob()
      const downloadUrl = URL.createObjectURL(csvBlob)
      const downloadLink = document.createElement('a')

      downloadLink.href = downloadUrl
      downloadLink.download = 'leads.csv'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()
      URL.revokeObjectURL(downloadUrl)
      setActionMessage('Export started.')
    } catch (error) {
      setActionMessage(error.message)
    }
  }

  async function handleUpdateLead(leadId, updates) {
    setActionMessage('')
    setIsSaving(true)

    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken')
        }

        throw new Error(data.message || 'Could not update lead')
      }

      setLeads((currentLeads) =>
        currentLeads.map((lead) => (lead._id === leadId ? data.lead : lead)),
      )
      setSelectedLead(data.lead)
      setActionMessage('Lead updated.')
    } catch (error) {
      setActionMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Admin dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">
              Manage real lead requests.
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              This protected page fetches real leads from the Express API and lets
              admins update status, notes, and export CSV data.
            </p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>
        </div>
      </section>

      {!token && (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-900">
            You need to log in before viewing real lead data.
          </p>
          <Link
            className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            to="/login"
          >
            Go to login
          </Link>
        </section>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">
              Lead table
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Latest leads
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="text-sm font-medium text-slate-700">
              Filter by industry
              <select
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 sm:w-56"
                onChange={(event) => {
                  setIndustryFilter(event.target.value)
                  setSelectedLead(null)
                }}
                value={industryFilter}
              >
                <option value="all">All industries</option>
                {industryOptions.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              onClick={handleExport}
              type="button"
            >
              <Download size={16} aria-hidden="true" />
              Export CSV
            </button>
          </div>
        </div>

        {actionMessage && (
          <p className="mt-4 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
            {actionMessage}
          </p>
        )}

        {statusMessage && (
          <p className="mt-4 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">
            {statusMessage}
          </p>
        )}

        {!statusMessage && (
          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_360px]">
            <LeadTable
              leads={filteredLeads}
              onSelectLead={setSelectedLead}
              selectedLeadId={selectedLead?._id}
            />
            <LeadDetails
              isSaving={isSaving}
              key={selectedLead?._id || 'empty'}
              lead={selectedLead}
              onSave={handleUpdateLead}
            />
          </div>
        )}
      </section>
    </div>
  )
}

export default DashboardAdmin
