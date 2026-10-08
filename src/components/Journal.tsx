import { motion } from 'framer-motion'

const entries = [
  {
    title: 'The Future of Web Design',
    date: 'July 14, 2024',
    readTime: '5 min read',
  },
  {
    title: 'Designing for Performance',
    date: 'July 10, 2024',
    readTime: '8 min read',
  },
  {
    title: 'Creative Coding with React',
    date: 'July 5, 2024',
    readTime: '6 min read',
  },
  {
    title: 'Building Systems',
    date: 'June 28, 2024',
    readTime: '7 min read',
  },
]

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <p className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Journal
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic">
              Recent <span className="text-text-primary">thoughts</span>
            </h2>
            <motion.button
              className="hidden md:inline-flex rounded-full px-6 py-3 text-sm border border-stroke hover:border-[#89AACC] text-text-primary font-body transition-all hover:shadow-lg hover:shadow-[#89AACC]/20"
              whileHover={{ scale: 1.05 }}
            >
              View all ↗
            </motion.button>
          </div>

          <p className="text-muted text-sm md:text-base mt-6 font-body max-w-2xl">
            Thoughts and insights on design, development, and creativity.
          </p>
        </motion.div>

        {/* Journal Entries */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full hover:border-[#89AACC] transition-all cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-body text-text-primary font-medium mb-2 sm:mb-0">
                  {entry.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted font-body whitespace-nowrap">
                <span>{entry.readTime}</span>
                <div className="w-px h-4 bg-stroke/30" />
                <span>{entry.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All */}
        <motion.button
          className="md:hidden w-full mt-8 rounded-full px-6 py-3 text-sm border border-stroke hover:border-[#89AACC] text-text-primary font-body transition-all"
          whileHover={{ scale: 1.02 }}
        >
          View all ↗
        </motion.button>
      </div>
    </section>
  )
}
