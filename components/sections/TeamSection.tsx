import { sanityFetch } from "@/sanity/lib/fetch"
import { teamMembersQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { TeamMember } from "@/types/sanity"
import Image from "next/image"

export async function TeamSection() {
  const members = await sanityFetch<TeamMember[]>({
    query: teamMembersQuery,
    tags: ["teamMember"],
  })

  if (members.length === 0) return null

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <div key={member._id} className="text-center">
          {member.photo && (
            <Image
              src={urlFor(member.photo).width(300).height(300).url()}
              alt={member.name}
              width={300}
              height={300}
              className="rounded-full mb-4 mx-auto"
            />
          )}
          <h3 className="text-xl font-display">{member.name}</h3>
          <p className="text-brand-white/50">{member.role}</p>
        </div>
      ))}
    </div>
  )
}
