"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { MutableRefObject } from "react"

export type DeviceOrientationStatus = "unsupported" | "idle" | "prompt" | "listening" | "denied"

type OrientationTarget = { yaw: number; pitch: number }

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">
}

type UseDeviceOrientationOptions = {
  targetRef: MutableRefObject<OrientationTarget>
  getPaused?: () => boolean
  enabled?: boolean
  yawFactor?: number
  pitchFactor?: number
  betaCenter?: number
  pitchMin?: number
  pitchMax?: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function useDeviceOrientation({
  targetRef,
  getPaused,
  enabled = true,
  yawFactor = 0.02,
  pitchFactor = 0.02,
  betaCenter = 90,
  pitchMin = -0.75,
  pitchMax = 0.75,
}: UseDeviceOrientationOptions) {
  const supported = useMemo(() => {
    if (typeof window === "undefined") return false
    if (!(typeof DeviceOrientationEvent !== "undefined")) return false
    if (!window.matchMedia?.("(pointer: coarse)").matches) return false
    return true
  }, [])

  const [status, setStatus] = useState<DeviceOrientationStatus>(() =>
    supported ? "idle" : "unsupported",
  )

  const needsUserGesture = useMemo(() => {
    if (!supported) return false
    if (typeof DeviceOrientationEvent === "undefined") return false
    return typeof (DeviceOrientationEvent as DeviceOrientationEventWithPermission).requestPermission === "function"
  }, [supported])

  const requestPermission = useCallback(async () => {
    if (!supported || status === "listening") return

    if (!needsUserGesture) {
      setStatus("listening")
      return
    }

    setStatus("prompt")

    const request = (DeviceOrientationEvent as DeviceOrientationEventWithPermission).requestPermission
    if (!request) {
      setStatus("denied")
      return
    }

    try {
      const result = await request()
      setStatus(result === "granted" ? "listening" : "denied")
    } catch {
      setStatus("denied")
    }
  }, [supported, needsUserGesture, status])

  useEffect(() => {
    if (!enabled || !supported || status !== "listening") return

    const orientation = (event: DeviceOrientationEvent) => {
      if (getPaused?.()) return
      const gamma = event.gamma ?? 0
      const beta = event.beta ?? betaCenter

      targetRef.current.yaw = gamma * yawFactor
      targetRef.current.pitch = clamp(
        (beta - betaCenter) * pitchFactor,
        pitchMin,
        pitchMax,
      )
    }

    window.addEventListener("deviceorientation", orientation)
    return () => window.removeEventListener("deviceorientation", orientation)
  }, [
    enabled,
    supported,
    status,
    targetRef,
    getPaused,
    yawFactor,
    pitchFactor,
    betaCenter,
    pitchMin,
    pitchMax,
  ])

  return { status, needsUserGesture, requestPermission }
}