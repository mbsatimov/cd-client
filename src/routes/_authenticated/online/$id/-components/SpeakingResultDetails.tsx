import { Card, CardContent, CardHeader } from '@/components/ui';
import { feedbacks } from '@/utils/constants';

interface Props {
  speaking: CDResultResponse['speakingResult'];
}

export const SpeakingResultDetails = ({ speaking }: Props) => {
  return (
    <Card>
      <CardHeader className='space-y-3'>
        <p>
          <span className='text-muted-foreground'>Overall score: </span>
          {speaking.overallScore.toFixed(1)}
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <ul className='ml-4 list-outside list-disc space-y-4'>
          <li className='space-y-2'>
            <span className='text-lg font-medium'>
              Fluency & Coherence (Score: {speaking.part1.toFixed(1)})
            </span>
            <p>
              <span className='text-muted-foreground'>Feedback: </span>
              {feedbacks.speaking.part1[speaking.part1].feedback}
            </p>
            <p>
              <span className='text-muted-foreground'>Suggestions: </span>
              {feedbacks.speaking.part1[speaking.part1].suggestion}
            </p>
          </li>
          <li className='space-y-2'>
            <span className='text-lg font-medium'>
              Lexical Resource (Score: {speaking.part2.toFixed(1)})
            </span>
            <p>
              <span className='text-muted-foreground'>Feedback: </span>
              {feedbacks.speaking.part2[speaking.part2].feedback}
            </p>
            <p>
              <span className='text-muted-foreground'>Suggestions: </span>
              {feedbacks.speaking.part2[speaking.part2].suggestion}
            </p>
          </li>
          <li className='space-y-2'>
            <span className='text-lg font-medium'>
              Grammatical Range & Accuracy (Score: {speaking.part3.toFixed(1)})
            </span>
            <p>
              <span className='text-muted-foreground'>Feedback: </span>
              {feedbacks.speaking.part3[speaking.part3].feedback}
            </p>
            <p>
              <span className='text-muted-foreground'>Suggestions: </span>
              {feedbacks.speaking.part3[speaking.part3].suggestion}
            </p>
          </li>
          <li className='space-y-2'>
            <span className='text-lg font-medium'>
              Pronunciation (Score: {speaking.part4.toFixed(1)})
            </span>
            <p>
              <span className='text-muted-foreground'>Feedback: </span>
              {feedbacks.speaking.part4[speaking.part4].feedback}
            </p>
            <p>
              <span className='text-muted-foreground'>Suggestions: </span>
              {feedbacks.speaking.part4[speaking.part4].suggestion}
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
