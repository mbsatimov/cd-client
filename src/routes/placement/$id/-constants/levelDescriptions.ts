interface LevelFeedback {
  achieved: string;
  focus: string;
  nextSteps: string;
  skills: string[];
  title: string;
}

const levelFeedbacks: Record<PlacementQuestionLevel, LevelFeedback> = {
  A1: {
    title: 'A1 - Breakthrough',
    achieved:
      "You've started building a foundation in the language. You can handle simple greetings and everyday phrases.",
    focus:
      'You may struggle with forming sentences beyond basic needs or understanding native speakers at normal speed.',
    skills: [
      'Introduce yourself and others',
      'Ask and answer questions about personal details',
      'Handle very simple conversations if spoken clearly and slowly'
    ],
    nextSteps:
      'Practice short conversations daily. Focus on expanding everyday vocabulary and using simple grammar patterns with confidence.'
  },

  A2: {
    title: 'A2 - Waystage',
    achieved: "You're able to communicate in familiar areas and manage simple, routine exchanges.",
    focus:
      'You may find it difficult to describe experiences in detail or follow conversations on unfamiliar topics.',
    skills: [
      'Communicate in simple and routine tasks',
      'Describe basic aspects of your background, environment, and needs',
      'Handle simple exchanges in familiar contexts'
    ],
    nextSteps:
      'Expand vocabulary in specific topics (work, travel, hobbies). Start practicing past and future tenses in short conversations.'
  },

  B1: {
    title: 'B1 - Threshold',
    achieved: 'You can manage most travel situations and express yourself in familiar topics.',
    focus: 'You may lack fluency when discussing abstract topics or explaining complex ideas.',
    skills: [
      'Connect phrases to describe experiences, events, dreams, and ambitions',
      'Give short reasons and explanations for opinions and plans',
      'Understand the main points of clear standard speech or text on familiar matters'
    ],
    nextSteps:
      'Work on expressing opinions in more detail. Practice speaking for longer without stopping to search for words.'
  },

  B1_PLUS: {
    title: 'B1+ - Threshold Plus',
    achieved: 'You’re stronger than B1, handling most situations with more confidence and fluency.',
    focus:
      'You might still struggle with nuance and fully spontaneous discussions on abstract themes.',
    skills: [
      'Describe experiences and opinions in detail',
      'Understand conversations on both familiar and some less familiar topics',
      'Link ideas more smoothly in speech and writing'
    ],
    nextSteps:
      'Push towards fluency by discussing broader topics (news, culture, work). Focus on complex sentence structures.'
  },

  B2: {
    title: 'B2 - Vantage',
    achieved:
      'You can communicate fluently and understand both concrete and abstract topics quite well.',
    focus:
      'You may still need to work on nuance, idioms, and maintaining precision in complex discussions.',
    skills: [
      'Understand the main ideas of complex texts',
      'Produce clear, detailed speech and writing',
      'Discuss viewpoints with supporting arguments'
    ],
    nextSteps:
      'Practice debating, writing essays, or joining group discussions. Focus on using idiomatic expressions naturally.'
  },

  C1: {
    title: 'C1 - Effective Operational Proficiency',
    achieved:
      'You can speak and write fluently with little effort, handling academic, professional, and social situations easily.',
    focus:
      'You may still need to refine style, tone, and cultural nuances, especially in very advanced or specialized contexts.',
    skills: [
      'Understand demanding texts and implicit meanings',
      'Use language flexibly for academic and professional purposes',
      'Produce detailed, well-structured, coherent text on complex issues'
    ],
    nextSteps:
      'Refine your style and accuracy. Practice using idioms, cultural references, and specialized vocabulary in different contexts.'
  },

  C2: {
    title: 'C2 - Mastery',
    achieved:
      'You can understand and produce language at a near-native level, handling subtle shades of meaning.',
    focus:
      'At this level, progress is about refining nuance, style, and keeping skills sharp across contexts.',
    skills: [
      'Understand virtually everything you read or hear with ease',
      'Summarize information from diverse sources precisely',
      'Express yourself fluently, very precisely, and with subtle control'
    ],
    nextSteps:
      'Stay challenged: read advanced literature, engage in high-level debates, and explore specialized areas (science, law, arts).'
  }
};

const defaultFeedback: LevelFeedback = {
  title: 'Starter',
  achieved: "You're just beginning your language journey.",
  focus: 'You need to build basic vocabulary and grammar awareness.',
  skills: [],
  nextSteps: 'Start with basic greetings, numbers, and simple sentences.'
};

export const getLevelDescription = (level: PlacementQuestionLevel): LevelFeedback => {
  return levelFeedbacks[level] || defaultFeedback;
};
