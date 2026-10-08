import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import HLSVideoPlayer from './HLSVideoPlayer'

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    const marqueeContent = marquee.querySelector('.marquee-content')
    if (!marqueeContent) return

    gsap.to(marqueeContent, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Background Video */}
      <HLSVideoPlayer
        src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
        className="absolute inset-0 w-full h-full"
        scale="scale-y-[-1]"
      />

      {/* Heavy Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 pt-16 md:pt-20 pb-8 md:pb-12">
        {/* Marquee */}
        <div
          ref={marqueeRef}
          className="overflow-hidden mb-16 md:mb-20 py-8 md:py-12"
        >
          <div className="marquee-content flex whitespace-nowrap">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <span
                  key={i}
                  className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary/20 mx-8"
                >
                  BUILDING THE FUTURE •{' '}
                </span>
              ))}
          </div>
        </div>

        {/* Main CTA */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="mailto:hello@michaelsmith.com"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base md:text-lg font-body font-medium border-2 border-stroke hover:border-[#89AACC] text-text-primary transition-all hover:shadow-lg hover:shadow-[#89AACC]/20"
            whileHover={{ scale: 1.05 }}
          >
            <span>Get in touch</span>
            <span>↗</span>
          </motion.a>
        </motion.div>

        {/* Footer Bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 border-t border-stroke/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'].map((social) => (
                <motion.a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  className="text-xs text-muted hover:text-text-primary transition-colors font-body"
                  whileHover={{ y: -2 }}
                >
                  {social}
                </motion.a>
              ))}
            </motion.div>

            {/* Status */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Pulsing dot */}
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <span className="text-xs text-muted font-body">
                Available for projects
              </span>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center mt-8 pt-8 border-t border-stroke/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-muted/60 font-body">
              © 2024 Michael Smith. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
