import {
  Button,
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
import { feedbacks } from '@/utils/constants';

interface Props {
  listening: PaperResultResponse['listeningResult'];
}

export const ListeningResultDetails = ({ listening }: Props) => {
  const correctAnswers = listening.part1 + listening.part2 + listening.part3 + listening.part4;

  return (
    <>
      <Card>
        <CardHeader className='flex-row flex-wrap gap-6 space-y-0 md:gap-8'>
          <div>
            <span className='text-muted-foreground'>Listening score: </span>
            {listening.overallScore?.toFixed(1)}
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-4 rounded-[5px] bg-green-500' />
            <span className='text-muted-foreground'>Correct answers: </span>
            {correctAnswers}
          </div>
          <div className='flex items-center gap-2'>
            <span className='size-4 rounded-[5px] bg-red-500' />
            <span className='text-muted-foreground'>Incorrect answers: </span>
            {40 - correctAnswers}
          </div>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm'>See exam files</Button>
            </DialogTrigger>
            <DialogContent className='w-[400px]'>
              <DialogHeader>
                <DialogTitle>Exam files</DialogTitle>
              </DialogHeader>
              <ul className='space-y-4'>
                {listening.files.map((file) => (
                  <li key={file.id}>
                    <a
                      href={file.url}
                      className='flex items-center gap-2 rounded-md border p-1 transition-colors hover:bg-secondary/50'
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      <div className='shrink-0 rounded-sm p-1'>
                        <img
                          alt={file.fileName}
                          className='size-10 rounded-sm bg-muted object-contain'
                          src='/favicon.png'
                        />
                      </div>
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>{file.fileName}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              {listening.files.length === 0 && (
                <p className='my-10 text-center text-muted-foreground'>No files found</p>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle>Part One</CardTitle>
          <div className='flex flex-row flex-wrap gap-6 md:gap-8'>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-green-500' />
              <span className='text-muted-foreground'>Correct answers: </span>
              {listening.part1}
            </div>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-red-500' />
              <span className='text-muted-foreground'>Incorrect answers: </span>
              {10 - listening.part1}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            <span className='text-muted-foreground'>Feedback: </span>
            {feedbacks.listening.part1[listening.part1].feedback}
          </p>
          <p>
            <span className='text-muted-foreground'>Suggestions: </span>
            <ul className='ml-4 list-outside list-disc space-y-2'>
              {feedbacks.listening.part1[listening.part1].suggestions.map((suggestion) => (
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
              {listening.part2}
            </div>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-red-500' />
              <span className='text-muted-foreground'>Incorrect answers: </span>
              {10 - listening.part2}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            <span className='text-muted-foreground'>Feedback: </span>
            {feedbacks.listening.part2[listening.part2].feedback}
          </p>
          <p>
            <span className='text-muted-foreground'>Suggestions: </span>
            <ul className='ml-4 list-outside list-disc space-y-2'>
              {feedbacks.listening.part2[listening.part2].suggestions.map((suggestion) => (
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
              {listening.part3}
            </div>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-red-500' />
              <span className='text-muted-foreground'>Incorrect answers: </span>
              {10 - listening.part3}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            <span className='text-muted-foreground'>Feedback: </span>
            {feedbacks.listening.part3[listening.part3].feedback}
          </p>
          <p>
            <span className='text-muted-foreground'>Suggestions: </span>
            <ul className='ml-4 list-outside list-disc space-y-2'>
              {feedbacks.listening.part3[listening.part3].suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle>Part Four</CardTitle>
          <div className='flex flex-row flex-wrap gap-6 md:gap-8'>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-green-500' />
              <span className='text-muted-foreground'>Correct answers: </span>
              {listening.part4}
            </div>
            <div className='flex items-center gap-2'>
              <span className='size-4 rounded-[5px] bg-red-500' />
              <span className='text-muted-foreground'>Incorrect answers: </span>
              {10 - listening.part4}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            <span className='text-muted-foreground'>Feedback: </span>
            {feedbacks.listening.part4[listening.part4].feedback}
          </p>
          <p>
            <span className='text-muted-foreground'>Suggestions: </span>
            <ul className='ml-4 list-outside list-disc space-y-2'>
              {feedbacks.listening.part4[listening.part4].suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          </p>
        </CardContent>
      </Card>
    </>
  );
};
