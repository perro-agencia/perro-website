export type Invitation = {
  slug: string
  guestName?: string
  logoUrl?: string
  accentColorA?: string
  accentColorB?: string
}

export const invitations: Invitation[] = [
  {
    slug: "juan-perez",
    guestName: "Juan Pérez",
  },
  {
    slug: "maria-garcia",
    guestName: "María García",
  },
  {
    slug: "demo",
  },
]

export function getInvitation(slug: string): Invitation | undefined {
  return invitations.find((invitation) => invitation.slug === slug)
}
