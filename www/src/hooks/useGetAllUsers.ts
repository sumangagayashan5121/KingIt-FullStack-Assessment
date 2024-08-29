import { useQuery } from '@tanstack/react-query';

import {
  IPaginatedResponse,
  IPaginationRequest,
} from '@/models/Pagination.model';
import { IResponse } from '@/models/Response.model';
import { IUser } from '@/models/User.model';

const useGetUsers = (
  paginationRequest: IPaginationRequest,
  staleTime = 15 * 60 * 1000
) => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_API_URL as string;
  const VERSION = import.meta.env.VITE_API_VERSION as string;

  const fetchUsers = async () => {
    const queryParams = new URLSearchParams();
    if (paginationRequest.page) queryParams.append('page', paginationRequest.page.toString());
    if (paginationRequest.pageSize) queryParams.append('pageSize', paginationRequest.pageSize.toString());

    const response = await fetch(`${VITE_BASE_URL}/${VERSION}/users?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: IResponse<IPaginatedResponse<IUser>> = await response.json();
    return data.data;
  };

  return useQuery(
    ['Users', paginationRequest.page, paginationRequest.pageSize],
    fetchUsers,
    {
      staleTime,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Error fetching users:', error);
      },
    }
  );
};

export default useGetUsers;
