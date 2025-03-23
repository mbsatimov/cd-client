import { createLazyFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import { BaseLayout } from '@/components/layout';

import { Hero, Listening, Reading, Writing } from './-components';

const FeaturesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Features | MOCK - IELTS ZONE</title>
      </Helmet>
      <Hero />
      <BaseLayout>
        <Listening />
        <Reading />
        <Writing />
      </BaseLayout>
    </div>
  );
};

export const Route = createLazyFileRoute('/_landing/features/')({
  component: FeaturesPage
});
