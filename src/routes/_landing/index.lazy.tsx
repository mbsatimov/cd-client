import { createLazyFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { Faq, FeedbackCards, Hero, IeltsExams, WhyChooseUs } from './-components';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>MOCK - IELTS ZONE</title>
      </Helmet>
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
