export type Invitation = {
  slug: string
  guestName?: string
  logoUrl?: string
  backImageUrl?: string
  backName?: string
  backRole?: string
  accentColorA?: string
  accentColorB?: string
}

export const invitations: Invitation[] = [
  {
    slug: "federicogilles",
    backImageUrl: "/team/profile-fede.png",
    backName: "Federico Gilles",
    backRole: "Founder\nProduct Design Director",
  },
  {
    slug: "sebastiankonig",
    backImageUrl: "/team/profile-seba.png",
    backName: "Sebastián Konig",
    backRole: "Ceo - Founder\nMarketing Director",
  },
  {
    slug: "emilianoelias",
    backImageUrl: "/team/profile-emielias.png",
    backName: "Emiliano Mario Elias",
    backRole: "Multimedia Designer",
  },
  {
    slug: "luzsaltalamachia",
    backImageUrl: "/team/profile-luchi.png",
    backName: "Luz Saltalamachia",
    backRole: "Project Manager\n& Copywriter",
  },
  {
    slug: "sebastianlugo",
    backImageUrl: "/team/profile-sebalugo.png",
    backName: "Sebastián Lugo",
    backRole: "Paid Media Lead",
  },
  {
    slug: "luciagallo",
    backImageUrl: "/team/profile-lu.png",
    backName: "Lucia Gallo",
    backRole: "Lead Graphic Designer",
  },
  {
    slug: "sergioruestes",
    backImageUrl: "/team/profile-sergio.png",
    backName: "Sergio Ruestes",
    backRole: "Head of production",
  },
]

export function getInvitation(slug: string): Invitation | undefined {
  return invitations.find((invitation) => invitation.slug === slug)
}
