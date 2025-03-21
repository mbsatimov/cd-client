import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface Props {
  scores: {
    listening: number;
    reading: number;
    speaking: number;
    writing: number;
  };
}

export const OverallScores = ({ scores }: Props) => {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5'>
      <Card className='sm:col-span-2 lg:col-span-1'>
        <CardHeader>
          <CardTitle className='text-base'>Overall</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center text-5xl font-extrabold'>{5.5}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Listening</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center text-5xl font-extrabold'>{scores.listening.toFixed(1)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center text-5xl font-extrabold'>{scores.reading.toFixed(1)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Writing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center text-5xl font-extrabold'>{scores.writing.toFixed(1)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Speaking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-center text-5xl font-extrabold'>{scores.speaking.toFixed(1)}</p>
        </CardContent>
      </Card>
    </div>
  );
};
