"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation"

type InviteCard3DProps = {
  logoUrl?: string
  backImageUrl?: string
  backName?: string
  backRole?: string
  accentColorA?: string
  accentColorB?: string
  guestName?: string
}

const CARD_W = 1600
const CARD_H = 2250
const CARD_RADIUS = 80
const CARD_DEPTH = 1
const CARD_BEVEL_THICKNESS = 10
const CARD_BEVEL_SIZE = 5
const CARD_FRONT_Z = CARD_DEPTH / 2 + CARD_BEVEL_THICKNESS
const CAM_Z = 5.4
const CAM_FOV = 35

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function createRoundedShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape()
  shape.moveTo(radius, 0)
  shape.lineTo(width - radius, 0)
  shape.quadraticCurveTo(width, 0, width, radius)
  shape.lineTo(width, height - radius)
  shape.quadraticCurveTo(width, height, width - radius, height)
  shape.lineTo(radius, height)
  shape.quadraticCurveTo(0, height, 0, height - radius)
  shape.lineTo(0, radius)
  shape.quadraticCurveTo(0, 0, radius, 0)
  return shape
}

function createCardGeometry() {
  const geometry = new THREE.ExtrudeGeometry(createRoundedShape(CARD_W, CARD_H, CARD_RADIUS), {
    depth: CARD_DEPTH,
    bevelEnabled: true,
    bevelThickness: CARD_BEVEL_THICKNESS,
    bevelSize: CARD_BEVEL_SIZE,
    bevelSegments: 6,
    curveSegments: 32,
  })

  geometry.translate(-CARD_W / 2, -CARD_H / 2, -CARD_DEPTH / 2)
  const caps = geometry.groups[0]
  if (caps) {
    const uv = geometry.attributes.uv
    for (let i = caps.start; i < caps.start + caps.count; i++) {
      uv.setXY(i, uv.getX(i) / CARD_W, uv.getY(i) / CARD_H)
    }
    uv.needsUpdate = true
  }
  return geometry
}

function createInsetPlaneGeometry(z: number) {
  const innerW = CARD_W - CARD_BEVEL_SIZE * 2
  const innerH = CARD_H - CARD_BEVEL_SIZE * 2
  const innerR = CARD_RADIUS - CARD_BEVEL_SIZE
  const geometry = new THREE.ShapeGeometry(createRoundedShape(innerW, innerH, innerR), 32)
  const uv = geometry.attributes.uv
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, uv.getX(i) / innerW, uv.getY(i) / innerH)
  }
  uv.needsUpdate = true
  geometry.translate(-innerW / 2, -innerH / 2, z)
  return geometry
}

function createBackGeometry() {
  return createInsetPlaneGeometry(-(CARD_FRONT_Z + 0.6))
}

function loadLogo(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`No se pudo cargar el logo: ${src}`))
    image.src = src
  })
}

const BRAND_TEXT = "camp"
const LOGO_HEIGHT = 160
const TEXT_FONT_SIZE = 200
const LOCKUP_GAP = 45
const LOCKUP_TEXT_GAP = 40
const LOCKUP_LOGO_Y_OFFSET = 25
const LOCKUP_STAR_SIZE = 140
const LOCKUP_STAR_THICKNESS = 15
const LOCKUP_STAR_Y_OFFSET = 15
const LOCKUP_MAX_W = 0.72

const FRONT_CAPTION_TEXT = "{ edición 2026 }"
const FRONT_CAPTION_SIZE = 50
const FRONT_CAPTION_Y = 0.6

type LightConfig = {
  ambient: number
  keyFront: number
  fillFront: number
  keyBack: number
  fillBack: number
  accentA: number
  accentB: number
}

const LIGHT_DEFAULTS: LightConfig = {
  ambient: 2,
  keyFront: 0,
  fillFront: 0,
  keyBack: 0,
  fillBack: 0,
  accentA: 2,
  accentB: 2,
}

