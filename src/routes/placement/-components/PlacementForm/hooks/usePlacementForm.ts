import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { postPlacementTestTakerByLeadId } from '@/utils/api/requests';

import { placementFormSchema, type PlacementFormSchema } from '../constants';

export const usePlacementForm = () => {
  const form = useForm<PlacementFormSchema>({
    resolver: zodResolver(placementFormSchema),
    defaultValues: {
      leadId: ''
    }
  });

  const router = useRouter();
  const postPlacementTestTakerMutation = useMutation({
    mutationFn: postPlacementTestTakerByLeadId,
    onSuccess: () =>
      router.navigate({
        to: '/placement/$id',
        params: { id: form.watch().leadId }
      })
  });

  const onSubmit = (data: PlacementFormSchema) => {
    postPlacementTestTakerMutation.mutate({ config: { params: { leadId: data.leadId } } });
  };

  return {
    form,
    state: {
      isPending: postPlacementTestTakerMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
