import { format } from 'date-fns';
import React from 'react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
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
  const [accepted, setAccepted] = React.useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(functions.onSubmit)}>
        <h2 className='text-xl font-bold sm:text-2xl'>Confirm your Speaking test</h2>
        <p className='mb-2 text-muted-foreground'>
          Select continue to reserve, or select a new time. Your speaking test will be held at the
          same venue. You will take it either before or after your main test.
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
                  <FormMessage />
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
              {exam.price !== exam.priceForOurStudents && (
                <Badge className='bg-yellow-500 text-sm hover:bg-yellow-500/80'>
                  For our students {formatPrice(exam.priceForOurStudents)}
                </Badge>
              )}
            </div>
          </CardHeader>
          <div className='flex items-center gap-3 p-4'>
            <Checkbox checked={accepted} onCheckedChange={(checked) => setAccepted(!!checked)} />
            <span className='text-muted-foreground'>
              I have read and agree to the{' '}
              <Dialog>
                <DialogTrigger className='underline' type='button'>
                  Terms and Conditions
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                  </DialogHeader>
                  <div className='space-y-3 text-sm text-muted-foreground'>
                    <p>
                      Once you choose your main exam and speaking test time, you cannot change them
                      under any circumstances.
                    </p>
                    <p>
                      If you are unable to attend the exam after making payment, your mock test will
                      not be transferred or refunded. Please arrive on time for both your main exam
                      and speaking test.
                    </p>
                    <p>
                      If you are late or miss your scheduled time, you will not be allowed to take
                      the test, and it cannot be rescheduled or transferred.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </span>
          </div>
          <CardContent className='space-y-2 sm:p-5'>
            <div className='flex items-center justify-end'>
              <Button
                className='w-full sm:w-fit'
                disabled={exam.speakingTimes.length === 0 || !accepted}
                type='submit'
                loading={state.isPending}
              >
                Book Place
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
