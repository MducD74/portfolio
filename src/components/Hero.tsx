import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import HLSVideoPlayer from './HLSVideoPlayer'

const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate eyebrow
      tl.from('.blur-in', {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
      })

      // Animate name
      tl.from(
        '.name-reveal',
        {
          opacity: 0,
          y: 50,
          duration: 1.2,
          delay: 0.1,
          ease: 'power3.out',
        },
        0.3
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <HLSVideoPlayer
        src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
        className="absolute inset-0 w-full h-full"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Eyebrow */}
        <motion.p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-body">
          COLLECTION &apos;26
        </motion.p>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Michael Smith
        </h1>

        {/* Role Line */}
        <div className="mb-12 h-8 flex items-center justify-center">
          <p className="text-sm md:text-base text-muted font-body">
            A{' '}
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-display italic text-text-primary inline-block animate-role-fade-in"
            >
              {roles[roleIndex]}
            </motion.span>{' '}
            lives in Chicago.
          </p>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 font-body">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons */}
        <motion.div
          className="blur-in flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            className="rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg font-body font-medium hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            See Works
          </motion.button>

          <motion.button
            className="rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary font-body font-medium hover:scale-105 transition-all hover:border-[#89AACC]"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(137, 170, 204, 0.3)',
            }}
          >
            Reach out... ↗
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xs text-muted uppercase tracking-[0.2em] mb-4 font-body">
            SCROLL
          </p>
          <div className="w-px h-10 bg-stroke relative overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-[#89AACC] to-[#4E85BF] absolute"
              animate={{ y: [-100, 200] }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
