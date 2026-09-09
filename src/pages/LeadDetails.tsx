import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Clock3,
  Mail,
  MessageSquare,
  User,
} from "lucide-react"
import {
  Link,
  useParams,
} from "react-router-dom"

import {
  getLead,
  type Lead,
} from "../lib/leads"

function LeadDetails() {
  const { id } = useParams<{ id: string }>()

  const [lead, setLead] =
    useState<Lead | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  useEffect(() => {
    async function loadLead() {
      if (!id) {
        setError("Lead ID is missing.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError("")

        const data = await getLead(id)

        setLead(data)
      } catch (error) {
        console.error(error)
        setError("Unable to load lead.")
      } finally {
        setLoading(false)
      }
    }

    loadLead()
  }, [id])

  /*
   * LOADING
   */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading lead...
          </p>
        </div>
      </div>
    )
  }

  /*
   * ERROR
   */

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">

        <div className="mx-auto max-w-5xl">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-medium text-red-700">
            {error || "Lead not found."}
          </div>

        </div>

      </div>
    )
  }

  /*
   * BADGE STYLES
   */

  const statusStyles = {
    new: "border-blue-200 bg-blue-50 text-blue-700",
    contacted:
      "border-cyan-200 bg-cyan-50 text-cyan-700",
    qualified:
      "border-violet-200 bg-violet-50 text-violet-700",
    won: "border-emerald-200 bg-emerald-50 text-emerald-700",
    lost: "border-slate-200 bg-slate-100 text-slate-600",
  }

  const priorityStyles = {
    low: "border-slate-200 bg-slate-100 text-slate-600",
    medium:
      "border-amber-200 bg-amber-50 text-amber-700",
    high: "border-red-200 bg-red-50 text-red-700",
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* TOP BAR */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6 lg:px-8">

          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            Back to dashboard
          </Link>

        </div>

      </div>

      {/* CONTENT */}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HERO */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">

              <User size={23} />

            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">
                Lead profile
              </p>

              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                {lead.name}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {lead.company ||
                  "No company provided"}
              </p>

            </div>

          </div>

          {/* BADGES */}

          <div className="flex items-center gap-2">

            <span
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                priorityStyles[
                  lead.priority
                ]
              }`}
            >
              {lead.priority} priority
            </span>

            <span
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                statusStyles[lead.status]
              }`}
            >
              {lead.status}
            </span>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-6 lg:col-span-2">

            {/* MESSAGE */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">

                  <MessageSquare
                    size={17}
                    className="text-blue-600"
                  />

                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-950">
                    Lead message
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Initial inquiry submitted by the lead
                  </p>
                </div>

              </div>

              <div className="p-6">

                {lead.message ? (
                  <p className="whitespace-pre-wrap text-[15px] leading-7 text-slate-700">
                    {lead.message}
                  </p>
                ) : (
                  <p className="text-sm italic text-slate-400">
                    No message was provided by this lead
                  </p>
                )}

              </div>

            </div>

            {/* METADATA */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-sm font-semibold text-slate-950">
                Lead information
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">

                {/* SOURCE */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Source
                  </p>

                  <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
                    {lead.source}
                  </p>

                </div>

                {/* STATUS */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
                    {lead.status}
                  </p>

                </div>

                {/* CREATED */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Created
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900">

                    <CalendarDays
                      size={15}
                      className="text-slate-400"
                    />

                    {new Date(
                      lead.created_at
                    ).toLocaleDateString()}

                  </div>

                </div>

                {/* UPDATED */}

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Last updated
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900">

                    <Clock3
                      size={15}
                      className="text-slate-400"
                    />

                    {new Date(
                      lead.updated_at
                    ).toLocaleDateString()}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-6">

            {/* CONTACT */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-sm font-semibold text-slate-950">
                Contact
              </h2>

              <div className="mt-6 space-y-5">

                {/* EMAIL */}

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">

                    <Mail
                      size={16}
                      className="text-blue-600"
                    />

                  </div>

                  <div className="min-w-0">

                    <p className="text-xs text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                      {lead.email}
                    </p>

                  </div>

                </div>

                {/* COMPANY */}

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100">

                    <Building2
                      size={16}
                      className="text-slate-500"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      Company
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {lead.company || "—"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* PIPELINE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-sm font-semibold text-slate-950">
                Pipeline
              </h2>

              <div className="mt-5 space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    Priority
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                      priorityStyles[
                        lead.priority
                      ]
                    }`}
                  >
                    {lead.priority}
                  </span>

                </div>

                <div className="h-px bg-slate-100" />

                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    Status
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${
                      statusStyles[
                        lead.status
                      ]
                    }`}
                  >
                    {lead.status}
                  </span>

                </div>

                <div className="h-px bg-slate-100" />

                <div className="flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    Source
                  </span>

                  <span className="text-sm font-semibold capitalize text-slate-900">
                    {lead.source}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default LeadDetails