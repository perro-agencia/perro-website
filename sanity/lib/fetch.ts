import { client } from "./client"

export async function sanityFetch<QueryResult>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<QueryResult> {
  const isBuild = process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  if (isBuild) {
    return [] as unknown as QueryResult
  }

  return client.fetch<QueryResult>(query, params, {
    next: { tags, revalidate: 60 },
  })
}
