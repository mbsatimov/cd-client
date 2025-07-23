import { Card, CardHeader, CardTitle } from '@/components/ui';
import { calculateIELTSBand, cn } from '@/lib/utils.ts';

const items: Record<CDOnlineType, any> = {
  LISTENING: {
    title: 'Listening',
    value: 'listening',
    getScore: (scores: any) => scores.listening.toFixed(1)
  },
  READING: {
    title: 'Reading',
    value: 'reading',
    getScore: (scores: any) => scores.reading.toFixed(1)
  },
  WRITING: {
    title: 'Writing',
    value: 'writing',
    getScore: (scores: any) => scores.writing?.toFixed(1)
  }
};

interface Props {
  currentTab: string;
  sections: CDOnlineType[];
  setCurrentTab: (tab: string) => void;
  scores: {
    listening?: number;
    reading?: number;
    writing?: number;
  };
}

export const OverallScoresTabs = ({ sections, scores, currentTab, setCurrentTab }: Props) => {
  return (
    <div className='grid grid-cols-5 gap-1 sm:gap-4'>
      {sections.map((section) => {
        const item = items[section];
        return (
          <button key={item.title} onClick={() => setCurrentTab(item.value)}>
            <Card className={cn('transition-colors', currentTab === item.value && 'bg-muted')}>
              <CardHeader className='space-y-1 p-1.5 sm:p-3 md:space-y-4 md:p-5'>
                <CardTitle className='text-xs sm:text-sm md:text-base'>{item.title}</CardTitle>
                <p className='text-center text-xl font-extrabold sm:text-3xl md:text-5xl'>
                  {item.getScore(scores)}
                </p>
              </CardHeader>
            </Card>
          </button>
        );
      })}
      <Card className='bg-yellow-500/10'>
        <CardHeader className='space-y-1 p-1.5 sm:p-3 md:space-y-4 md:p-5'>
          <CardTitle className='text-center text-xs sm:text-sm md:text-base'>Overall</CardTitle>
          <p className='text-center text-xl font-extrabold sm:text-3xl md:text-5xl'>
            {calculateIELTSBand([scores.writing, scores.reading, scores.listening]).toFixed(1)}
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};
