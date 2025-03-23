import { format } from 'date-fns';

import {
  Badge,
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
import { formatPrice } from '@/lib/utils.ts';

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
        <h2 className='text-xl font-bold sm:text-2xl'>Confirm your Speaking test</h2>
        <p className='mb-2 text-muted-foreground'>
          Select continue to reserve, or select a new time.
        </p>
        <Card className='flex flex-col justify-between sm:flex-row sm:items-center'>
          <CardHeader>
            <CardTitle>{selectedTime && format(selectedTime.time, 'p')}</CardTitle>
            <CardDescription>
              {selectedTime && format(selectedTime.time, 'EEEE, dd MMMM')}
            </CardDescription>
          </CardHeader>
          <CardContent className='sm:p-5'>
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

        <h2 className='mt-8 text-xl font-bold sm:text-2xl'>Price</h2>
        <p className='mb-2 text-muted-foreground'>
          For IELTS ZONE students we usually offer special discounts.
        </p>
        <Card className='flex flex-col justify-between sm:flex-row sm:items-center'>
          <CardHeader>
            <div className='items-center space-y-2'>
              <div className='text-lg font-semibold'>{formatPrice(exam.price)}</div>
              <Badge className='bg-yellow-500 text-sm hover:bg-yellow-500/80'>
                For our students {formatPrice(exam.priceForOurStudents)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className='sm:p-5'>
            <div className='flex items-center justify-end'>
              <Button className='w-full sm:w-fit' type='submit' loading={state.isPending}>
                Book Place
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
