import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const caseStudies = [
  {
    title: '大手製造業のDX推進',
    description: '生産性を30%向上させ、年間コストを2億円削減',
    category: 'デジタルトランスフォーメーション',
    image: '/images/case1.jpg',
  },
  {
    title: 'スタートアップの急成長支援',
    description: '1年で売上高3倍、従業員数2倍の成長を実現',
    category: '戦略コンサルティング',
    image: '/images/case2.jpg',
  },
  {
    title: '人材育成プログラムの開発',
    description: '社員満足度20%向上、離職率を半減',
    category: '組織開発',
    image: '/images/case3.jpg',
  },
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div id="case-studies" className="py-24 sm:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="section-title">実績紹介</h2>
          <p className="section-subtitle">
            私たちは多くの企業様の成長をサポートしてきました
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3"
        >
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="text-sm font-medium text-primary">
                  {caseStudy.category}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {caseStudy.title}
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  {caseStudy.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-8">
            これらは一例です。業界や規模を問わず、多くの企業様の課題解決をサポートしています。
          </p>
          <a href="#contact" className="btn-primary">
            私たちにご相談ください
          </a>
        </div>
      </div>
    </div>
  )
}
