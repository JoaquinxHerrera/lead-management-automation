export type LeadFormData = {
  name: string
  email: string
  company: string
  message: string
}

export async function submitLead(
  lead: LeadFormData
) {
  const response = await fetch(
    "n8n/webhook-test/new-lead",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    }
  )

  if (!response.ok) {
    throw new Error(
      "Unable to submit lead"
    )
  }

  return response
}