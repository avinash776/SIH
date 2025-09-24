import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import {
    BoltIcon,
    BookOpenIcon,
    ClipboardDocumentCheckIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    SpeakerWaveIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingWords from '../components/animations/FloatingWords';

export default function LandingPage() {
  const navigate = useNavigate();
  const features = [
    {
      icon: GlobeAltIcon,
      title: '22+ Languages Supported',
      description: 'From Hindi to Telugu, Bengali to Tamil - learn in your native language',
      color: 'text-blue-600'
    },
    {
      icon: BookOpenIcon,
      title: 'Text, Video, Audio, Assessments',
      description: 'Complete learning ecosystem with multimedia content',
      color: 'text-green-600'
    },
    {
      icon: BoltIcon,
      title: 'AI-Powered Cultural Adaptation',
      description: 'Smart localization that understands cultural context',
      color: 'text-purple-600'
    },
    {
      icon: SpeakerWaveIcon,
      title: 'Voice First: TTS + STT',
      description: 'Speak, listen, and interact naturally in any language',
      color: 'text-orange-600'
    }
  ];

  const pipeline = [
    { icon: DocumentTextIcon, title: 'Upload', description: 'Training content' },
    { icon: BoltIcon, title: 'AI Translate', description: 'Smart localization' },
    { icon: PlayIcon, title: 'Preview', description: 'Quality check' },
    { icon: ClipboardDocumentCheckIcon, title: 'Export', description: 'Ready to use' },
    { icon: BookOpenIcon, title: 'Learn', description: 'Student access' }
  ];

  const stats = [
    { number: '50M+', label: 'Potential Learners' },
    { number: '22+', label: 'Languages' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '3x', label: 'Faster Learning' }
  ];

  return (
    <div className="min-h-screen">
      <FloatingWords />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/95"></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          {Array.from({length: 8}).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `linear-gradient(45deg, ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#a29bfe', '#fdcb6e'][i]}, transparent)`,
                width: `${50 + i * 20}px`,
                height: `${50 + i * 20}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="mb-8"
            >
              <span className="text-6xl md:text-8xl animate-bounce-gentle">🌍</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading text-gray-900 mb-8 relative"
            >
              <span className="inline-block">Learn Any</span>{' '}
              <span className="inline-block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-pink via-vibrant-yellow to-vibrant-orange animate-gradient-move glow-text">
                  Skill
                </span>
                <motion.span 
                  className="absolute -top-4 -right-4 text-4xl"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.span>
              </span>
              <br />
              <span className="inline-block">In Any</span>{' '}
              <span className="inline-block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-green via-accent-400 to-secondary-400 animate-gradient-move glow-text">
                  Language
                </span>
                <motion.span 
                  className="absolute -top-4 -right-4 text-4xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, -10, 0] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🌟
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto font-medium leading-relaxed"
            >
              <span className="inline-block mr-2">🚀</span>
              AI-powered multilingual content localization for vocational training
              <span className="inline-block mx-2">•</span>
              <span className="text-vibrant-yellow">Breaking barriers</span>
              <span className="inline-block mx-2">•</span>
              <span className="text-vibrant-green">Building futures</span>
              <span className="inline-block ml-2">🎯</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 20px 40px rgba(255,107,107,0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/learn')}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-10 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-bounce">🎓</span>
                  <span className="font-bold">Get Started</span>
                  <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 40px rgba(78,205,196,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/admin')}
                className="relative overflow-hidden bg-white/90 backdrop-blur-lg text-gray-800 text-xl px-10 py-5 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span className="text-2xl group-hover:animate-spin">🎬</span>
                  <span className="font-bold">Admin Panel</span>
                  <PlayIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </span>
              </motion.button>
            </motion.div>
            
            {/* Language badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 flex flex-wrap justify-center gap-4"
            >
              {['🇮🇳 हिंदी', '🇧🇩 বাংলা', '🇮🇳 తెలుగు', '🇮🇳 தமிழ்', '🇮🇳 ಕನ್ನಡ', '🇵🇰 اردو'].map((lang, i) => (
                <motion.span
                  key={lang}
                  className="bg-white/80 backdrop-blur-lg px-4 py-2 rounded-full text-gray-800 font-medium text-lg border border-gray-200 shadow-md"
                  whileHover={{ scale: 1.1, y: -5 }}
                  animate={{ 
                    y: [0, -5, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity 
                  }}
                >
                  {lang}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🚀 Powerful Dashboard at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our intuitive interface designed for creators, learners, and administrators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Admin Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Admin Dashboard</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><span className="mr-3">✅</span> Content Management</li>
                <li className="flex items-center"><span className="mr-3">📊</span> Analytics & Reports</li>
                <li className="flex items-center"><span className="mr-3">👥</span> User Management</li>
                <li className="flex items-center"><span className="mr-3">🌐</span> Multi-language Control</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/admin')}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Explore Admin 🚀
              </motion.button>
            </motion.div>

            {/* Learner Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Learning Portal</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><span className="mr-3">📚</span> Interactive Lessons</li>
                <li className="flex items-center"><span className="mr-3">🎯</span> Progress Tracking</li>
                <li className="flex items-center"><span className="mr-3">🏆</span> Achievement System</li>
                <li className="flex items-center"><span className="mr-3">🗣️</span> Voice-First Learning</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/learn')}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Learning 📚
              </motion.button>
            </motion.div>

            {/* Creator Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Content Creation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><span className="mr-3">🎨</span> Visual Editor</li>
                <li className="flex items-center"><span className="mr-3">🤖</span> AI Translation</li>
                <li className="flex items-center"><span className="mr-3">🎵</span> Audio Generation</li>
                <li className="flex items-center"><span className="mr-3">📱</span> Mobile Ready</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Learn More 💡
              </motion.button>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">22+</div>
              <div className="text-gray-700 font-medium">Languages</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1M+</div>
              <div className="text-gray-700 font-medium">Learners</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <div className="text-gray-700 font-medium">Content Items</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">99%</div>
              <div className="text-gray-700 font-medium">Accuracy</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          {Array.from({length: 6}).map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                fontSize: `${3 + i}rem`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            >
              {['🎯', '🚀', '⚡', '🌟', '💡', '🎨'][i]}
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-6"
            >
              🌈
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-extrabold font-heading mb-6">
              <span className="multilingual-text">Powerful Features</span>
              <br />
              <span className="text-gray-800">for Modern Learning</span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create and consume 
              <span className="text-vibrant-pink font-bold"> multilingual </span>
              educational content with 
              <span className="text-vibrant-orange font-bold"> style!</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  rotateY: 5,
                }}
                className="vibrant-card p-8 text-center group relative overflow-hidden"
              >
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-3xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                      boxShadow: `0 10px 30px ${feature.color}40`,
                    }}
                  >
                    <feature.icon className="h-10 w-10" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute top-4 right-4 text-2xl opacity-20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Pipeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, powerful, intelligent workflow
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {pipeline.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="bg-primary-600 p-4 rounded-full mb-4 group-hover:bg-primary-700 transition-colors duration-300">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
                {index < pipeline.length - 1 && (
                  <ArrowRightIcon className="h-6 w-6 text-gray-400 mt-4 hidden md:block absolute right-[-20px]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-vibrant-pink via-vibrant-purple to-vibrant-orange animate-gradient-move"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating numbers animation */}
        <div className="absolute inset-0">
          {Array.from({length: 12}).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl font-bold text-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {Math.floor(Math.random() * 100)}
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              🎊 Amazing Numbers 🎊
            </h2>
            <p className="text-xl text-white/90">
              Join millions of learners transforming their futures!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  bounce: 0.6
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  rotateY: 10,
                }}
                className="text-center glassmorphism p-8 rounded-3xl neon-glow group cursor-pointer"
              >
                <motion.div
                  className="text-5xl md:text-7xl font-extrabold text-white mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 30px rgba(255,255,255,0.8)",
                      "0 0 20px rgba(255,255,255,0.5)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/90 text-lg md:text-xl font-semibold group-hover:text-white transition-colors">
                  {stat.label}
                </div>
                
                {/* Icon based on index */}
                <motion.div 
                  className="text-4xl mt-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {['👥', '🌍', '📊', '⚡'][index]}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-6">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of educators creating inclusive, multilingual learning experiences
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Start Your Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}