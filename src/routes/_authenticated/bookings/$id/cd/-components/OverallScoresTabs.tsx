import { Card, CardHeader, CardTitle } from '@/components/ui';
import { calculateIELTSBand, cn } from '@/lib/utils.ts';

const items = [
  {
    title: 'Listening',
    value: 'listening',
    getScore: (scores: any) => scores.listening.toFixed(1)
  },
  {
    title: 'Reading',
    value: 'reading',
    getScore: (scores: any) => scores.reading.toFixed(1)
  },
  {
    title: 'Writing',
    value: 'writing',
    getScore: (scores: any) => scores.writing.toFixed(1)
  },
  {
    title: 'Speaking',
    value: 'speaking',
    getScore: (scores: any) => scores.speaking.toFixed(1)
  },
  {
    title: 'Overall',
    value: 'overall',
    getScore: (scores: any) =>
      calculateIELTSBand([
        scores.speaking,
        scores.writing,
        scores.reading,
        scores.listening
      ]).toFixed(1)
  }
];

interface Props {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  scores: {
    listening: number;
    reading: number;
    speaking: number;
    writing: number;
  };
}

export const OverallScoresTabs = ({ scores, currentTab, setCurrentTab }: Props) => {
  return (
    <div className='grid grid-cols-5 gap-4'>
      {items.map((item) => (
        <button key={item.title} onClick={() => setCurrentTab(item.value)}>
          <Card
            className={cn(
              'transition-colors',
              currentTab === item.value && 'bg-muted',
              item.value === 'overall' && 'bg-yellow-500/10',
              currentTab === item.value && item.value === 'overall' && 'bg-yellow-500/20'
            )}
          >
            <CardHeader className='space-y-1 p-3 md:space-y-4 md:p-5'>
              <CardTitle className='text-sm md:text-base'>{item.title}</CardTitle>
              <p className='text-center text-3xl font-extrabold md:text-5xl'>
                {item.getScore(scores)}
              </p>
            </CardHeader>
          </Card>
        </button>
      ))}
    </div>
  );
};
