'use client'

import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Only run on client
    const canvas = canvasRef.current
    if (!canvas) return

    // Dynamic import to avoid SSR issues
    import('three').then((THREE) => {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(window.innerWidth, window.innerHeight)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100)
      camera.position.z = 6

      // Torus Knot - warm orange wireframe
      const tkGeo = new THREE.TorusKnotGeometry(1.9, 0.44, 128, 16)
      const tkMat = new THREE.MeshBasicMaterial({ color: 0xE85D26, wireframe: true, transparent: true, opacity: 0.08 })
      const tk = new THREE.Mesh(tkGeo, tkMat)
      tk.position.set(4.2, 0, -1)
      scene.add(tk)

      // Icosahedron - lighter orange/amber
      const iGeo = new THREE.IcosahedronGeometry(1.3, 1)
      const iMat = new THREE.MeshBasicMaterial({ color: 0xFF6B35, wireframe: true, transparent: true, opacity: 0.05 })
      const ico = new THREE.Mesh(iGeo, iMat)
      ico.position.set(-4.8, 1.8, -2)
      scene.add(ico)

      // Particles - warm palette
      const N = 350
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(N * 3)
      const col = new Float32Array(N * 3)
      const PAL = [
        [0.91, 0.365, 0.15],   // #E85D26 orange
        [1, 0.42, 0.21],       // #FF6B35 amber
        [1, 1, 1],             // white
      ]
      for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 26
        pos[i * 3 + 1] = (Math.random() - 0.5) * 16
        pos[i * 3 + 2] = (Math.random() - 0.5) * 12
        const c = PAL[Math.floor(Math.random() * 3)]
        col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2]
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
      const pMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.4 })
      const pts = new THREE.Points(geo, pMat)
      scene.add(pts)

      // Mouse parallax
      let tRX = 0, tRY = 0
      const onMouseMove = (e: MouseEvent) => {
        tRX = (e.clientY / window.innerHeight - 0.5) * 0.28
        tRY = (e.clientX / window.innerWidth - 0.5) * 0.45
      }
      window.addEventListener('mousemove', onMouseMove)

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t

      let t = 0
      let animId: number
      function tick() {
        animId = requestAnimationFrame(tick)
        t += 0.006
        tk.rotation.x = t * 0.24
        tk.rotation.y = t * 0.38
        tk.position.y = Math.sin(t * 0.55) * 0.6
        ico.rotation.x = -t * 0.32
        ico.rotation.z = t * 0.5
        ico.position.y = 1.8 + Math.cos(t * 0.42) * 0.9
        pts.rotation.y = t * 0.02
        scene.rotation.x = lerp(scene.rotation.x, tRX, 0.04)
        scene.rotation.y = lerp(scene.rotation.y, tRY, 0.04)
        renderer.render(scene, camera)
      }
      tick()

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', onResize)

      // Cleanup
      return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        tkGeo.dispose(); tkMat.dispose()
        iGeo.dispose(); iMat.dispose()
        geo.dispose(); pMat.dispose()
      }
    })
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
    />
  )
}
