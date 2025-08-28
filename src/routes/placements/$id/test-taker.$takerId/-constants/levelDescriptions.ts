interface LevelDescription {
  description: string;
  nextSteps: string;
  skills: string[];
  title: string;
}

const levelDescriptions: Record<PlacementQuestionLevel, LevelDescription> = {
  A1: {
    title: 'A1 - Breakthrough',
    description:
      'You can understand and use familiar everyday expressions and very basic phrases aimed at satisfying concrete needs.',
    skills: [
      'Introduce yourself and others',
      'Ask and answer questions about personal details',
      'Interact in a simple way if the other person speaks slowly and clearly'
    ],
    nextSteps:
      'Practice basic conversations and expand your vocabulary. Focus on simple grammatical structures and everyday phrases.'
  },

  A2: {
    title: 'A2 - Waystage',
    description:
      'You can understand sentences and frequently used expressions related to areas of most immediate relevance.',
    skills: [
      'Communicate in simple and routine tasks',
      'Describe in simple terms aspects of your background and environment',
      'Express immediate needs and handle simple exchanges in familiar areas'
    ],
    nextSteps:
      'Work on more complex sentence structures and expand your vocabulary in specific topics. Practice describing past experiences and future plans.'
  },
  B1: {
    title: 'B1 - Threshold',
    description:
      'You can deal with most situations likely to arise while traveling in an area where the language is spoken.',
    skills: [
      'Connect phrases to describe experiences, events, dreams, and ambitions',
      'Briefly give reasons and explanations for opinions and plans',
      'Understand the main points of clear standard input on familiar matters'
    ],
    nextSteps:
      'Work on expressing yourself more fluently and spontaneously. Focus on more complex topics and practice giving detailed explanations.'
  },
  B2: {
    title: 'B2 - Vantage',
    description:
      'You can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party.',
    skills: [
      'Understand the main ideas of complex text on both concrete and abstract topics',
      'Produce clear, detailed text on a wide range of subjects',
      'Explain a viewpoint on a topical issue giving advantages and disadvantages'
    ],
    nextSteps:
      'Work on precision and nuance in your expression. Focus on understanding implicit meaning and cultural references.'
  },
  C1: {
    title: 'C1 - Effective Operational Proficiency',
    description:
      'You can express yourself fluently and spontaneously without much obvious searching for expressions.',
    skills: [
      'Understand a wide range of demanding, longer texts, and recognize implicit meaning',
      'Use language flexibly and effectively for social, academic and professional purposes',
      'Produce clear, well-structured, detailed text on complex subjects'
    ],
    nextSteps:
      'Focus on mastering idiomatic expressions and cultural nuances. Work on specialized vocabulary and refining your style for different contexts.'
  },

  C2: {
    title: 'C2 - Mastery',
    description:
      'You can express yourself spontaneously, very fluently and precisely, differentiating finer shades of meaning even in more complex situations.',
    skills: [
      'Understand with ease virtually everything heard or read',
      'Summarize information from different spoken and written sources',
      'Express yourself spontaneously, very fluently and precisely'
    ],
    nextSteps:
      'Continue refining your mastery of subtle nuances and cultural references. Focus on specialized domains and maintaining your high level of proficiency.'
  }
};

// Default description for fallback
const defaultDescription: LevelDescription = {
  title: 'Starter',
  description: "You're just starting to learn the language.",
  skills: [],
  nextSteps:
    'Work on basic vocabulary and grammar structures. Practice speaking in your own language.'
};

export const getLevelDescription = (level: PlacementQuestionLevel): LevelDescription => {
  return levelDescriptions[level] || defaultDescription;
};
