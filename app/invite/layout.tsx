import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Invitación",
  robots: {
    index: false,
    follow: false,
  },
}

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 overflow-hidden bg-brand-black">{children}</div>
}
