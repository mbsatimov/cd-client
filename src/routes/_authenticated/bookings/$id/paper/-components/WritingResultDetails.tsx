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
  writing: PaperResultResponse['writingResult'];
}

export const WritingResultDetails = ({ writing }: Props) => {
  return (
    <>
      <Card>
        <CardHeader className='flex-row flex-wrap gap-6 space-y-0 md:gap-8'>
          <div>
            <span className='text-muted-foreground'>Reading score: </span>
            {writing.overallScore?.toFixed(1)}
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
                {writing.files.map((file) => (
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
                          src='/logo.png'
                        />
                      </div>
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>{file.fileName}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              {writing.files.length === 0 && (
                <p className='my-10 text-center text-muted-foreground'>No files found</p>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle>Task One</CardTitle>
          <div>
            <span className='text-muted-foreground'>Task one score: </span>
            {writing.task1OverallScore.toFixed(1)}
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ul className='ml-4 list-outside list-disc space-y-4'>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Task Achievement (Score: {writing.part1.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part1[writing.part1].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part1[writing.part1].suggestion}
              </p>
            </li>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Coherence & Cohesion (Score: {writing.part2.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part2[writing.part2].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part2[writing.part2].suggestion}
              </p>
            </li>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Lexical Resource (Score: {writing.part3.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part3[writing.part3].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part3[writing.part3].suggestion}
              </p>
            </li>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Grammatical Range & Accuracy (Score: {writing.part4.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part4[writing.part4].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part4[writing.part4].suggestion}
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='space-y-3'>
          <CardTitle>Task Two</CardTitle>
          <div>
            <span className='text-muted-foreground'>Task two score: </span>
            {writing.task2OverallScore.toFixed(1)}
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ul className='ml-4 list-outside list-disc space-y-4'>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Task Response (Score: {writing.part5.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part5[writing.part5].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part5[writing.part5].suggestion}
              </p>
            </li>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Coherence & Cohesion (Score: {writing.part6.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part6[writing.part6].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part6[writing.part6].suggestion}
              </p>
            </li>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Lexical Resource (Score: {writing.part7.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part7[writing.part7].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part7[writing.part7].suggestion}
              </p>
            </li>
            <li className='space-y-2'>
              <span className='text-lg font-medium'>
                Grammatical Range & Accuracy (Score: {writing.part8.toFixed(1)})
              </span>
              <p>
                <span className='text-muted-foreground'>Feedback: </span>
                {feedbacks.writing.part8[writing.part8].feedback}
              </p>
              <p>
                <span className='text-muted-foreground'>Suggestions: </span>
                {feedbacks.writing.part8[writing.part8].suggestion}
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};
