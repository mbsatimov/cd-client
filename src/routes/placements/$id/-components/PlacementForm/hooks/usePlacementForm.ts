import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { getPlacementTestByLeadId } from '@/utils/api/requests';

import { placementFormSchema, type PlacementFormSchema } from '../constants';

export const usePlacementForm = () => {
  const { id } = useParams({ from: '/placements/$id/' });
  const form = useForm<PlacementFormSchema>({
    resolver: zodResolver(placementFormSchema),
    defaultValues: {
      leadId: ''
    }
  });

  const router = useRouter();
  const postPlacementTestTakerMutation = useMutation({
    mutationFn: getPlacementTestByLeadId,
    onSuccess: ({ data }) => {
      router.navigate({
        to: '/placements/$id/test-taker/$takerId',
        params: { id, takerId: String(data) }
      });
    }
  });

  const onSubmit = (data: PlacementFormSchema) => {
    postPlacementTestTakerMutation.mutate({ id: data.leadId });
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
