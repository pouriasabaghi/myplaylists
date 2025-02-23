import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async (user) => {
      await queryClient.invalidateQueries(['user']);
      navigate(-1, { replace: true });
    },
    onError: (err) => {
      console.error('ERROR', err);
      toast.error(err.response.data.message);
    },
  });

  return { login, isPending };
}
