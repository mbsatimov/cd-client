import { createLazyFileRoute } from '@tanstack/react-router';
import { useQueryState } from 'nuqs';
import { Helmet } from 'react-helmet-async';

import { BaseLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Hero, OfflineCDTab, OnlineCDTab, PaperBasedTab } from './-components';

const FeaturesPage = () => {
  const [examType, setExamType] = useQueryState('type', { defaultValue: 'paper' });

  return (
    <div>
      <Helmet>
        <title>Features | MOCK - IELTS ZONE</title>
      </Helmet>
      <Hero />
      <BaseLayout>
        <Tabs className='w-full' defaultValue='paper' value={examType} onValueChange={setExamType}>
          <TabsList className='h-12 w-full'>
            <TabsTrigger className='md:px-6' value='paper'>
              Paper based
            </TabsTrigger>
            <TabsTrigger className='md:px-6' value='offline-cd'>
              Offline CD
            </TabsTrigger>
            <TabsTrigger className='md:px-6' value='online-cd'>
              Online CD
            </TabsTrigger>
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
    </div>
  );
};

export const Route = createLazyFileRoute('/_landing/features/')({
  component: FeaturesPage
});
