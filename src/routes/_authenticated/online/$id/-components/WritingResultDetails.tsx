import { EditorPreview } from '@/components/editor';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui';
import { feedbacks } from '@/utils/constants';

interface Props {
  writing: CDResultResponse['writingResult'];
}

export const WritingResultDetails = ({ writing }: Props) => {
  return (
    <>
      <Card>
        <CardHeader className='flex flex-row justify-between space-y-0'>
          <div>
            <CardTitle>Task One</CardTitle>
            <div>
              <span className='text-muted-foreground'>Task one score: </span>
              {writing.task1OverallScore.toFixed(1)}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm'>See your answer</Button>
            </DialogTrigger>
            <DialogContent className='w-full max-w-[1400px]'>
              <DialogTitle className='sr-only'>Writing Task 1</DialogTitle>
              <div className='h-[min(80vh,900px)] overflow-y-auto'>
                <div className='grid h-full divide-y md:grid-cols-2 md:divide-x md:divide-y-0'>
                  <div className='overflow-y-auto md:pr-5'>
                    <EditorPreview>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: writing.question.parts[0].question.content
                        }}
                      />
                    </EditorPreview>
                  </div>
                  <div className='overflow-y-auto md:pl-5'>
                    <p className='mb-3 font-semibold'>Your answer:</p>
                    <div className='whitespace-pre-wrap break-words'>{writing.answers[1]}</div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
        <CardHeader className='flex flex-row justify-between space-y-0'>
          <div>
            <CardTitle>Task Two</CardTitle>
            <div>
              <span className='text-muted-foreground'>Task two score: </span>
              {writing.task2OverallScore.toFixed(1)}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm'>See your answer</Button>
            </DialogTrigger>
            <DialogContent className='w-full max-w-[1400px]'>
              <DialogTitle className='sr-only'>Writing Task 2</DialogTitle>
              <div className='h-[min(80vh,900px)] overflow-y-auto'>
                <div className='grid h-full divide-y md:grid-cols-2 md:divide-x md:divide-y-0'>
                  <div className='overflow-y-auto md:pr-5'>
                    <EditorPreview>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: writing.question.parts[1].question.content
                        }}
                      />
                    </EditorPreview>
                  </div>
                  <div className='overflow-y-auto md:pl-5'>
                    <p className='mb-3 font-semibold'>Your answer:</p>
                    <div className='whitespace-pre-wrap break-words'>{writing.answers[2]}</div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