function createCardCanvas(accentColorA: string, accentColorB: string): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 1440
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D no disponible")

  const base = ctx.createLinearGradient(0, 0, 0, canvas.height)
  base.addColorStop(0, "#121216")
  base.addColorStop(0.5, "#0a0a0d")
  base.addColorStop(1, "#040405")
  ctx.fillStyle = base
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const tintA = ctx.createRadialGradient(220, 220, 0, 220, 220, 720)
  tintA.addColorStop(0, accentColorA)
  tintA.addColorStop(1, "rgba(0,0,0,0)")
  ctx.globalAlpha = 0.08
  ctx.fillStyle = tintA
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const tintB = ctx.createRadialGradient(820, 1240, 0, 820, 1240, 720)
  tintB.addColorStop(0, accentColorB)
  tintB.addColorStop(1, "rgba(0,0,0,0)")
  ctx.globalAlpha = 0.08
  ctx.fillStyle = tintB
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalAlpha = 1

  return canvas
}

function canvasToTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  thickness: number,
  color: string,
) {
  const len = size - thickness
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = thickness
  ctx.lineCap = "round"
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 4
    ctx.beginPath()
    ctx.moveTo(cx - Math.cos(angle) * len * 0.5, cy - Math.sin(angle) * len * 0.5)
    ctx.lineTo(cx + Math.cos(angle) * len * 0.5, cy + Math.sin(angle) * len * 0.5)
    ctx.stroke()
  }
  ctx.restore()
}

