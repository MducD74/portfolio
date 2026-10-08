import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const explorations = [
  { id: 1, title: 'Motion Study 1' },
  { id: 2, title: 'Motion Study 2' },
  { id: 3, title: 'Motion Study 3' },
  { id: 4, title: 'Motion Study 4' },
  { id: 5, title: 'Motion Study 5' },
  { id: 6, title: 'Motion Study 6' },
]

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Pin the content
      ScrollTrigger.create({
        trigger: contentRef.current,
        pin: contentRef.current,
        pinSpacing: false,
        start: 'top center',
        end: 'bottom center',
      })

      // Parallax effect on cards
      const cards = contentRef.current?.querySelectorAll('.parallax-card')
      cards?.forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -100 : 100,
          rotation: index % 2 === 0 ? -5 : 5,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            markers: false,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-[300vh] bg-bg relative"
    >
      {/* Pinned Content */}
      <div
        ref={contentRef}
        className="h-screen flex flex-col items-center justify-center px-4"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6 font-body">
            Explorations
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic mb-6">
            Visual <span className="text-text-primary">playground</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-md mx-auto font-body">
            A collection of experimental designs and motion explorations.
          </p>
        </motion.div>

        {/* Grid of Explorations */}
        <div className="grid grid-cols-2 gap-12 md:gap-20 max-w-[1400px]">
          {/* Left Column */}
          <div className="space-y-20">
            {explorations.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                className="parallax-card aspect-square max-w-[320px] rounded-2xl overflow-hidden bg-surface border border-stroke hover:border-[#89AACC] cursor-pointer group"
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="w-full h-full bg-gradient-to-br from-stroke/20 to-stroke/5 flex items-center justify-center relative overflow-hidden">
                  {/* Halftone overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                      backgroundSize: '4px 4px',
                    }}
                  />

                  <div className="relative text-center">
                    <p className="text-sm text-muted font-body">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column (offset) */}
          <div className="space-y-20 pt-24">
            {explorations.slice(3, 6).map((item, index) => (
              <motion.div
                key={item.id}
                className="parallax-card aspect-square max-w-[320px] rounded-2xl overflow-hidden bg-surface border border-stroke hover:border-[#89AACC] cursor-pointer group"
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="w-full h-full bg-gradient-to-br from-stroke/20 to-stroke/5 flex items-center justify-center relative overflow-hidden">
                  {/* Halftone overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                      backgroundSize: '4px 4px',
                    }}
                  />

                  <div className="relative text-center">
                    <p className="text-sm text-muted font-body">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dribbble Button */}
        <motion.button
          className="mt-12 rounded-full px-6 py-3 text-sm border border-stroke hover:border-[#89AACC] text-text-primary font-body transition-all hover:shadow-lg hover:shadow-[#89AACC]/20"
          whileHover={{ scale: 1.05 }}
        >
          View on Dribbble ↗
        </motion.button>
      </div>

      {/* Lightbox Modal */}
      {selectedId && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedId(null)}
        >
          <motion.div
            className="bg-surface border border-stroke rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square mb-6 bg-gradient-to-br from-stroke/20 to-stroke/5 rounded-2xl flex items-center justify-center">
              <p className="text-muted font-body">Exploration #{selectedId}</p>
            </div>

            <h3 className="text-2xl font-display italic text-text-primary mb-4">
              Motion Study {selectedId}
            </h3>

            <p className="text-muted font-body mb-6">
              This is a detailed view of the exploration. Additional details and
              context would be displayed here.
            </p>

            <motion.button
              className="w-full py-3 rounded-full bg-text-primary text-bg font-body font-medium hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              View Full Project
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
