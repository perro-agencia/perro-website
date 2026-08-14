import type { MetadataRoute } from "next"

const aiBots = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "Meta-ExternalAgent",
]

const rules: MetadataRoute.Robots["rules"] = [
  { userAgent: "*", allow: "/" },
  ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules,
    sitemap: "https://www.perroagency.com/sitemap.xml",
  }
}
