"use client"

import dynamic from "next/dynamic"

type InviteSceneProps = {
  logoUrl?: string
  backImageUrl?: string
  backName?: string
  backRole?: string
  accentColorA?: string
  accentColorB?: string
  guestName?: string
}

const InviteCard3DLazy = dynamic(
  () => import("@/components/InviteCard3D").then((m) => m.InviteCard3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-brand-black">
        <div className="h-[min(86vh,560px)] aspect-[512/720] rounded-3xl border border-brand-white/10 animate-pulse" />
      </div>
    ),
  },
)

export function InviteScene(props: InviteSceneProps) {
  return <InviteCard3DLazy {...props} />
}