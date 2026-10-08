import { motion } from 'framer-motion'

const stats = [
  {
    number: '20+',
    label: 'Years',
    description: 'of experience in design and development',
  },
  {
    number: '95+',
    label: 'Projects',
    description: 'delivered across various industries',
  },
  {
    number: '200%',
    label: 'Satisfied',
    description: 'clients and growing community',
  },
]

export default function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <section className="bg-bg py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <motion.div
                className="text-5xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>

              <p className="text-lg md:text-xl font-body text-muted mb-2">
                {stat.label}
              </p>

              <p className="text-sm text-muted/70 font-body">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
