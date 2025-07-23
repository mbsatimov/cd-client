import { CheckIcon, XIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';
import { feedbacks } from '@/utils/constants';

interface Props {
  reading: CDResultResponse['readingResult'];
}

export const ReadingResultDetails = ({ reading }: Props) => {
  return (
    <>
      <Card>
        <CardHeader className='flex-row flex-wrap gap-6 space-y-0 md:gap-8'>
          <div>
            <span className='text-muted-foreground'>Reading score: </span>
            {reading.overallScore?.toFixed(1)}
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-4 rounded-[5px] bg-green-500' />
            <span className='text-muted-foreground'>Correct answers: </span>
            {reading.correctAnswers}
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-4 rounded-[5px] bg-red-500' />
            <span className='text-muted-foreground'>Incorrect answers: </span>
            {reading.answers.length - reading.correctAnswers}
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-2'>
            {reading.answers.map(({ userAnswer, correctAnswer, number, isCorrect }) => (
              <Dialog key={number}>
                <DialogTrigger className='relative flex items-center justify-center rounded-sm bg-secondary p-3'>
                  <div
                    className={cn(
                      'absolute right-0 top-0 grid size-5 place-content-center rounded-bl-sm rounded-tr-sm',
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    )}
                  >
                    {isCorrect ? (
                      <CheckIcon className='size-4 text-white' />
                    ) : (
                      <XIcon className='size-4 text-white' />
                    )}
                  </div>
                  {number}
                </DialogTrigger>
                <DialogContent className='max-w-[400px]'>
                  <DialogHeader>
                    <DialogTitle>Question {number}</DialogTitle>
                  </DialogHeader>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground'>Your answer: </span>
                    {userAnswer}
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-muted-foreground'>Correct answer: </span>
                    {correctAnswer.join(' | ')}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle>Part One</CardTitle>
          <div className='flex flex-row flex-wrap gap-6 md:gap-8'>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-green-500' />
              <span className='text-muted-foreground'>Correct answers: </span>
              {reading.part1}
            </div>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-red-500' />
              <span className='text-muted-foreground'>Incorrect answers: </span>
              {13 - reading.part1}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            <span className='text-muted-foreground'>Feedback: </span>
            {feedbacks.reading.part1[reading.part1].feedback}
          </p>
          <p>
            <span className='text-muted-foreground'>Suggestions: </span>
            <ul className='ml-4 list-outside list-disc space-y-2'>
              {feedbacks.reading.part1[reading.part1].suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle>Part Two</CardTitle>
          <div className='flex flex-row flex-wrap gap-6 md:gap-8'>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-green-500' />
              <span className='text-muted-foreground'>Correct answers: </span>
              {reading.part2}
            </div>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-red-500' />
              <span className='text-muted-foreground'>Incorrect answers: </span>
              {13 - reading.part2}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            <span className='text-muted-foreground'>Feedback: </span>
            {feedbacks.reading.part2[reading.part2].feedback}
          </p>
          <p>
            <span className='text-muted-foreground'>Suggestions: </span>
            <ul className='ml-4 list-outside list-disc space-y-2'>
              {feedbacks.reading.part2[reading.part2].suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle>Part Three</CardTitle>
          <div className='flex flex-row flex-wrap gap-6 md:gap-8'>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-green-500' />
              <span className='text-muted-foreground'>Correct answers: </span>
              {reading.part3}
            </div>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-red-500' />
              <span className='text-muted-foreground'>Incorrect answers: </span>
              {14 - reading.part3}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            <span className='text-muted-foreground'>Feedback: </span>
            {feedbacks.reading.part3[reading.part3].feedback}
          </p>
          <p>
            <span className='text-muted-foreground'>Suggestions: </span>
            <ul className='ml-4 list-outside list-disc space-y-2'>
              {feedbacks.reading.part3[reading.part3].suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </p>
        </CardContent>
      </Card>
    </>
  );
};
