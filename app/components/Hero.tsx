'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const letterboxTopRef = useRef<HTMLDivElement>(null)
  const letterboxBottomRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [muted, setMuted] = useState(true)

  // ── Three.js particle field ──────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return

    const W = window.innerWidth
    const H = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    canvasRef.current.appendChild(renderer.domElement)

    // Particle geometry
    const COUNT = 600
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const alphas = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      sizes[i] = Math.random() * 2.5 + 0.5
      alphas[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xC9A96E) },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vAlpha = alpha * 0.6;
          vec3 pos = position;
          pos.y += sin(uTime * 0.3 + position.x * 0.5) * 0.08;
          pos.x += cos(uTime * 0.2 + position.z * 0.3) * 0.05;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float strength = 1.0 - (d * 2.0);
          strength = pow(strength, 2.0);
          gl_FragColor = vec4(uColor, strength * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Mouse parallax
    let mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      mat.uniforms.uTime.value = t
      particles.rotation.y = t * 0.008
      camera.position.x += (mouse.x - camera.position.x) * 0.03
      camera.position.y += (mouse.y - camera.position.y) * 0.03
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  // ── GSAP cinematic entrance ───────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 })

      // Letterboxes open
      tl.to(
        [letterboxTopRef.current, letterboxBottomRef.current],
        { height: 0, duration: 1.4, ease: 'power3.inOut' },
        0
      )

      // Nav fades in
      tl.to(navRef.current, { opacity: 1, duration: 1, ease: 'power2.out' }, 0.3)

      // Eyebrow
      tl.to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.9
      )

      // Headline
      tl.to(
        headlineRef.current,
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        1.05
      )

      // Subheadline
      tl.to(
        subRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        1.25
      )

      // CTAs
      tl.to(
        ctasRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        1.4
      )

      // Stats
      tl.to(
        statsRef.current,
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        1.1
      )

      // Scroll cue
      tl.to(
        scrollCueRef.current,
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        1.8
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Three.js canvas */}
      <div ref={canvasRef} className={styles.threeCanvas} aria-hidden="true" />

      {/* Video */}
      <div className={styles.videoWrap}>
       <video
  ref={videoRef}
  className={`${styles.video} ${videoReady ? styles.videoReady : ''}`}
  src="/hero-video.mp4"
  autoPlay
  muted={muted}
  loop
  playsInline
  preload="auto"
  onCanPlay={() => setVideoReady(true)}
/>     
  <div className={styles.videoOverlay} aria-hidden="true" />
      </div>

      {/* Letterbox bars */}
      <div
        ref={letterboxTopRef}
        className={styles.letterboxTop}
        style={{ height: '12%' }}
        aria-hidden="true"
      />
      <div
        ref={letterboxBottomRef}
        className={styles.letterboxBottom}
        style={{ height: '12%' }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Navigation */}
      <nav ref={navRef} className={styles.nav} aria-label="Primary navigation">
        <a href="#" className={styles.navLogo}>
          Om<span className={styles.navLogoAccent}>.</span>Gutty
        </a>
        <ul className={styles.navLinks}>
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Main content */}
      <div ref={contentRef} className={styles.content}>
        <div ref={eyebrowRef} className={styles.eyebrow} aria-hidden="true">
          <span className={styles.eyebrowDot} />
          <span className={styles.eyebrowText}>QA Test Lead · Automation Engineer</span>
        </div>

        <h1 ref={headlineRef} className={styles.headline}>
          Quality
          <span className={styles.headlineAccent}>engineered.</span>
          Systems trusted.
        </h1>

        <p ref={subRef} className={styles.subheadline}>
          13+ years building resilient automation frameworks, AI-driven test strategies,
          and the CI/CD pipelines that ship software with confidence.
        </p>

        <div ref={ctasRef} className={styles.ctas}>
          <a href="#work" className={styles.ctaPrimary}>
            View my work
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Get in touch
          </a>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className={styles.stats} aria-label="Key metrics">
        <div className={styles.stat}>
          <div className={styles.statNumber}>13+</div>
          <div className={styles.statLabel}>Years experience</div>
        </div>
        <div className={styles.statDivider} aria-hidden="true" />
        <div className={styles.stat}>
          <div className={styles.statNumber}>95%</div>
          <div className={styles.statLabel}>Test coverage achieved</div>
        </div>
        <div className={styles.statDivider} aria-hidden="true" />
        <div className={styles.stat}>
          <div className={styles.statNumber}>50+</div>
          <div className={styles.statLabel}>Projects automated</div>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={scrollCueRef} className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollCueText}>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
      <button
  onClick={() => setMuted(prev => !prev)}
  style={{
    position: 'absolute',
    bottom: '3vh',
    right: '6vw',
    zIndex: 20,
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    padding: '10px 18px',
    fontSize: '12px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
  }}
>
  {muted ? '🔇 Unmute' : '🔊 Mute'}
</button>
    </section>
  )
}
