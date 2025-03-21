import { format } from 'date-fns';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui';

import { useBookExamForm } from './hooks';

interface Props {
  exam: Exam;
}

export const BookExamForm = ({ exam }: Props) => {
  const { form, state, functions } = useBookExamForm(exam);
  const selectedTime = exam.speakingTimes.find(
    (speakingTime) => speakingTime.id === +form.watch('speakingTimeId')
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(functions.onSubmit)}>
        <h2 className='text-2xl font-bold'>Confirm your Speaking test</h2>
        <p className='mb-2 text-muted-foreground'>
          Select continue to reserve, or select a new time.
        </p>
        <Card className='flex items-center justify-between'>
          <CardHeader>
            <CardTitle>{selectedTime && format(selectedTime.time, 'p')}</CardTitle>
            <CardDescription>
              {selectedTime && format(selectedTime.time, 'EEEE, dd MMMM')}
            </CardDescription>
          </CardHeader>
          <CardContent className='p-5'>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select' {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        {exam.speakingTimes.map((speakingTime) => (
                          <SelectItem key={speakingTime.id} value={String(speakingTime.id)}>
                            {format(speakingTime.time, 'dd MMMM, p')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
              name='speakingTimeId'
              control={form.control}
            />
          </CardContent>
        </Card>
        <div className='mt-8 flex items-center justify-end'>
          <Button type='submit' loading={state.isPending}>
            Book Place
          </Button>
        </div>
      </form>
    </Form>
  );
};
