import {
    AdjustmentsHorizontalIcon,
    BookOpenIcon,
    ClipboardDocumentCheckIcon,
    LanguageIcon,
    MagnifyingGlassIcon,
    MicrophoneIcon,
    PauseIcon,
    PlayIcon,
    SpeakerWaveIcon,
    VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface Course {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  thumbnail: string;
  language: string;
  duration: string;
  rating: number;
  level: string;
  category: string;
}

interface LessonContent {
  english: string;
  hindi: string;
  audio?: string;
}

export default function LearnerPortal() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCourse, setCurrentCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'audio' | 'video' | 'assessment'>('text');
  const [isPlaying, setIsPlaying] = useState(false);
  const [bilingualMode, setBilingualMode] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Basic Electronics',
      titleHi: 'बुनियादी इलेक्ट्रॉनिक्स',
      description: 'Learn fundamental concepts of electronics and circuit design',
      descriptionHi: 'इलेक्ट्रॉनिक्स और सर्किट डिज़ाइन की बुनियादी अवधारणाएं सीखें',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      language: 'Hindi',
      duration: '4 hours',
      rating: 4.8,
      level: 'Beginner',
      category: 'Technology'
    },
    {
      id: '2',
      title: 'Welding Techniques',
      titleHi: 'वेल्डिंग तकनीकें',
      description: 'Master arc welding and safety procedures',
      descriptionHi: 'आर्क वेल्डिंग और सुरक्षा प्रक्रियाओं में महारत हासिल करें',
      thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      language: 'Telugu',
      duration: '6 hours',
      rating: 4.9,
      level: 'Intermediate',
      category: 'Manufacturing'
    },
    {
      id: '3',
      title: 'Digital Marketing',
      titleHi: 'डिजिटल मार्केटिंग',
      description: 'Learn social media marketing and SEO strategies',
      descriptionHi: 'सोशल मीडिया मार्केटिंग और SEO रणनीतियां सीखें',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      language: 'Bengali',
      duration: '8 hours',
      rating: 4.7,
      level: 'Advanced',
      category: 'Business'
    }
  ];

  const lessonContent: LessonContent = {
    english: "Welcome to Basic Electronics! In this lesson, we'll explore the fundamental concepts of electrical circuits. A circuit is a complete path that allows electric current to flow from a power source, through various components, and back to the source.",
    hindi: "बुनियादी इलेक्ट्रॉनिक्स में आपका स्वागत है! इस पाठ में, हम विद्युत सर्किट की बुनियादी अवधारणाओं का पता लगाएंगे। एक सर्किट एक पूरा मार्ग है जो विद्युत प्रवाह को एक शक्ति स्रोत से, विभिन्न घटकों के माध्यम से, और वापस स्रोत तक प्रवाहित होने की अनुमति देता है।"
  };

  const searchPlaceholders = [
    'Search in Hindi…',
    'हिंदी में खोजें…',
    'Search in Telugu…',
    'तेलुगु में खोजें…',
    'Search in Bengali…',
    'बंगाली में खोजें…'
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Typewriter effect for search placeholder
  useState(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % searchPlaceholders.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  const toggleLanguage = () => {
    setSelectedLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.titleHi.includes(searchQuery) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentCourse) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentCourse(null)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Back to Courses
              </button>
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={toggleLanguage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                >
                  <LanguageIcon className="h-5 w-5" />
                  <span>{selectedLanguage === 'en' ? 'English' : 'हिंदी'}</span>
                </motion.button>
                
                <motion.button
                  onClick={() => setBilingualMode(!bilingualMode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    bilingualMode ? 'bg-secondary-100 text-secondary-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Bilingual Mode
                </motion.button>

                <motion.button
                  onClick={() => setAccessibilityMode(!accessibilityMode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Course Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                  {[
                    { id: 'text', label: 'Text', icon: BookOpenIcon },
                    { id: 'audio', label: 'Audio', icon: SpeakerWaveIcon },
                    { id: 'video', label: 'Video', icon: VideoCameraIcon },
                    { id: 'assessment', label: 'Assessment', icon: ClipboardDocumentCheckIcon },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-white text-primary-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                  {activeTab === 'text' && (
                    <motion.div
                      key="text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={accessibilityMode ? 'text-lg leading-relaxed' : 'text-base leading-normal'}
                    >
                      {bilingualMode ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-3">English</h3>
                            <p className="text-gray-800">{lessonContent.english}</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-orange-900 mb-3">हिंदी</h3>
                            <p className="text-gray-800 font-medium">{lessonContent.hindi}</p>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          key={selectedLanguage}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-gray-800 leading-relaxed">
                            {selectedLanguage === 'en' ? lessonContent.english : lessonContent.hindi}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'audio' && (
                    <motion.div
                      key="audio"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-12"
                    >
                      <div className="mb-8">
                        <motion.div
                          animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                          transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                          className="mx-auto w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mb-4"
                        >
                          <SpeakerWaveIcon className="h-12 w-12 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Audio Lesson
                        </h3>
                        <p className="text-gray-600">
                          Listen to the lesson in {selectedLanguage === 'en' ? 'English' : 'Hindi'}
                        </p>
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        <motion.button
                          onClick={toggleAudio}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          {isPlaying ? (
                            <PauseIcon className="h-5 w-5" />
                          ) : (
                            <PlayIcon className="h-5 w-5" />
                          )}
                          <span>{isPlaying ? 'Pause' : 'Play'}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors"
                        >
                          <MicrophoneIcon className="h-5 w-5" />
                          <span>Voice Query</span>
                        </motion.button>
                      </div>

                      <audio ref={audioRef} preload="metadata">
                        <source src="/audio/lesson1.mp3" type="audio/mpeg" />
                      </audio>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Course Completion</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-primary-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* AI Notes */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Notes</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary"
                >
                  Generate Notes
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
            Learner Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover courses in your preferred language
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <motion.div
              className="relative"
              animate={{ scale: isSearchActive ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                onBlur={() => setIsSearchActive(false)}
                placeholder={searchPlaceholders[placeholderIndex]}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-200 transition-all duration-300"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setCurrentCourse(course.id)}
            >
              <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {course.language}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {selectedLanguage === 'en' ? course.title : course.titleHi}
                  </h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {selectedLanguage === 'en' ? course.description : course.descriptionHi}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{course.duration}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{course.level}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}