import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  Search,
  Users,
  UserPlus,
  BadgeCheck,
  Trophy,
} from "lucide-react"

import {
  getLeads,
  updateLead,
  type Lead,
} from "../lib/leads"

import { notifyLeadUpdate } from "../lib/notifyLeadUpdate"

function LeadDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  const [statusFilter, setStatusFilter] =
    useState<
      | "all"
      | "new"
      | "contacted"
      | "qualified"
      | "won"
      | "lost"
    >("all")

  const [priorityFilter, setPriorityFilter] =
    useState<
      "all" | "low" | "medium" | "high"
    >("all")

  const [updatingLeadId, setUpdatingLeadId] =
    useState<string | null>(null)

  /*
   * LOAD LEADS
   */

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true)
        setError("")

        const data = await getLeads()

        setLeads(data)
      } catch (error) {
        console.error(error)

        setError(
          "Unable to load leads. Please try again."
        )
      } finally {
        setLoading(false)
      }
    }

    loadLeads()
  }, [])

  /*
   * SEARCH + FILTER
   */

  const filteredLeads = useMemo(() => {
    const term = search.toLowerCase().trim()

    return leads.filter((lead) => {
      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(term) ||
        lead.email
          .toLowerCase()
          .includes(term) ||
        lead.company
          ?.toLowerCase()
          .includes(term)

      const matchesStatus =
        statusFilter === "all" ||
        lead.status === statusFilter

      const matchesPriority =
        priorityFilter === "all" ||
        lead.priority === priorityFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      )
    })
  }, [
    leads,
    search,
    statusFilter,
    priorityFilter,
  ])

  /*
   * UPDATE STATUS
   */

  const handleStatusChange = async (
    lead: Lead,
    status: Lead["status"]
  ) => {
    try {
      setUpdatingLeadId(lead.id)
      setError("")

      const updatedLead = await updateLead(
        lead.id,
        {
          status,
        }
      )

      setLeads((current) =>
        current.map((item) =>
          item.id === updatedLead.id
            ? updatedLead
            : item
        )
      )

      /*
       * TRIGGER N8N WHEN QUALIFIED
       */

      if (
        updatedLead.status === "qualified"
      ) {
        try {
          await notifyLeadUpdate(
            updatedLead
          )
        } catch (automationError) {
          console.error(
            "Unable to trigger qualified lead automation:",
            automationError
          )
        }
      }
    } catch (error) {
      console.error(error)

      setError(
        "Unable to update lead status."
      )
    } finally {
      setUpdatingLeadId(null)
    }
  }

  /*
   * UPDATE PRIORITY
   */

  const handlePriorityChange = async (
    lead: Lead,
    priority: Lead["priority"]
  ) => {
    try {
      setUpdatingLeadId(lead.id)
      setError("")

      const updatedLead = await updateLead(
        lead.id,
        {
          priority,
        }
      )

      setLeads((current) =>
        current.map((item) =>
          item.id === updatedLead.id
            ? updatedLead
            : item
        )
      )

      /*
       * TRIGGER N8N WHEN HIGH PRIORITY
       */

      if (
        updatedLead.priority === "high"
      ) {
        try {
          await notifyLeadUpdate(
            updatedLead
          )
        } catch (automationError) {
          console.error(
            "Unable to trigger high priority automation:",
            automationError
          )
        }
      }
    } catch (error) {
      console.error(error)

      setError(
        "Unable to update lead priority."
      )
    } finally {
      setUpdatingLeadId(null)
    }
  }

  /*
   * STATS
   */

  const totalLeads = leads.length

  const newLeads = leads.filter(
    (lead) => lead.status === "new"
  ).length

  const qualifiedLeads = leads.filter(
    (lead) =>
      lead.status === "qualified"
  ).length

  const wonLeads = leads.filter(
    (lead) => lead.status === "won"
  ).length

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
            Lead management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Leads
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor and manage incoming
            leads
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* STATS */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Total Leads
                </p>

                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  {loading
                    ? "..."
                    : totalLeads}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <Users size={19} />
              </div>

            </div>
          </div>

          {/* NEW */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  New
                </p>

                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  {loading
                    ? "..."
                    : newLeads}
                </p>
              </div>

              <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                <UserPlus size={19} />
              </div>

            </div>
          </div>

          {/* QUALIFIED */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Qualified
                </p>

                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  {loading
                    ? "..."
                    : qualifiedLeads}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <BadgeCheck size={19} />
              </div>

            </div>
          </div>

          {/* WON */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Won
                </p>

                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  {loading
                    ? "..."
                    : wonLeads}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <Trophy size={19} />
              </div>

            </div>
          </div>

        </div>

        {/* LEADS TABLE */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TOOLBAR */}

          <div className="border-b border-slate-200 px-5 py-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* SEARCH */}

              <div className="relative w-full lg:max-w-md">

                <Search
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search leads..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

              </div>

              {/* FILTERS */}

              <div className="flex flex-col gap-3 sm:flex-row">

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as
                        | "all"
                        | "new"
                        | "contacted"
                        | "qualified"
                        | "won"
                        | "lost"
                    )
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="all">
                    All statuses
                  </option>

                  <option value="new">
                    New
                  </option>

                  <option value="contacted">
                    Contacted
                  </option>

                  <option value="qualified">
                    Qualified
                  </option>

                  <option value="won">
                    Won
                  </option>

                  <option value="lost">
                    Lost
                  </option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(event) =>
                    setPriorityFilter(
                      event.target.value as
                        | "all"
                        | "low"
                        | "medium"
                        | "high"
                    )
                  }
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="all">
                    All priorities
                  </option>

                  <option value="low">
                    Low
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="high">
                    High
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              Loading leads...
            </div>
          )}

          {/* TABLE */}

          {!loading && (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px] text-left">

                <thead className="border-b border-slate-200 bg-slate-50/70">

                  <tr>

                    <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Lead
                    </th>

                    <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Company
                    </th>

                    <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Source
                    </th>

                    <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Priority
                    </th>

                    <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Status
                    </th>

                    <th className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Created
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredLeads.map(
                    (lead) => (
                      <tr
                        key={lead.id}
                        className="transition-colors hover:bg-slate-50/70"
                      >

                        {/* LEAD */}

                        <td className="px-6 py-4">

                          <Link
                            to={`/leads/${lead.id}`}
                            className="block"
                          >
                            <p className="text-sm font-semibold text-slate-950 transition-colors hover:text-blue-700">
                              {lead.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {lead.email}
                            </p>
                          </Link>

                        </td>

                        {/* COMPANY */}

                        <td className="px-6 py-4 text-sm text-slate-700">
                          {lead.company ||
                            "—"}
                        </td>

                        {/* SOURCE */}

                        <td className="px-6 py-4 text-sm capitalize text-slate-700">
                          {lead.source}
                        </td>

                        {/* PRIORITY */}

                        <td className="px-6 py-4">

                          <select
                            value={
                              lead.priority
                            }
                            disabled={
                              updatingLeadId ===
                              lead.id
                            }
                            onChange={(event) =>
                              handlePriorityChange(
                                lead,
                                event.target
                                  .value as Lead["priority"]
                              )
                            }
                            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold capitalize outline-none ${
                              lead.priority ===
                              "high"
                                ? "border-red-200 bg-red-50 text-red-700"
                                : lead.priority ===
                                  "medium"
                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                : "border-slate-200 bg-slate-100 text-slate-600"
                            }`}
                          >

                            <option value="low">
                              Low
                            </option>

                            <option value="medium">
                              Medium
                            </option>

                            <option value="high">
                              High
                            </option>

                          </select>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">

                          <select
                            value={
                              lead.status
                            }
                            disabled={
                              updatingLeadId ===
                              lead.id
                            }
                            onChange={(event) =>
                              handleStatusChange(
                                lead,
                                event.target
                                  .value as Lead["status"]
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold capitalize text-slate-700 outline-none focus:border-blue-300"
                          >

                            <option value="new">
                              New
                            </option>

                            <option value="contacted">
                              Contacted
                            </option>

                            <option value="qualified">
                              Qualified
                            </option>

                            <option value="won">
                              Won
                            </option>

                            <option value="lost">
                              Lost
                            </option>

                          </select>

                        </td>

                        {/* CREATED */}

                        <td className="px-6 py-4 text-xs text-slate-500">

                          {new Date(
                            lead.created_at
                          ).toLocaleDateString()}

                        </td>

                      </tr>
                    )
                  )}

                  {/* EMPTY STATE */}

                  {filteredLeads.length ===
                    0 && (
                    <tr>

                      <td
                        colSpan={6}
                        className="px-6 py-14 text-center text-sm text-slate-500"
                      >
                        No leads found
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default LeadDashboard