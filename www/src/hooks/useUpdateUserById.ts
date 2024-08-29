import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IResponse } from '@/models/Response.model';

const updatePoints = async ({
  userId,
  points,
}: {
  userId: number;
  points: number;
}): Promise<boolean> => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_API_URL as string;
  const VERSION = import.meta.env.VITE_API_VERSION as string;

  const response = await fetch(`${VITE_BASE_URL}/${VERSION}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ points }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update points');
  }

  const data: IResponse<boolean> = await response.json();
  return data.data;
};

export const useUpdatePoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePoints,
    onSuccess: () => {
      // Invalidating queries with 'Users' to ensure data is up-to-date
      queryClient.invalidateQueries(['Users']);
    },
    onError: (error: Error) => {
      console.error('Error updating points:', error.message);
    },
  });
};
