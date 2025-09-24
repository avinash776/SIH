# 🌐 SkillSetu - Bridging Skills Across Languages

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.0.0-purple?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.3.0-cyan?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-10.16.5-pink?logo=framer" alt="Framer Motion" />
</div>

## ✨ Overview

SkillSetu is an AI-powered multilingual content localization engine for vocational courses. It allows training providers to upload learning content (text, docs, audio, video, assessments), and learners to consume it in their own language with cultural relevance, accessibility, and smooth experience.

**Tagline**: *"Learn Any Skill. In Any Language."*

## 🎯 Core Features

### 🌍 Landing Page
- **Hero Section**: Beautiful gradient background with floating multilingual words animation
- **Feature Highlights**: 22+ languages, AI-powered cultural adaptation, voice-first experience
- **Interactive Pipeline**: Animated workflow visualization
- **Responsive Design**: Mobile-first approach with smooth animations

### 👨‍💼 Admin Dashboard (Training Providers)
- **Drag & Drop Upload**: Beautiful file upload interface with progress animations
- **Multi-language Selection**: Interactive language picker with flags
- **AI Pipeline Visualization**: Real-time progress tracking for translation stages
- **Content Preview**: Side-by-side original vs localized content
- **Export Options**: Multiple format support (PDF, Video, Audio, LMS API)

### 🎓 Learner Portal
- **Personalized Dashboard**: Course cards with language badges and ratings
- **Bilingual Toggle**: Smooth language switching with morph animations
- **Multi-modal Learning**: Text, Audio, Video, and Assessment tabs
- **Voice Features**: TTS playback and voice query support
- **Accessibility Mode**: Enhanced readability and screen-reader support
- **Search with Typewriter Effect**: Multilingual search placeholders

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Heroicons + Lucide React
- **File Upload**: React Dropzone
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SIH
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Pages & Features

### 🏠 Landing Page (`/`)
- Floating multilingual words background animation
- Hero section with gradient and call-to-action buttons
- Feature cards with hover animations
- AI pipeline visualization
- Statistics showcase
- Responsive design with mobile optimization

### 🔧 Admin Dashboard (`/admin`)
- File upload with drag-and-drop interface
- Multi-language target selection
- AI processing pipeline with real-time status
- Content management and export options
- Progress tracking and analytics

### 📚 Learner Portal (`/learn`)
- Course discovery with search functionality
- Bilingual content viewing
- Audio lessons with TTS integration
- Video content with subtitle support
- Assessment and quiz modules
- Progress tracking and AI-generated notes

## 🎨 Design Features

### Color Scheme
- **Primary**: Indigo/Royal Blue (#6366f1) - Trust & professionalism
- **Secondary**: Warm Orange/Coral (#f97316) - Energy & creativity
- **Backgrounds**: Clean whites with subtle gradients

### Typography
- **Headings**: Poppins (modern, clean)
- **Body**: Inter (readable, friendly)
- **Multilingual**: Noto Sans (Indic language support)

### Animations
- **Landing**: Floating multilingual letters with CSS keyframes + Framer Motion
- **Interactions**: Scale transforms on buttons and cards
- **Transitions**: Smooth page transitions and content morphing
- **Loading States**: Skeleton loaders and progress bars

## 🌍 Multilingual Support

### Supported Languages
- Hindi (हिंदी)
- Telugu (తెలుగు)
- Bengali (বাংলা)
- Tamil (தமிழ்)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)
- Urdu (اردو)
- And 12+ more languages

### Features
- **Real-time Translation**: AI-powered content localization
- **Cultural Adaptation**: Context-aware translations
- **Voice Support**: Text-to-Speech in native accents
- **Bilingual Mode**: Side-by-side content comparison

## 🏗️ Project Structure

```
src/
├── components/
│   ├── animations/
│   │   └── FloatingWords.tsx    # Floating multilingual background
│   ├── ui/                      # Reusable UI components
│   └── Navbar.tsx              # Navigation component
├── pages/
│   ├── LandingPage.tsx         # Homepage with hero & features
│   ├── AdminDashboard.tsx      # Content management interface
│   └── LearnerPortal.tsx       # Student learning interface
├── App.tsx                     # Main app with routing
├── main.tsx                    # React entry point
└── index.css                   # Global styles & animations
```

## 🎯 Hackathon MVP Focus (48h Demo)

### Core Demo Features
1. **File Upload** → AI Translation → Bilingual Preview
2. **TTS Playback** in local languages
3. **Beautiful Landing Page** with animations (first impression)
4. **Learner Portal** with bilingual toggle and audio playback
5. **Responsive Design** across all devices

### Live Demo Highlights
- Upload a PDF document
- Select target languages (Hindi, Telugu, Bengali)
- Watch AI processing pipeline
- Preview translated content side-by-side
- Test audio playback in different languages
- Demonstrate learner interface with course browsing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p><strong>🌟 Empowering learners across India with multilingual education 🌟</strong></p>
  <p>Built with ❤️ for the Smart India Hackathon 2024</p>
</div>