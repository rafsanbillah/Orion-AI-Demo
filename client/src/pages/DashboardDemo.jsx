import { Building2, HeartPulse, HousePlug } from 'lucide-react'
import { useMemo, useState } from 'react'
import LeadDetails from '../components/LeadDetails.jsx'
import LeadTable from '../components/LeadTable.jsx'

const sampleLeads = [
  {
    _id: 'demo-clinic-1',
    industry: 'clinic',
    sourceProject: 'CareBridge Clinic',
    sourcePage: '/clinic',
    sourceType: 'chatbot',
    name: 'Nadia Rahman',
    phone: '+8801711111111',
    email: 'nadia@example.com',
    inquiryType: 'Dental consultation',
    message: 'Needs a Saturday appointment for a dental consultation.',
    qualificationData: {
      serviceNeeded: 'Dental consultation',
      preferredTime: 'Saturday morning',
    },
    status: 'New',
    notes: 'Demo lead only.',
    createdAt: '2026-05-15T09:30:00.000Z',
  },
  {
    _id: 'demo-real-estate-1',
    industry: 'real-estate',
    sourceProject: 'PrimeNest Realty',
    sourcePage: '/real-estate',
    sourceType: 'chatbot',
    name: 'Arif Khan',
    phone: '+8801722222222',
    email: 'arif@example.com',
    inquiryType: 'Buy apartment',
    message: 'Looking for a 3-bedroom apartment near Gulshan.',
    qualificationData: {
      buyOrRent: 'Buy',
      propertyType: 'Apartment',
      preferredArea: 'Gulshan',
      budget: 'BDT 2 crore',
    },
    status: 'Contacted',
    notes: 'Demo lead only.',
    createdAt: '2026-05-14T12:15:00.000Z',
  },
  {
    _id: 'demo-home-services-1',
    industry: 'home-services',
    sourceProject: 'FixFlow Services',
    sourcePage: '/home-services',
    sourceType: 'chatbot',
    name: 'Sadia Islam',
    phone: '+8801733333333',
    email: 'sadia@example.com',
    inquiryType: 'Plumbing repair',
    message: 'Kitchen sink leaking under the cabinet.',
    qualificationData: {
      serviceType: 'Plumbing repair',
      location: 'Dhanmondi',
      urgency: 'Today',
      jobDetails: 'Kitchen sink leaking under the cabinet',
    },
    status: 'Qualified',
    notes: 'Demo lead only.',
    createdAt: '2026-05-13T15:45:00.000Z',
  },
]

const cards = [
  { label: 'Clinic leads', value: '1', icon: HeartPulse },
  { label: 'Real estate leads', value: '1', icon: Building2 },
  { label: 'Home services leads', value: '1', icon: HousePlug },
]

function DashboardDemo() {
  const [selectedLead, setSelectedLead] = useState(sampleLeads[0])
  const sortedLeads = useMemo(
    () =>
      [...sampleLeads].sort(
        (firstLead, secondLead) =>
          new Date(secondLead.createdAt) - new Date(firstLead.createdAt),
      ),
    [],
  )

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase text-emerald-700">
          Demo dashboard
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Sample leads from all three industries.
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          This page uses static demo data only, so visitors can preview the dashboard
          without logging in.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={card.label}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-sky-100 text-sky-700">
                <Icon size={20} aria-hidden="true" />
              </div>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">{card.value}</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <LeadTable
            leads={sortedLeads}
            onSelectLead={setSelectedLead}
            selectedLeadId={selectedLead?._id}
          />
        </div>
        <LeadDetails key={selectedLead?._id} lead={selectedLead} readOnly />
      </section>
    </div>
  )
}

export default DashboardDemo
