import { createLazyFileRoute } from '@tanstack/react-router';
import { useQueryState } from 'nuqs';
import { Helmet } from 'react-helmet-async';

import { BaseLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import {
  Faq,
  Feedback,
  Hero,
  IeltsExams,
  OfflineCDTab,
  OnlineCDTab,
  PaperBasedTab,
  WhyChooseUs
} from './-components';

const HomePage = () => {
  const [examType, setExamType] = useQueryState('type', { defaultValue: 'paper' });

  return (
    <>
      <Helmet>
        <title>MOCK - IELTS ZONE</title>
      </Helmet>
      <Hero />
      <IeltsExams />
      <WhyChooseUs />
      <BaseLayout>
        <Tabs
          className='w-full'
          defaultValue='paper'
          id='features'
          value={examType}
          onValueChange={setExamType}
        >
          <TabsList className='h-12 w-full'>
            <TabsTrigger className='md:px-6' value='offline-cd'>
              CDI
            </TabsTrigger>
            <TabsTrigger className='md:px-6' value='paper'>
              Paper-based
            </TabsTrigger>
            {/*<TabsTrigger className='md:px-6' value='online-cd'>*/}
            {/*  Online CD*/}
            {/*</TabsTrigger>*/}
          </TabsList>
          <TabsContent value='paper'>
            <PaperBasedTab />
          </TabsContent>
          <TabsContent value='offline-cd'>
            <OfflineCDTab />
          </TabsContent>
          <TabsContent value='online-cd'>
            <OnlineCDTab />
          </TabsContent>
        </Tabs>
      </BaseLayout>
      <Faq />
      <Feedback />
    </>
  );
};

export const Route = createLazyFileRoute('/_landing/')({
  component: HomePage
});
