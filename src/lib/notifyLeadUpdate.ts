import type { Lead } from "./leads"

export async function notifyLeadUpdate(
  lead: Lead
) {
  const response = await fetch(
    "n8n/webhook-test/lead-updated",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        status: lead.status,
        priority: lead.priority,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(
      "Unable to trigger lead automation"
    )
  }
}