import { useState } from "react"
import {
  ArrowRight,
  Check,
  Code2,
  Workflow,
  Gauge,
  PanelsTopLeft,
} from "lucide-react"
import { submitLead } from "../lib/submitLead"

function LeadForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!name.trim() || !email.trim()) return

    try {
      setSubmitting(true)
      setError("")
      setSuccess(false)

      await submitLead({
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        message: message.trim(),
      })

      setName("")
      setEmail("")
      setCompany("")
      setMessage("")
      setSuccess(true)
    } catch (error) {
      console.error(error)
      setError("Unable to submit your information. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const scrollToContact = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  const services = [
    {
      title: "Web development",
      description:
        "Fast, scalable websites built around real business goals",
      icon: Code2,
    },
    {
      title: "Workflow automation",
      description:
        "Automations that remove repetitive operational work",
      icon: Workflow,
    },
    {
      title: "Internal tools",
      description:
        "Interfaces and systems designed for your team's workflow",
      icon: PanelsTopLeft,
    },
    {
      title: "Performance",
      description:
        "Technical optimization focused on speed and reliability",
      icon: Gauge,
    },
  ]

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#"
            className="font-serif text-2xl tracking-tight"
          >
            Northline
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/50 md:flex">
            <a
              href="#services"
              className="transition hover:text-white"
            >
              Services
            </a>

            <a
              href="#studio"
              className="transition hover:text-white"
            >
              Studio
            </a>

            <button
              type="button"
              onClick={scrollToContact}
              className="transition hover:text-white"
            >
              Contact
            </button>
          </nav>

          <button
            type="button"
            onClick={scrollToContact}
            className="flex items-center gap-2 border border-white/15 px-4 py-2 text-sm transition hover:bg-white hover:text-black"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute left-[-10%] top-[-20%] h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[120px]" />
          <div className="absolute right-[-5%] top-[10%] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-28">
            <div>
              <div className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                <span className="h-px w-8 bg-violet-400" />
                Digital studio
              </div>

              <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                We build digital systems
                <span className="block text-white/40">
                  that actually move work forward
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/50 md:text-lg">
                Websites, automations and internal tools designed to
                reduce friction, improve operations and help teams move
                faster
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="flex items-center gap-2 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="#services"
                  className="flex items-center border border-white/15 px-5 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Explore services
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/35">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-violet-300" />
                  Web systems
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan-300" />
                  Automation
                </span>

                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-violet-300" />
                  Internal tools
                </span>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden border border-white/10 bg-white/[0.03] p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.18),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.12),transparent_35%)]" />

              <div className="relative z-10 flex h-full min-h-[365px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                    System overview
                  </span>

                  <div className="flex items-center gap-2 text-xs text-emerald-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                    Live
                  </div>
                </div>

                <div className="my-10 space-y-5">
                  {[
                    {
                      label: "Inbound leads",
                      value: 86,
                      width: "86%",
                    },
                    {
                      label: "Qualified",
                      value: 64,
                      width: "64%",
                    },
                    {
                      label: "Automated",
                      value: 92,
                      width: "92%",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-white/60">
                          {item.label}
                        </span>

                        <span className="font-mono text-white">
                          {item.value}%
                        </span>
                      </div>

                      <div className="h-2 bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["24", "Automations"],
                    ["3.2x", "Faster ops"],
                    ["99.8%", "Uptime"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="border border-white/10 p-4"
                    >
                      <div className="font-serif text-2xl">
                        {value}
                      </div>

                      <div className="mt-1 text-xs text-white/40">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="border-t border-white/10 py-24"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">
                  Services
                </p>

                <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">
                  Built around how your business actually works
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-white/40 md:justify-self-end">
                We combine development, automation and operational
                thinking to create systems that are useful beyond the
                initial launch
              </p>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon

                return (
                  <div
                    key={service.title}
                    className="group bg-[#080808] p-8 transition hover:bg-white/[0.04]"
                  >
                    <div className="mb-12 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-white/10">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>

                      <ArrowRight className="h-5 w-5 text-white/20 transition group-hover:translate-x-1 group-hover:text-white" />
                    </div>

                    <h3 className="font-serif text-3xl">
                      {service.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/45">
                      {service.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
                How it works
              </p>

              <h2 className="mt-4 font-serif text-4xl md:text-5xl">
                From inquiry to action
              </h2>
            </div>

            <div className="grid md:grid-cols-4">
              {[
                [
                  "01",
                  "Capture",
                  "A lead submits an inquiry through the website",
                ],
                [
                  "02",
                  "Analyze",
                  "AI evaluates the context and assigns priority",
                ],
                [
                  "03",
                  "Route",
                  "Data moves through automated workflows",
                ],
                [
                  "04",
                  "Act",
                  "The right information reaches the team instantly",
                ],
              ].map(([number, title, text], index) => (
                <div
                  key={title}
                  className="relative border-t border-white/10 py-8 md:border-l md:border-t-0 md:px-6"
                >
                  {index < 3 && (
                    <div className="absolute right-0 top-6 hidden h-px w-8 bg-gradient-to-r from-violet-500 to-cyan-400 md:block" />
                  )}

                  <span className="font-mono text-xs text-white/25">
                    {number}
                  </span>

                  <h3 className="mt-8 text-xl font-medium">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="studio"
          className="py-24 md:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">
                Studio
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-[0.95] md:text-6xl">
                Less noise
                <span className="block text-white/30">
                  More useful systems
                </span>
              </h2>
            </div>

            <div className="max-w-lg space-y-6 text-base leading-7 text-white/45">
              <p>
                Good digital work should make operations clearer, not
                more complicated
              </p>

              <p>
                We focus on building systems that connect the customer
                experience with the workflows happening behind the
                scenes
              </p>

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                {[
                  "Clear architecture",
                  "Reliable workflows",
                  "Fast interfaces",
                  "Scalable foundations",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border-t border-white/10 pt-4 text-sm text-white/60"
                  >
                    <Check className="h-4 w-4 text-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-white/10 py-24 md:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
                Contact
              </p>

              <h2 className="mt-5 max-w-md font-serif text-5xl leading-[0.95] md:text-6xl">
                Have something worth building?
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-white/40">
                Tell us what you're working on and where things are
                getting stuck
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="border border-white/10 bg-white/[0.025] p-6 md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-white/35"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    required
                    className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-400/60"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-white/35"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-400/60"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="company"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-white/35"
                >
                  Company
                </label>

                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(event) =>
                    setCompany(event.target.value)
                  }
                  className="w-full border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cyan-400/60"
                  placeholder="Company name"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-white/35"
                >
                  Project
                </label>

                <textarea
                  id="message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  rows={6}
                  className="w-full resize-none border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-cyan-400/60"
                  placeholder="Tell us what you're trying to build..."
                />
              </div>

              {success && (
                <div className="mt-6 border border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-300">
                  Thanks — your inquiry has been received
                </div>
              )}

              {error && (
                <div className="mt-6 border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-white/30">
                  Your request will be reviewed and routed to the
                  appropriate team
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send inquiry"}

                  {!submitting && (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-serif text-lg text-white">
            Northline
          </span>

          <span>
            Digital systems for modern teams
          </span>
        </div>
      </footer>
    </div>
  )
}

export default LeadForm

