import { CircularProgress } from '@mui/material';

export function Loader() {
  return (
    <div className='flex items-center justify-center h-[100px]'>
      <CircularProgress color='primary' />
    </div>
  );
}
