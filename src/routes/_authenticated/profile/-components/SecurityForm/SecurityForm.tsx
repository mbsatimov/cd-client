import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  PasswordInput
} from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';

import { useSecurityForm } from './hooks';

export const SecurityForm = () => {
  const { form, state, functions } = useSecurityForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(functions.onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='password'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='passwordConfirm'
              control={form.control}
            />
          </CardContent>
          <CardFooter className='border-t px-5 py-3'>
            <Button type='submit' loading={state.isPending}>
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
