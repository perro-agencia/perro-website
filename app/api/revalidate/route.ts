import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 })
    }

    revalidatePath("/", "layout")

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    })
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
