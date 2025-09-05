import { createFileRoute, Link } from '@tanstack/react-router';

import { FormBuilder } from '@/components/FormBuilderPreview';
import { BaseLayout } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import { getPlacementTestsById } from '@/utils/api/requests';

import { PlacementResults } from './-components/PlacementResults';
import { usePlacementTaker } from './-hooks/usePlacementTaker';

const RouteComponent = () => {
  const { state, functions } = usePlacementTaker();

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950'>
      <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm'>
        <div className='flex items-center gap-2'>
          <div className='flex h-9 items-center rounded-md bg-primary px-3 text-sm font-bold text-primary-foreground'>
            Level: {state.currentQuestion.level}
          </div>
        </div>

        <div>
          <img alt='logo' className='h-8' src='/logo.png' />
        </div>

        {state.questionResults ? (
          state.isCompleted || !state.questionResults.isPassed ? (
            <Button asChild variant='outline'>
              <Link to='/placements'>Back to Assessments</Link>
            </Button>
          ) : (
            <Button className='bg-green-600 hover:bg-green-700' onClick={functions.onNextQuestion}>
              Next Question
            </Button>
          )
        ) : (
          <Button loading={state.isResultCheckPending} onClick={functions.onSubmitQuestion}>
            Check Answers
          </Button>
        )}
      </header>

      <BaseLayout className='max-w-4xl py-8'>
        <div className='space-y-8'>
          {state.questionResults ? (
            <PlacementResults
              currentLevel={state.currentQuestion.level}
              currentStep={state.currentStep}
              isPassed={state.questionResults.isPassed}
              numberOfCorrectAnswers={state.questionResults.numberOfCorrectAnswers}
              numberOfQuestions={state.questionResults.numberOfQuestions}
              onContinue={functions.onNextQuestion}
              passingScore={state.questionResults.passingScore}
              totalSteps={state.questions.length}
            />
          ) : state.openSkipQuestion ? (
            <div className='rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900'>
              <h1 className='mb-4 flex items-center gap-2 text-xl font-semibold'>
                {state.currentQuestion.title} <Badge variant='success'>Skip Question</Badge>
              </h1>
              <FormBuilder
                answers={state.answers}
                setAnswer={functions.onAnswerChange}
                questions={state.currentQuestion.skipQuestion.content}
              />
            </div>
          ) : (
            <div className='rounded-lg border bg-white p-4 shadow-sm dark:bg-slate-900'>
              <h1 className='mb-4 text-xl font-semibold'>{state.currentQuestion.title}</h1>
              <FormBuilder
                answers={state.answers}
                setAnswer={functions.onAnswerChange}
                questions={state.currentQuestion.question.content}
              />
            </div>
          )}
        </div>
      </BaseLayout>
    </div>
  );
};

export const Route = createFileRoute('/placements/$id/test-taker/$takerId/')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.prefetchQuery({
      queryKey: ['placement', id],
      queryFn: () => getPlacementTestsById({ id })
    })
});
