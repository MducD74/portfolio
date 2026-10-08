import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Automotive Motion',
    description: 'Digital experience for luxury vehicles',
    span: 'md:col-span-7',
  },
  {
    title: 'Urban Architecture',
    description: 'Showcase of contemporary design',
    span: 'md:col-span-5',
  },
  {
    title: 'Human Perspective',
    description: 'Community-driven storytelling platform',
    span: 'md:col-span-5',
  },
  {
    title: 'Brand Identity',
    description: 'Complete visual system design',
    span: 'md:col-span-7',
  },
]

export default function SelectedWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <section className="bg-bg py-12 md:py-16 overflow-hidden">
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
              Selected Work
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic">
              Featured <span className="text-text-primary">projects</span>
            </h2>
            <motion.button
              className="hidden md:inline-flex rounded-full px-6 py-3 text-sm border border-stroke hover:border-[#89AACC] text-text-primary font-body transition-all hover:shadow-lg hover:shadow-[#89AACC]/20"
              whileHover={{ scale: 1.05 }}
            >
              View all work ↗
            </motion.button>
          </div>

          <p className="text-muted text-sm md:text-base mt-6 font-body max-w-2xl">
            A selection of projects I&apos;ve worked on, from concept to launch.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`${project.span} group relative rounded-3xl overflow-hidden bg-surface border border-stroke hover:border-[#89AACC] transition-all cursor-pointer ${
                index % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4] md:aspect-auto'
              }`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Background placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-stroke/20 to-stroke/5" />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted font-body hidden md:block">
                    {project.description}
                  </p>
                </div>

                {/* Hover Label */}
                <motion.div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-text-primary text-bg font-body text-sm w-fit opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 10 }}
                  whileHover={{ y: 0 }}
                >
                  <span>View</span>
                  <span>—</span>
                  <span className="font-display italic">{project.title}</span>
                </motion.div>
              </div>

              {/* Hover Background */}
              <motion.div
                className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <motion.button
          className="md:hidden w-full mt-8 rounded-full px-6 py-3 text-sm border border-stroke hover:border-[#89AACC] text-text-primary font-body transition-all"
          whileHover={{ scale: 1.02 }}
        >
          View all work ↗
        </motion.button>
      </div>
    </section>
  )
}
