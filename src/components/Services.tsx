import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    title: '戦略コンサルティング',
    description: '市場分析、競合分析、成長戦略の策定など、経営戦略の立案をサポートします。',
    image: '/images/strategy.jpg',
  },
  {
    title: 'デジタルトランスフォーメーション',
    description: 'テクノロジーを活用した業務改革や、デジタル化による競争力強化を支援します。',
    image: '/images/digital.jpg',
  },
  {
    title: '組織開発',
    description: '組織構造の最適化、人材育成プログラムの開発、チーム力向上をサポートします。',
    image: '/images/organization.jpg',
  },
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div id="services" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="section-title">サービス</h2>
          <p className="section-subtitle">
            お客様のニーズに合わせた最適なソリューションを提供します
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative h-64 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute inset-0 bg-gray-900/50 group-hover:bg-gray-900/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-200">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary">
            サービスについて相談する
          </a>
        </div>
      </div>
    </div>
  )
}
