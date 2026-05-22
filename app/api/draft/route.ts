import { validatePreviewUrl } from "@sanity/preview-url-secret"
import { client } from "@/sanity/lib/client"
import { redirect } from "next/navigation"
import { type NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return new Response("Sanity not configured", { status: 500 })
  }

  const clientWithToken = client.withConfig({ token: process.env.SANITY_API_TOKEN })
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(clientWithToken, req.url)

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 })
  }

  redirect(redirectTo)
}
