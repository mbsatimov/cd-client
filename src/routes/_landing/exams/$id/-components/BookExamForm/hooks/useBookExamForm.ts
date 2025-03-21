import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { postRegistration } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

import type { BookExamFormSchema } from '../constants';

import { bookExamFormSchema } from '../constants';

export const useBookExamForm = (exam: Exam) => {
  const router = useRouter();
  const authStore = useAuth();

  const form = useForm<BookExamFormSchema>({
    resolver: zodResolver(bookExamFormSchema),
    defaultValues: {
      speakingTimeId: String(exam.speakingTimes[0]?.id)
    }
  });

  const postRegistrationMutation = useMutation({
    mutationFn: postRegistration,
    onSuccess: () => {
      router.navigate({ to: '/bookings' });
    }
  });

  const onSubmit = (data: BookExamFormSchema) => {
    if (!authStore.user) {
      router.navigate({ to: '/login' });
      return;
    }

    postRegistrationMutation.mutate({
      data: {
        isStudent: false,
        speakingTimeId: +data.speakingTimeId
      },
      config: { params: { examId: exam.id } }
    });
  };

  return {
    form,
    state: {
      isPending: postRegistrationMutation.isPending,
      isSuccess: postRegistrationMutation.isSuccess
    },
    functions: { onSubmit }
  };
};
