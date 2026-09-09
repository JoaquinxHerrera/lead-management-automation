import { supabase } from "./supabase"

export type Lead = {
  id: string
  name: string
  email: string
  company: string | null
  message: string | null
  source: string
  status:
    | "new"
    | "contacted"
    | "qualified"
    | "won"
    | "lost"
  priority:
    | "low"
    | "medium"
    | "high"
  created_at: string
  updated_at: string
}

/*
 * GET ALL LEADS
 */

export async function getLeads(): Promise<
  Lead[]
> {
  const { data, error } = await supabase
    .from("leads")
    .select(`
      id,
      name,
      email,
      company,
      message,
      source,
      status,
      priority,
      created_at,
      updated_at
    `)
    .order("created_at", {
      ascending: false,
    })

  if (error) {
    throw error
  }

  return (data ?? []) as Lead[]
}

/*
 * GET SINGLE LEAD
 */

export async function getLead(
  id: string
): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .select(`
      id,
      name,
      email,
      company,
      message,
      source,
      status,
      priority,
      created_at,
      updated_at
    `)
    .eq("id", id)
    .single()

  if (error) {
    throw error
  }

  return data as Lead
}

/*
 * UPDATE LEAD
 */

export async function updateLead(
  id: string,
  updates: {
    status?: Lead["status"]
    priority?: Lead["priority"]
  }
): Promise<Lead> {
  const { data, error } = await supabase
    .from("leads")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(`
      id,
      name,
      email,
      company,
      message,
      source,
      status,
      priority,
      created_at,
      updated_at
    `)
    .single()

  if (error) {
    throw error
  }

  return data as Lead
}