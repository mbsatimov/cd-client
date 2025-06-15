import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';

interface Props {
  answers?: CDResult;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResultsDialog = ({ answers, open, onOpenChange }: Props) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className='h-[80vh] max-w-[90vw]'>
        <DialogHeader>
          <DialogTitle>Mock Results</DialogTitle>
        </DialogHeader>
        <h2 className='text-lg font-semibold'>Listening Answers</h2>
        {!answers && <Skeleton className='h-5 w-full' />}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[60px]'>No.</TableHead>
              <TableHead>User answer</TableHead>
              <TableHead>True answer</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {answers?.listeningResult.answers.map(({ userAnswer, correctAnswer, isCorrect }, i) => (
              <TableRow
                key={i}
                className={cn(
                  isCorrect
                    ? 'bg-green-500/10 hover:bg-green-500/20'
                    : 'bg-red-500/10 hover:bg-red-500/20'
                )}
              >
                <TableCell className='font-medium'>{i + 1}</TableCell>
                <TableCell>{userAnswer}</TableCell>
                <TableCell>{correctAnswer.join(', ')}</TableCell>
                <TableCell>{isCorrect ? 'Right' : 'Wrong'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h2 className='text-lg font-semibold'>Reading Answers</h2>
        {!answers && <Skeleton className='h-5 w-full' />}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[60px]'>No.</TableHead>
              <TableHead>User answer</TableHead>
              <TableHead>True answer</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {answers?.readingResult.answers.map(({ userAnswer, correctAnswer, isCorrect }, i) => (
              <TableRow
                key={i}
                className={cn(
                  isCorrect
                    ? 'bg-green-500/10 hover:bg-green-500/20'
                    : 'bg-red-500/10 hover:bg-red-500/20'
                )}
              >
                <TableCell className='font-medium'>{i + 1}</TableCell>
                <TableCell>{userAnswer}</TableCell>
                <TableCell>{correctAnswer.join(', ')}</TableCell>
                <TableCell>{isCorrect ? 'Right' : 'Wrong'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};
