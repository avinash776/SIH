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
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/95"></div>
        
        {/* Beautiful background graphics - static for performance */}
        <div className="absolute inset-0">
          {/* Gradient circles */}
          <div className="absolute rounded-full opacity-20 bg-gradient-to-br from-blue-400 to-purple-500 w-40 h-40 left-1/6 top-1/5 blur-sm"></div>
          <div className="absolute rounded-full opacity-15 bg-gradient-to-br from-green-400 to-blue-500 w-32 h-32 right-1/5 top-1/4 blur-sm"></div>
          <div className="absolute rounded-full opacity-25 bg-gradient-to-br from-purple-400 to-pink-500 w-24 h-24 left-1/3 bottom-1/3 blur-sm"></div>
          <div className="absolute rounded-full opacity-18 bg-gradient-to-br from-orange-400 to-red-500 w-36 h-36 right-1/4 bottom-1/4 blur-sm"></div>
          
          {/* Geometric shapes */}
          <div className="absolute w-20 h-20 bg-gradient-to-br from-cyan-300 to-blue-400 opacity-10 rotate-45 left-3/4 top-1/6"></div>
          <div className="absolute w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-400 opacity-15 rotate-12 left-1/5 bottom-1/5"></div>
          
          {/* Decorative dots pattern */}
          <div className="absolute right-1/6 top-1/3">
            <div className="grid grid-cols-3 gap-2 opacity-20">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-blue-400 rounded-full"></div>
              ))}
            </div>
          </div>
          
          {/* Subtle lines */}
          <div className="absolute left-1/4 top-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30 rotate-45"></div>
          <div className="absolute right-1/3 bottom-1/3 w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-25 -rotate-45"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="text-6xl md:text-8xl">🌍</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading text-gray-900 mb-8 relative">
              <span className="inline-block">Learn Any</span>{' '}
              <span className="inline-block relative">
                <span className="text-blue-600 font-bold">
                  Skill
                </span>
                <span className="absolute -top-2 -right-2 text-2xl">⚡</span>
              </span>
              <br />
              <span className="inline-block">In Any</span>{' '}
              <span className="inline-block relative">
                <span className="text-green-600 font-bold">
                  Language
                </span>
                <span className="absolute -top-2 -right-2 text-2xl">🌟</span>
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
              <span className="inline-block mr-2">🚀</span>
              AI-powered multilingual content localization for vocational training
              <span className="inline-block mx-2">•</span>
              <span className="text-orange-600 font-semibold">Breaking barriers</span>
              <span className="inline-block mx-2">•</span>
              <span className="text-green-600 font-semibold">Building futures</span>
              <span className="inline-block ml-2">🎯</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate('/learn')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-10 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer"
              >
                <span className="flex items-center space-x-3">
                  <span className="text-2xl">🎓</span>
                  <span className="font-bold">Get Started</span>
                  <ArrowRightIcon className="h-6 w-6" />
                </span>
              </button>
              
              <button
                onClick={() => navigate('/admin')}
                className="bg-white/90 backdrop-blur-lg text-gray-800 text-xl px-10 py-5 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer"
              >
                <span className="flex items-center space-x-3">
                  <span className="text-2xl">🎬</span>
                  <span className="font-bold">Admin Panel</span>
                  <PlayIcon className="h-6 w-6" />
                </span>
              </button>
            </div>
            
            {/* Language badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-4">
              {['🇮🇳 हिंदी', '🇧🇩 বাংলা', '🇮🇳 తెలుగు', '🇮🇳 தமிழ்', '🇮🇳 ಕನ್ನಡ', '🇵🇰 اردو'].map((lang) => (
                <span
                  key={lang}
                  className="bg-white/80 backdrop-blur-lg px-4 py-2 rounded-full text-gray-800 font-medium text-lg border border-gray-200 shadow-md hover:scale-105 transition-transform duration-200"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🚀 Powerful Dashboard at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our intuitive interface designed for creators, learners, and administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Admin Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-blue-200">
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
              <button
                onClick={() => navigate('/admin')}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Explore Admin 🚀
              </button>
            </div>

            {/* Learner Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-green-200">
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
              <button
                onClick={() => navigate('/learn')}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Start Learning 📚
              </button>
            </div>

            {/* Creator Card */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-purple-200">
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
              <button
                onClick={() => navigate('/about')}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-violet-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Learn More 💡
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
        {/* Beautiful background decorations */}
        <div className="absolute inset-0">
          {/* Decorative shapes */}
          <div className="absolute opacity-10 text-6xl left-[10%] top-[20%]">🌟</div>
          <div className="absolute opacity-15 text-4xl right-[15%] top-[10%]">✨</div>
          <div className="absolute opacity-12 text-5xl left-[5%] bottom-[25%]">💫</div>
          <div className="absolute opacity-18 text-3xl right-[8%] bottom-[15%]">⭐</div>
          
          {/* Gradient blobs */}
          <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-16 left-16 w-40 h-40 bg-gradient-to-br from-orange-200 to-yellow-300 rounded-full opacity-15 blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full opacity-25 blur-lg"></div>
          
          {/* Geometric patterns */}
          <div className="absolute top-1/4 right-1/3 w-8 h-8 border-2 border-purple-300 opacity-20 rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 border-2 border-pink-300 opacity-25 rotate-12"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute top-1/6 right-1/6 opacity-10">
            <div className="grid grid-cols-4 gap-3">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-purple-400 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="text-6xl mb-6">🌈</div>
            <h2 className="text-4xl md:text-6xl font-extrabold font-heading mb-6">
              <span className="text-blue-600">Powerful Features</span>
              <br />
              <span className="text-gray-800">for Modern Learning</span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create and consume 
              <span className="text-pink-600 font-bold"> multilingual </span>
              educational content with 
              <span className="text-orange-600 font-bold"> style!</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-8 text-center rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-200 border border-gray-100"
              >
                <div className="relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-br ${
                    feature.color === 'text-blue-600' ? 'from-blue-500 to-blue-600' :
                    feature.color === 'text-green-600' ? 'from-green-500 to-green-600' :
                    feature.color === 'text-purple-600' ? 'from-purple-500 to-purple-600' :
                    'from-orange-500 to-orange-600'
                  }`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Static decorative element */}
                <div className="absolute top-4 right-4 text-2xl opacity-20">✨</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Pipeline Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background graphics */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Tech-themed decorations */}
          <div className="absolute top-10 left-20 opacity-15">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Circuit-like lines */}
          <div className="absolute top-1/4 right-1/6 w-16 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 opacity-20"></div>
          <div className="absolute bottom-1/3 left-1/6 w-20 h-0.5 bg-gradient-to-r from-green-300 to-blue-300 opacity-25"></div>
          
          {/* Floating tech elements */}
          <div className="absolute top-1/6 right-1/4 text-2xl opacity-10">🔧</div>
          <div className="absolute bottom-1/4 left-1/5 text-3xl opacity-15">⚙️</div>
          <div className="absolute top-1/3 left-1/4 text-2xl opacity-12">🚀</div>
          
          {/* Subtle gradients */}
          <div className="absolute top-16 right-32 w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full opacity-20 blur-lg"></div>
          <div className="absolute bottom-20 left-40 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full opacity-15 blur-lg"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, powerful, intelligent workflow
            </p>
          </div>

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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Beautiful background patterns */}
        <div className="absolute inset-0">
          {/* Geometric shapes */}
          <div className="absolute top-10 left-10 w-16 h-16 border border-white/20 rotate-45 opacity-30"></div>
          <div className="absolute top-20 right-20 w-12 h-12 border border-white/15 rotate-12 opacity-25"></div>
          <div className="absolute bottom-16 left-1/4 w-8 h-8 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-24 right-1/3 w-6 h-6 bg-white/15 rounded-full"></div>
          
          {/* Decorative lines */}
          <div className="absolute top-1/3 left-1/6 w-24 h-0.5 bg-white/20 rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/6 w-20 h-0.5 bg-white/25 -rotate-45"></div>
          
          {/* Subtle patterns */}
          <div className="absolute top-1/4 right-1/4 opacity-20">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
              ))}
            </div>
          </div>
          
          {/* Large decorative elements */}
          <div className="absolute top-16 left-1/3 text-6xl opacity-10">📊</div>
          <div className="absolute bottom-20 right-1/4 text-5xl opacity-15">🚀</div>
          
          {/* Static number decorations */}
          <div className="absolute left-[15%] top-[30%] text-4xl font-bold text-white/5">2024</div>
          <div className="absolute right-[20%] bottom-[35%] text-3xl font-bold text-white/8">100%</div>
          <div className="absolute left-[70%] top-[15%] text-2xl font-bold text-white/6">AI</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              🎊 Amazing Numbers 🎊
            </h2>
            <p className="text-xl text-white/90">
              Join millions of learners transforming their futures!
            </p>
          </div>
          
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