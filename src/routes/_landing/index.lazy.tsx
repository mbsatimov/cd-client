import { createLazyFileRoute } from '@tanstack/react-router';

import { Faq, FeedbackCards, Hero, IeltsExams, WhyChooseUs } from './-components';

const HomePage = () => {
  return (
    <>
      <Hero />
      <IeltsExams />
      <WhyChooseUs />
      <Faq />
      <FeedbackCards />
    </>
  );
};

export const Route = createLazyFileRoute('/_landing/')({
  component: HomePage
});
