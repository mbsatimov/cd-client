import { createLazyFileRoute } from '@tanstack/react-router';

import { BaseLayout } from '@/components/layout';

import { Hero, Listening, Reading, Writing } from './-components';

const FeaturesPage = () => {
  return (
    <div>
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
