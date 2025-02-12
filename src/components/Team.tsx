import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const team = [
  {
    name: '山田 太郎',
    role: 'CEO / 戦略コンサルタント',
    bio: '大手コンサルティングファーム出身。20年以上の戦略コンサルティング経験を持つ。',
    image: '/images/team1.jpg',
  },
  {
    name: '鈴木 美咲',
    role: 'DXコンサルタント',
    bio: 'IT企業でのプロジェクトマネージャー経験を活かし、DX推進を得意とする。',
    image: '/images/team2.jpg',
  },
  {
    name: '佐藤 健一',
    role: '組織開発スペシャリスト',
    bio: '人材開発のプロフェッショナル。数多くの企業の組織改革を成功に導く。',
    image: '/images/team3.jpg',
  },
  {
    name: '田中 優子',
    role: 'マーケティングディレクター',
    bio: 'デジタルマーケティングの専門家。データ分析と戦略立案が得意分野。',
    image: '/images/team4.jpg',
  },
]

export default function Team() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div id="team" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="section-title">チーム紹介</h2>
          <p className="section-subtitle">
            経験豊富な専門家たちが、お客様の成功をサポートします
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/30" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-7 tracking-tight text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm leading-6 text-primary">{member.role}</p>
              <p className="mt-4 text-sm leading-6 text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            私たちは常にお客様の視点に立ち、最適なソリューションを提供します。
          </p>
        </div>
      </div>
    </div>
  )
}
