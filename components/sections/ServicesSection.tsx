import { sanityFetch } from "@/sanity/lib/fetch"
import { servicesQuery } from "@/sanity/lib/queries"
import type { Service } from "@/types/sanity"

export async function ServicesSection() {
  const services = await sanityFetch<Service[]>({
    query: servicesQuery,
    tags: ["service"],
  })

  if (services.length === 0) return null

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-display-md mb-12">Servicios</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="border border-brand-white/10 p-8 rounded-lg">
              <h3 className="text-xl font-display mb-3">{service.title}</h3>
              <p className="text-brand-white/60">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