function buildCardTexture(options: {
  logoUrl?: string
  accentColorA: string
  accentColorB: string
  guestName?: string
}): Promise<THREE.CanvasTexture> {
  const { logoUrl, accentColorA, accentColorB, guestName } = options
  const canvas = createCardCanvas(accentColorA, accentColorB)
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D no disponible")

  const yCenter = guestName ? canvas.height * 0.34 : canvas.height / 2

  const drawLockup = () => {
    if (!logoUrl) return Promise.resolve()
    return loadLogo(logoUrl).then((logo) => {
      const maxW = canvas.width * LOCKUP_MAX_W
      const text = BRAND_TEXT
      const fontFor = (size: number, italic = false) =>
        `${italic ? "italic " : ""}400 ${Math.round(size)}px "Helvetica Neue", Helvetica, Arial, sans-serif`

      const runs = () => {
        const result: { text: string; italic: boolean }[] = []
        for (const char of text) {
          const italic = char === "a"
          if (result.length > 0 && result[result.length - 1].italic === italic) {
            result[result.length - 1].text += char
          } else {
            result.push({ text: char, italic })
          }
        }
        return result
      }

      const measureText = (fontSize: number) =>
        runs().reduce((sum, run) => {
          ctx.font = fontFor(fontSize, run.italic)
          return sum + ctx.measureText(run.text).width
        }, 0)

      let logoH = LOGO_HEIGHT
      let fontSize = TEXT_FONT_SIZE
      let gap = LOCKUP_GAP
      let textGap = LOCKUP_TEXT_GAP
      let starW = LOCKUP_STAR_SIZE
      let logoW = logoH * (logo.width / logo.height)
      let textW = measureText(fontSize)
      let total = logoW + gap + starW + textGap + textW

      if (total > maxW) {
        const fit = maxW / total
        logoH *= fit
        fontSize *= fit
        gap *= fit
        textGap *= fit
        starW *= fit
        logoW = logoH * (logo.width / logo.height)
        textW = measureText(fontSize)
      }

      const starThickness = starW * (LOCKUP_STAR_THICKNESS / LOCKUP_STAR_SIZE)
      const startX = (canvas.width - (logoW + gap + starW + textGap + textW)) / 2
      const logoY = yCenter - logoH / 2 + LOCKUP_LOGO_Y_OFFSET
      ctx.drawImage(logo, startX, logoY, logoW, logoH)
      ctx.fillStyle = "rgba(255,255,255,0.92)"
      ctx.textAlign = "left"
      ctx.textBaseline = "alphabetic"
      const baselineY = yCenter + logoH / 2
      const starCx = startX + logoW + gap + starW / 2
      const textX = startX + logoW + gap + starW + textGap
      drawStar(ctx, starCx, yCenter + LOCKUP_STAR_Y_OFFSET, starW, starThickness, "rgba(255,255,255,0.92)")
      let x = textX
      for (const run of runs()) {
        ctx.font = fontFor(fontSize, run.italic)
        ctx.fillText(run.text, x, baselineY)
        x += ctx.measureText(run.text).width
      }
    })
  }

  return drawLockup().then(() => {
    if (guestName) {
      ctx.fillStyle = "rgba(255,255,255,0.92)"
      ctx.font = '600 72px "Helvetica Neue", Helvetica, Arial, sans-serif'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(guestName.toUpperCase(), canvas.width / 2, canvas.height * 0.62)
    }

    ctx.fillStyle = "rgba(255,255,255,0.7)"
    ctx.font = `300 ${FRONT_CAPTION_SIZE}px "Helvetica Neue", Helvetica, Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(FRONT_CAPTION_TEXT, canvas.width / 2, canvas.height * FRONT_CAPTION_Y)

    return canvasToTexture(canvas)
  })
}

function loadImage(src: string, attempts = 3): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const tryLoad = (remaining: number) => {
      const image = new Image()
      image.crossOrigin = "anonymous"
      image.onload = () => resolve(image)
      image.onerror = () => {
        if (remaining > 1) {
          tryLoad(remaining - 1)
        } else {
          reject(new Error(`No se pudo cargar la imagen: ${src}`))
        }
      }
      image.src = src
    }
    tryLoad(attempts)
  })
}

type BackTextureOptions = {
  accentColorA: string
  accentColorB: string
  url?: string
  scale?: number
  offsetX?: number
  offsetY?: number
  captionName?: string
  captionRole?: string
}

type BackImageOptions = BackTextureOptions & { url: string }

const BACK_IMAGE_SCALE = 0.58
const BACK_IMAGE_OFFSET_X = -0.1
const BACK_IMAGE_OFFSET_Y = -0.6

const BACK_CAPTION_BOTTOM_MARGIN = 250
const BACK_CAPTION_GAP = 16
const BACK_CAPTION_NAME_SIZE = 70
const BACK_CAPTION_ROLE_SIZE = 50

function drawBackCaption(
  ctx: CanvasRenderingContext2D | null,
  canvasWidth: number,
  canvasHeight: number,
  captionName?: string,
  captionRole?: string,
) {
  if (!ctx || (!captionName && !captionRole)) return

  const font = '"Helvetica Neue", Helvetica, Arial, sans-serif'
  ctx.save()
  ctx.translate(canvasWidth, 0)
  ctx.scale(-1, 1)
  ctx.textAlign = "center"
  ctx.textBaseline = "alphabetic"

  const roleLines = captionRole?.split("\n").filter(Boolean) ?? []

  let y = canvasHeight - BACK_CAPTION_BOTTOM_MARGIN

  if (roleLines.length > 0) {
    for (let i = roleLines.length - 1; i >= 0; i--) {
      ctx.font = `100 ${BACK_CAPTION_ROLE_SIZE}px ${font}`
      ctx.fillStyle = "rgba(255,255,255,0.78)"
      ctx.fillText(roleLines[i], canvasWidth / 2, y)
      y -= BACK_CAPTION_ROLE_SIZE + BACK_CAPTION_GAP
    }
  }

  if (captionName) {
    ctx.font = `500 ${BACK_CAPTION_NAME_SIZE}px ${font}`
    ctx.fillStyle = "rgba(255,255,255,0.95)"
    ctx.fillText(captionName, canvasWidth / 2, y)
  }

  ctx.restore()
}

function buildBackTextureWithImage({
  accentColorA,
  accentColorB,
  url,
  scale = BACK_IMAGE_SCALE,
  offsetX = BACK_IMAGE_OFFSET_X,
  offsetY = BACK_IMAGE_OFFSET_Y,
  captionName,
  captionRole,
}: BackImageOptions): Promise<THREE.CanvasTexture> {
  const canvas = createCardCanvas(accentColorA, accentColorB)
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Canvas 2D no disponible")

  return loadImage(url).then((img) => {
    const cw = canvas.width
    const ch = canvas.height

    const imgRatio = img.width / img.height
    const cwRatio = cw / ch

    let drawW = cw
    let drawH = ch

    if (imgRatio > cwRatio) {
      drawH = ch
      drawW = ch * imgRatio
    } else {
      drawW = cw
      drawH = cw / imgRatio
    }

    drawW *= scale
    drawH *= scale

    const dx = (cw - drawW) / 2 + (cw - drawW) * offsetX * 0.5
    const dy = (ch - drawH) / 2 + (ch - drawH) * offsetY * 0.5

    ctx.globalCompositeOperation = "source-over"
    ctx.save()
    ctx.translate(cw, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(img, cw - dx - drawW, dy, drawW, drawH)
    ctx.restore()

    const overlay = ctx.createLinearGradient(0, 0, 0, ch)
    overlay.addColorStop(0, "rgba(0,0,0,0)")
    overlay.addColorStop(0.8, "rgba(0,0,0,0.15)")
    overlay.addColorStop(1, "rgba(0,0,0,0.4)")
    ctx.fillStyle = overlay
    ctx.fillRect(0, 0, cw, ch)

    ctx.globalCompositeOperation = "multiply"
    ctx.globalAlpha = 0.05
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, cw, ch)
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = "source-over"

    drawBackCaption(ctx, cw, ch, captionName, captionRole)

    return canvasToTexture(canvas)
  })
}

function buildBackTexture(options: BackTextureOptions): Promise<THREE.CanvasTexture> | THREE.CanvasTexture {
  if (options.url) {
    return buildBackTextureWithImage(options as BackImageOptions)
  }
  const canvas = createCardCanvas(options.accentColorA, options.accentColorB)
  drawBackCaption(
    canvas.getContext("2d"),
    canvas.width,
    canvas.height,
    options.captionName,
    options.captionRole,
  )
  return canvasToTexture(canvas)
}

type SceneProps = {
  texture: THREE.Texture | null
  backTexture: THREE.Texture | null
  scale: number
  target: React.RefObject<{ yaw: number; pitch: number }>
  lights: LightConfig
}

function Scene({ texture, backTexture, scale, target, lights }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const geometry = useMemo(() => createCardGeometry(), [])
  const back = useMemo(() => createBackGeometry(), [])
  const capMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: texture, roughness: 0.35, metalness: 0.15 }),
    [texture],
  )
  const sideMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0a0a0d", roughness: 0.4, metalness: 0.2 }),
    [],
  )

  useEffect(() => {
    return () => {
      geometry.dispose()
      back.dispose()
      capMaterial.dispose()
      sideMaterial.dispose()
    }
  }, [geometry, back, capMaterial, sideMaterial])

  useFrame((_, delta) => {
    const g = group.current
    const t = target.current
    if (!g || !t) return
    const k = Math.min(1, delta * 6)
    g.rotation.y += (t.yaw - g.rotation.y) * k
    g.rotation.x += (t.pitch - g.rotation.x) * k
  })

  return (
    <group ref={group} scale={scale}>
      <mesh geometry={geometry} material={[capMaterial, sideMaterial]} />
      <mesh geometry={back}>
        {backTexture ? (
          <meshStandardMaterial
            key={backTexture.uuid}
            map={backTexture}
            roughness={0.35}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        ) : null}
      </mesh>
    </group>
  )
}

function computeScale(aspect: number) {
  const halfFov = (CAM_FOV / 2) * (Math.PI / 180)
  const planeHeight = 2 * Math.tan(halfFov) * CAM_Z
  const planeWidth = planeHeight * aspect
  return Math.min((planeHeight * 0.78) / CARD_H, (planeWidth * 0.86) / CARD_W)
}

export function InviteCard3D({
  logoUrl = "/brand/isologotipo-white.svg",
  backImageUrl,
  backName,
  backRole,
  accentColorA = "#885DE3",
  accentColorB = "#C4F875",
  guestName,
}: InviteCard3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, lastX: 0, lastY: 0 })
  const target = useRef({ yaw: 0.5, pitch: -0.22 })
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [backTexture, setBackTexture] = useState<THREE.Texture | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [lights] = useState<LightConfig>(LIGHT_DEFAULTS)
  const [gyroEnabled, setGyroEnabled] = useState(true)

  const { status: orientationStatus, requestPermission: requestOrientationPermission } =
    useDeviceOrientation({
      targetRef: target,
      getPaused: () => drag.current.active,
      enabled: gyroEnabled,
    })

  useEffect(() => {
    let disposed = false
    let current: THREE.Texture | null = null
    let currentBack: THREE.Texture | null = null

    buildCardTexture({ logoUrl, accentColorA, accentColorB, guestName })
      .then((t) => {
        if (disposed) {
          t.dispose()
          return
        }
        current = t
        setTexture(t)
      })
      .catch(() => {
        if (!disposed) setTexture(null)
      })

    Promise.resolve(
      buildBackTexture({
        accentColorA,
        accentColorB,
        url: backImageUrl,
        captionName: backName,
        captionRole: backRole,
      }),
    )
      .then((t) => {
        if (disposed) {
          t.dispose()
          return
        }
        currentBack = t
        setBackTexture(t)
      })
      .catch(() => {
        if (disposed) return
        currentBack = canvasToTexture(createCardCanvas(accentColorA, accentColorB))
        setBackTexture(currentBack)
      })

    return () => {
      disposed = true
      if (current) current.dispose()
      if (currentBack) currentBack.dispose()
    }
  }, [logoUrl, backImageUrl, backName, backRole, accentColorA, accentColorB, guestName])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect
      setSize({ width: rect.width, height: rect.height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const aspect = size.width > 0 && size.height > 0 ? size.width / size.height : 16 / 9
  const scale = computeScale(aspect)

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = { active: true, lastX: event.clientX, lastY: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
    if (orientationStatus === "idle") requestOrientationPermission()
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const dx = event.clientX - drag.current.lastX
    const dy = event.clientY - drag.current.lastY
    drag.current.lastX = event.clientX
    drag.current.lastY = event.clientY
    target.current.yaw += dx * 0.006
    target.current.pitch = clamp(target.current.pitch + dy * 0.006, -0.75, 0.75)
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.active = false
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div ref={wrapRef} className="relative h-full w-full overflow-hidden bg-brand-black">
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "-15%",
          left: "-15%",
          width: "70vmax",
          height: "70vmax",
          backgroundColor: accentColorA,
          filter: "blur(120px)",
          opacity: 0.15,
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          bottom: "-15%",
          right: "-15%",
          width: "70vmax",
          height: "70vmax",
          backgroundColor: accentColorB,
          filter: "blur(120px)",
          opacity: 0.15,
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0 touch-none cursor-grab select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Canvas
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV, near: 0.1, far: 100 }}
          onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
        >
          <ambientLight intensity={lights.ambient} />
          <directionalLight position={[3, 4, 6]} intensity={lights.keyFront} />
          <directionalLight position={[-4, -2, 4]} intensity={lights.fillFront} />
          <directionalLight position={[-3, 4, -6]} intensity={lights.keyBack} />
          <directionalLight position={[4, -2, -6]} intensity={lights.fillBack} />
          <directionalLight position={[-3, 2, 2]} intensity={lights.accentA} color={accentColorA} />
          <directionalLight position={[3, -2, 2]} intensity={lights.accentB} color={accentColorB} />
          <directionalLight position={[-3, 2, -2]} intensity={lights.accentA} color={accentColorA} />
          <directionalLight position={[3, -2, -2]} intensity={lights.accentB} color={accentColorB} />
          <Scene texture={texture} backTexture={backTexture} scale={scale} target={target} lights={lights} />
        </Canvas>
      </div>

      {orientationStatus !== "unsupported" &&
        (orientationStatus === "listening" ? (
          gyroEnabled ? (
            <button
              type="button"
              onClick={() => setGyroEnabled(false)}
              className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border border-brand-accent-02/40 bg-brand-black/50 px-6 py-3 font-display text-xs uppercase tracking-wide text-brand-accent-02/80 backdrop-blur-md transition-colors hover:border-brand-accent-02/70 hover:text-brand-accent-02"
            >
              Desactivar giro
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setGyroEnabled(true)}
              className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border border-brand-white/20 bg-brand-black/50 px-6 py-3 font-display text-xs uppercase tracking-wide text-brand-white/80 backdrop-blur-md transition-colors hover:border-brand-white/40 hover:text-brand-white"
            >
              Activar giro
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={requestOrientationPermission}
            disabled={orientationStatus === "prompt"}
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border border-brand-white/20 bg-brand-black/50 px-6 py-3 font-display text-xs uppercase tracking-wide text-brand-white/80 backdrop-blur-md transition-colors hover:border-brand-white/40 hover:text-brand-white disabled:opacity-50"
          >
            {orientationStatus === "prompt"
              ? "Activando…"
              : orientationStatus === "denied"
                ? "Giro no permitido"
                : "Activar giro"}
          </button>
        ))}
    </div>
  )
}