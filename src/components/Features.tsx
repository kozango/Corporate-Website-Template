import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: '戦略的思考',
    description: '市場分析と戦略立案により、ビジネスの成長を加速させます。',
    icon: LightBulbIcon,
  },
  {
    name: 'チーム力',
    description: '経験豊富な専門家チームが、多角的な視点でサポートします。',
    icon: UserGroupIcon,
  },
  {
    name: '実績重視',
    description: '数値に基づく意思決定と実践的なアプローチを重視します。',
    icon: ChartBarIcon,
  },
  {
    name: 'イノベーション',
    description: '最新のテクノロジーと手法を活用し、革新的なソリューションを提供します。',
    icon: SparklesIcon,
  },
]

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
        duration: 0.6,
      },
    },
  }

  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="section-title">私たちの強み</h2>
          <p className="section-subtitle">
            長年の経験と実績に基づく、確かな価値提供をお約束します
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <feature.icon
                  className="h-8 w-8 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
