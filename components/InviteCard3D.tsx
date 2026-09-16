"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"

type InviteCard3DProps = {
  logoUrl?: string
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

function mirrorTexture(source: THREE.Texture): THREE.CanvasTexture {
  const img = source.image as HTMLCanvasElement
  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.translate(img.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(img, 0, 0)
  }
  const mirrored = new THREE.CanvasTexture(canvas)
  mirrored.colorSpace = THREE.SRGBColorSpace
  mirrored.anisotropy = 8
  return mirrored
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

function buildCardTexture(options: {
  logoUrl?: string
  accentColorA: string
  accentColorB: string
  guestName?: string
}): Promise<THREE.CanvasTexture> {
  const { logoUrl, accentColorA, accentColorB, guestName } = options
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

  const drawLogo = () => {
    if (!logoUrl) return Promise.resolve()
    return loadLogo(logoUrl).then((logo) => {
      const maxW = canvas.width * 0.36
      const maxH = canvas.height * (guestName ? 0.2 : 0.24)
      const ratio = Math.min(maxW / logo.width, maxH / logo.height)
      const w = logo.width * ratio
      const h = logo.height * ratio
      const x = (canvas.width - w) / 2
      const y = guestName ? canvas.height * 0.34 - h / 2 : (canvas.height - h) / 2
      ctx.drawImage(logo, x, y, w, h)
    })
  }

  return drawLogo().then(() => {
    if (guestName) {
      ctx.fillStyle = "rgba(255,255,255,0.92)"
      ctx.font = '600 72px "Helvetica Neue", Helvetica, Arial, sans-serif'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(guestName.toUpperCase(), canvas.width / 2, canvas.height * 0.62)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    return texture
  })
}

type SceneProps = {
  texture: THREE.Texture | null
  scale: number
  target: React.RefObject<{ yaw: number; pitch: number }>
}

function Scene({ texture, scale, target }: SceneProps) {
  const group = useRef<THREE.Group>(null)
  const geometry = useMemo(() => createCardGeometry(), [])
  const back = useMemo(() => createBackGeometry(), [])
  const backTexture = useMemo(() => {
    if (!texture) return null
    return mirrorTexture(texture)
  }, [texture])
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
      backTexture?.dispose()
      capMaterial.dispose()
      sideMaterial.dispose()
    }
  }, [geometry, back, backTexture, capMaterial, sideMaterial])

  useFrame((_, delta) => {
    const currentTarget = target.current
    if (!group.current || !currentTarget) return
    const g = group.current
    const t = currentTarget
    const k = Math.min(1, delta * 6)
    g.rotation.y += (t.yaw - g.rotation.y) * k
    g.rotation.x += (t.pitch - g.rotation.x) * k
  })

  return (
    <group ref={group} scale={scale}>
      <mesh geometry={geometry} material={[capMaterial, sideMaterial]} />
      <mesh geometry={back}>
        <meshStandardMaterial map={backTexture ?? texture} roughness={0.35} metalness={0.15} side={THREE.DoubleSide} />
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
  accentColorA = "#885DE3",
  accentColorB = "#C4F875",
  guestName,
}: InviteCard3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, lastX: 0, lastY: 0 })
  const target = useRef({ yaw: 0.5, pitch: -0.22 })
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    let disposed = false
    let current: THREE.Texture | null = null

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

    return () => {
      disposed = true
      if (current) current.dispose()
    }
  }, [logoUrl, accentColorA, accentColorB, guestName])

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
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 6]} intensity={1.25} />
          <directionalLight position={[-4, -2, 4]} intensity={0.45} />
          <directionalLight position={[-3, 4, -6]} intensity={1.25} />
          <directionalLight position={[4, -2, -6]} intensity={0.45} />
          <directionalLight position={[-3, 2, 2]} intensity={0.3} color={accentColorA} />
          <directionalLight position={[3, -2, 2]} intensity={0.25} color={accentColorB} />
          <directionalLight position={[-3, 2, -2]} intensity={0.3} color={accentColorA} />
          <directionalLight position={[3, -2, -2]} intensity={0.25} color={accentColorB} />
          <Scene texture={texture} scale={scale} target={target} />
        </Canvas>
      </div>
    </div>
  )
}