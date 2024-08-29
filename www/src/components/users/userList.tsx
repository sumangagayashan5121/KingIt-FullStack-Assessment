import { useState, useEffect } from 'react';

import { Button } from '../ui/button';
import useGetUsers from '@/hooks/useGetAllUsers';
import { DataTable } from '../ui/table/dataTable';
import { UserColumns } from './components/userColumns';
import { useAppSelector } from '@/redux/hooks';
import { Loader } from '../common/loading';
import { ErrorComponent } from '../common/error';

export function UserList() {
  const [page, setPage] = useState<number>(1);
  const [pointChanges, setPointChanges] = useState<Record<number, number>>({});
  const { data, isLoading, isError } = useGetUsers({
    page,
    pageSize: 10,
  });

  const prevRecord = useAppSelector((state) => state.user);  

  useEffect(() => {
    if (data?.list && prevRecord) {
      const changes = data.list.reduce((acc: Record<number, number>, user) => {
        if (user.id === prevRecord.id) {
          acc[user.id] = user.points - prevRecord.points;
        }
        return acc;
      }, {});
      setPointChanges(changes);
    }
  }, [data, prevRecord]);

  const handlePageChange = (direction: 'previous' | 'next') => {
    setPage(prevPage => {
      if (direction === 'previous' && prevPage > 1) return prevPage - 1;
      if (direction === 'next') return prevPage + 1;
      return prevPage;
    });
  };

  if (isLoading) return <Loader />;

  if (isError) return <ErrorComponent />;

  return (
    <div className=''>
      <DataTable
        columns={UserColumns({
          newRank: prevRecord.newRank,
          prevRank: prevRecord.rank,
          userId: prevRecord.id,
          pointChanges,
        })}
        data={data?.list}
      />

      <div className='items-center space-x-2 flex justify-end mt-3'>
        <Button
          size={'sm'}
          className='w-[100px]'
          onClick={() => handlePageChange('previous')}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          size={'sm'}
          className='w-[100px]'
          onClick={() => handlePageChange('next')}
          disabled={page === data?.pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
