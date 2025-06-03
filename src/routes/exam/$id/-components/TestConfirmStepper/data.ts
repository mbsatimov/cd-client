export const stepsMap: Record<IeltsTestType, any> = {
  listening: {
    title: 'IELTS Listening',
    desc: 'Time: Approximately 30 minutes',
    instructions: {
      title: 'INSTRUCTIONS TO CANDIDATES',
      list: [
        'Answer <strong>all</strong> the questions.',
        'You can change your answers at any time during the test.'
      ]
    },
    information: {
      title: 'INFORMATION FOR CANDIDATES',
      list: [
        'There are 40 questions in this test.',
        'Each question carries one mark.',
        'There are four parts to the test.',
        'Please note you will only hear each part once in your actual test.',
        'For each part of the test there will be time for you to look through the questions and time for you to check your answers.'
      ]
    }
  },
  reading: {
    title: 'IELTS Academic Reading',
    desc: 'Time: 1 hour',
    instructions: {
      title: 'INSTRUCTIONS TO CANDIDATES',
      list: [
        'Answer <strong>all</strong> the questions.',
        'You can change your answers at any time during the test.'
      ]
    },
    information: {
      title: 'INFORMATION FOR CANDIDATES',
      list: [
        'There are 40 questions in this test.',
        'Each question carries one mark.',
        'There are three parts to the test.',
        'The test clock will show you when there are 10 minutes and 5 minutes remaining.'
      ]
    }
  },
  writing: {
    title: 'IELTS Academic Writing',
    desc: 'Time: 1 hour',
    instructions: {
      title: 'INSTRUCTIONS TO CANDIDATES',
      list: [
        'Answer <strong>both</strong> parts.',
        'You can change your answers at any time during the test.'
      ]
    },
    information: {
      title: 'INFORMATION FOR CANDIDATES',
      list: [
        'There are two parts in this test.',
        'Part 2 contributes twice as much as Part 1 to the writing score.',
        'The test clock will show you when there are 10 minutes and 5 minutes remaining.'
      ]
    }
  },
  speaking: ''
};
