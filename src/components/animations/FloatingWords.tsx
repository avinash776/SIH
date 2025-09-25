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
  // Further reduce to just 3 words for optimal performance
  const reducedWords = multilingualWords.slice(0, 3); // Only use first 3 words
  const floatingWords: FloatingWord[] = reducedWords.map((word, index) => ({
    id: index,
    word,
    x: 15 + (index * 25), // More spaced out positions
    y: 15 + (index * 20),
    duration: 20, // Slower movement for smoother performance
    delay: index * 1, // Longer delays
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Beautiful background decorations */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlays */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-gradient-to-br from-pink-200/20 to-orange-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-200/25 to-blue-300/25 rounded-full blur-lg"></div>
        
        {/* Static decorative elements */}
        <div className="absolute top-1/6 right-1/5 text-xl opacity-20">🌟</div>
        <div className="absolute bottom-1/4 left-1/6 text-2xl opacity-15">✨</div>
        <div className="absolute top-2/3 right-1/3 text-lg opacity-25">💫</div>
      </div>
      
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
            y: [-10, 10, -10],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <span className="inline-block mr-2">
            {item.word.emoji}
          </span>
          <span className="multilingual-text font-extrabold">
            {item.word.text.split(' ')[1] || item.word.text}
          </span>
        </motion.div>
      ))}
      
      {/* Simplified sparkle effects - just 3 static sparkles */}
      <div className="absolute text-2xl select-none opacity-30" style={{ left: '20%', top: '30%' }}>✨</div>
      <div className="absolute text-2xl select-none opacity-30" style={{ left: '70%', top: '60%' }}>🌟</div>
      <div className="absolute text-2xl select-none opacity-30" style={{ left: '50%', top: '80%' }}>✨</div>
    </div>
  );
}