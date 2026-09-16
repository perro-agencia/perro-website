import type { Metadata } from "next"
import { InviteScene } from "@/components/invite/InviteScene"
import { getInvitation, invitations } from "@/lib/invitations"

type InvitePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return invitations.map((invitation) => ({ slug: invitation.slug }))
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { slug } = await params
  const invitation = getInvitation(slug)

  return {
    title: invitation?.guestName ? `${invitation.guestName} — Invitación` : "Invitación",
    description: "Una invitación de PERRO Agency.",
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params
  const invitation = getInvitation(slug)

  return (
    <InviteScene
      logoUrl={invitation?.logoUrl}
      accentColorA={invitation?.accentColorA}
      accentColorB={invitation?.accentColorB}
      guestName={invitation?.guestName}
    />
  )
}
