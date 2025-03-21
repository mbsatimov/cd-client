import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';
import { cn } from '@/lib/utils.ts';

interface Props {
  listening: CDResultResponse['listeningResult'];
}

export const ListeningAnswersTable = ({ listening }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listening score: {listening.overallScore?.toFixed(1)}</CardTitle>
      </CardHeader>
      <CardContent>
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
            {listening.answers.map(({ userAnswer, correctAnswer, isCorrect }, i) => (
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
      </CardContent>
    </Card>
  );
};
