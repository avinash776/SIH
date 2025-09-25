import {
  GlobeAltIcon,
  HeartIcon,
  LightBulbIcon,
  SparklesIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      icon: GlobeAltIcon,
      title: 'Global Accessibility',
      description: 'Making quality education accessible to everyone, regardless of language barriers.'
    },
    {
      icon: HeartIcon,
      title: 'Cultural Respect',
      description: 'Honoring diverse cultures and learning traditions across communities.'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI to create personalized learning experiences.'
    },
    {
      icon: UsersIcon,
      title: 'Community',
      description: 'Building bridges between learners, educators, and knowledge creators.'
    }
  ];

  const team = [
    {
      name: 'Jaideep Amrabad',
      role: 'Team Leader',
      image: '👨‍💼',
      bio: 'Visionary leader driving innovation in multilingual education technology.'
    },
    {
      name: 'Avinash Addanki',
      role: 'Team Member',
      image: '👨‍💻',
      bio: 'Software engineer passionate about creating accessible learning platforms.'
    },
    {
      name: 'Teja',
      role: 'Team Member',
      image: '�‍🏫',
      bio: 'Linguist and cultural consultant specializing in Indian languages.'
    },
    {
      name: 'Bhanu Prakash',
      role: 'Team Member',
      image: '👨‍🎯',
      bio: 'Full-stack developer with expertise in modern web technologies.'
    },
    {
      name: 'Deepthi',
      role: 'Team Member',
      image: '👩‍💻',
      bio: 'UI/UX designer focused on accessible and inclusive design.'
    },
    {
      name: 'Pranavi',
      role: 'Team Member',
      image: '👩‍🔬',
      bio: 'Data scientist specializing in AI and machine learning applications.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              >
                <SparklesIcon className="h-10 w-10 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SkillSetu</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              SkillSetu bridges the gap between knowledge and learners by creating multilingual, 
              culturally-aware educational content. We believe that language should never be a 
              barrier to learning and growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To democratize access to quality education by breaking down language barriers and 
              creating inclusive, culturally-sensitive learning experiences that honor the 
              diversity of our global community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A diverse group of educators, technologists, and linguists working together 
              to make education accessible to everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Help us create a world where quality education knows no language barriers. 
              Together, we can make learning accessible to everyone.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Get Involved
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}