import { Link } from '@tanstack/react-router';
import { Award, BookOpen, CheckCircle, GraduationCap, XCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { cn } from '@/lib/utils.ts';

import { getLevelDescription } from '../-constants/levelDescriptions.ts';

interface Props {
  currentLevel: PlacementQuestionLevel;
  currentStep: number;
  isPassed: boolean;
  numberOfCorrectAnswers: number;
  numberOfQuestions: number;
  passingScore: number;
  totalSteps: number;
  onContinue?: () => void;
}

export const PlacementResults = ({
  currentLevel,
  isPassed,
  numberOfCorrectAnswers,
  numberOfQuestions,
  passingScore,
  currentStep,
  totalSteps,
  onContinue
}: Props) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [showLevelDialog, setShowLevelDialog] = useState(false);
  const scorePercentage = Math.round((numberOfCorrectAnswers / numberOfQuestions) * 100);
  const passingPercentage = Math.round((passingScore / numberOfQuestions) * 100);

  // Determine student level based on performance and progress
  const studentLevelInfo = getLevelDescription(currentLevel);

  // Simulate progress animation
  useState(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <Card className='mx-auto w-full max-w-md shadow-lg'>
        <CardHeader
          className={cn(
            'pb-4 text-center',
            isPassed
              ? 'border-green-100 dark:border-green-900'
              : 'border-red-100 dark:border-red-900'
          )}
        >
          {/* Assessment Progress Indicator */}
          <div className='mb-6'>
            <div className='mb-2 flex justify-between text-sm text-muted-foreground'>
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span className='font-medium'>Level: {currentLevel}</span>
            </div>
            <div className='relative pt-1'>
              <div className='mb-2 flex items-center justify-between'>
                <div className='flex space-x-1'>
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300',
                        i < currentStep - 1
                          ? 'border-green-200 bg-green-500 text-white'
                          : i === currentStep - 1
                            ? isPassed
                              ? 'border-green-200 bg-green-500 text-white'
                              : 'border-red-200 bg-red-500 text-white'
                            : 'border-muted-foreground/20 bg-muted text-muted-foreground'
                      )}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <Progress
                className={cn(
                  'h-2 rounded-full transition-all duration-1000',
                  isPassed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                )}
                value={(currentStep / totalSteps) * 100}
                indicatorClassName={cn(
                  'rounded-full transition-all',
                  isPassed ? 'bg-green-500' : 'bg-red-500'
                )}
              />
            </div>
          </div>

          <div className='mb-4 flex justify-center'>
            <div
              className={cn(
                'flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500',
                isPassed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
              )}
            >
              {isPassed ? (
                <CheckCircle className='h-10 w-10 text-green-500' />
              ) : (
                <XCircle className='h-10 w-10 text-red-500' />
              )}
            </div>
          </div>
          <CardTitle className='text-2xl font-bold'>
            {isPassed ? 'Great Job!' : 'Not Quite There'}
          </CardTitle>
          <CardDescription className='text-lg'>
            {isPassed
              ? "You've successfully passed this question."
              : "You didn't meet the passing threshold for this question."}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6 pt-6'>
          <div className='space-y-2'>
            <div className='flex justify-between text-sm'>
              <span>Your Score</span>
              <span className='font-medium'>{scorePercentage}%</span>
            </div>
            <Progress
              className={cn(
                'h-3 rounded-full transition-all duration-1000',
                isPassed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
              )}
              value={isAnimating ? 0 : scorePercentage}
              indicatorClassName={cn(
                'rounded-full transition-all',
                isPassed ? 'bg-green-500' : 'bg-red-500'
              )}
            />
          </div>

          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Results Breakdown</span>
              <span className='text-xs text-muted-foreground'>
                Passing score: {passingPercentage}%
              </span>
            </div>

            <div className='space-y-2 rounded-lg bg-muted/50 p-4 shadow-sm'>
              <div className='flex justify-between'>
                <span>Correct Answers</span>
                <span className='font-medium'>{numberOfCorrectAnswers}</span>
              </div>
              <div className='flex justify-between'>
                <span>Total Questions</span>
                <span className='font-medium'>{numberOfQuestions}</span>
              </div>
              <div className='flex justify-between border-t pt-2'>
                <span className='font-medium'>Final Score</span>
                <span className={cn('font-bold', isPassed ? 'text-green-500' : 'text-red-500')}>
                  {numberOfCorrectAnswers}/{numberOfQuestions}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex gap-2 pt-2'>
          {!isPassed || currentStep === totalSteps ? (
            <>
              <Button className='flex-1' variant='outline' onClick={() => setShowLevelDialog(true)}>
                <Award className='mr-2 h-4 w-4' />
                Show My Level
              </Button>
              <Button asChild className='flex-1' variant='secondary'>
                <Link to='/placement'>Back Home</Link>
              </Button>
            </>
          ) : (
            <Button
              className={cn('flex-1', 'bg-green-600 hover:bg-green-700')}
              onClick={onContinue}
            >
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Level Determination Dialog */}
      <Dialog onOpenChange={setShowLevelDialog} open={showLevelDialog}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-center text-xl'>Your Placement Level</DialogTitle>
            <DialogDescription className='text-center'>
              Based on your assessment performance
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col items-center py-6'>
            <div className='mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10'>
              <Award className='h-12 w-12 text-primary' />
            </div>
            <h3 className='text-center text-2xl font-bold'>{studentLevelInfo.title}</h3>
            <p className='mt-2 text-center text-muted-foreground'>{studentLevelInfo.description}</p>

            <div className='mt-6 w-full space-y-4'>
              {studentLevelInfo.skills.length !== 0 && (
                <div className='rounded-lg bg-muted/50 p-4'>
                  <h4 className='mb-2 flex items-center gap-2 font-medium'>
                    <GraduationCap className='h-4 w-4' />
                    Key Skills at This Level:
                  </h4>
                  <ul className='ml-5 list-disc space-y-1 text-sm text-muted-foreground'>
                    {studentLevelInfo.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className='rounded-lg bg-muted/50 p-4'>
                <h4 className='mb-2 flex items-center gap-2 font-medium'>
                  <BookOpen className='h-4 w-4' />
                  Next Steps:
                </h4>
                <p className='text-sm text-muted-foreground'>{studentLevelInfo.nextSteps}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button asChild className='w-full'>
              <Link to='/placement'>Back Home</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
