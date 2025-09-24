import { motion } from 'framer-motion';

const multilingualWords = [
  { text: '🎓 शिक्षा', lang: 'hi', meaning: 'Education', color: '#ff6b6b', emoji: '📚' },
  { text: '💡 ज्ञान', lang: 'hi', meaning: 'Knowledge', color: '#4ecdc4', emoji: '🧠' },
  { text: '⭐ Skill', lang: 'en', meaning: 'Skill', color: '#45b7d1', emoji: '🛠️' },
  { text: '📖 علم', lang: 'ar', meaning: 'Knowledge', color: '#96ceb4', emoji: '🌟' },
  { text: '🎯 বিদ্যা', lang: 'bn', meaning: 'Learning', color: '#ffeaa7', emoji: '💫' },
  { text: '🚀 కౌశలం', lang: 'te', meaning: 'Skill', color: '#fd79a8', emoji: '⚡' },
  { text: '📝 शैक्षणिक', lang: 'mr', meaning: 'Educational', color: '#a29bfe', emoji: '✨' },
  { text: '🎨 ಕೌಶಲ್ಯ', lang: 'kn', meaning: 'Skill', color: '#fdcb6e', emoji: '🎭' },
  { text: '🏆 கல்வி', lang: 'ta', meaning: 'Education', color: '#6c5ce7', emoji: '🌈' },
  { text: '🌍 Learning', lang: 'en', meaning: 'Learning', color: '#00b894', emoji: '🔮' },
  { text: '🎪 ਸਿੱਖਿਆ', lang: 'pa', meaning: 'Education', color: '#e17055', emoji: '🎊' },
  { text: '🎵 تعليم', lang: 'ur', meaning: 'Education', color: '#00cec9', emoji: '🎼' },
  { text: '🌺 વિદ્યા', lang: 'gu', meaning: 'Learning', color: '#fd79a8', emoji: '🌸' },
  { text: '🎹 വിദ്യ', lang: 'ml', meaning: 'Education', color: '#fdcb6e', emoji: '🎨' },
];

interface FloatingWord {
  id: number;
  word: typeof multilingualWords[0];
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export default function FloatingWords() {
  const floatingWords: FloatingWord[] = multilingualWords.map((word, index) => ({
    id: index,
    word,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 4,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingWords.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-3xl md:text-4xl lg:text-5xl font-bold select-none glow-text"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            color: item.word.color,
            textShadow: `0 0 20px ${item.word.color}80, 0 0 40px ${item.word.color}60`,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.5,
            opacity: 0.8,
            transition: { duration: 0.3 },
          }}
        >
          <span className="inline-block animate-bounce-gentle mr-2">
            {item.word.emoji}
          </span>
          <span className="multilingual-text font-extrabold">
            {item.word.text.split(' ')[1] || item.word.text}
          </span>
        </motion.div>
      ))}
      
      {/* Sparkle effects */}
      {Array.from({length: 15}).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-2xl select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {Math.random() > 0.5 ? '✨' : '🌟'}
        </motion.div>
      ))}
    </div>
  );
}