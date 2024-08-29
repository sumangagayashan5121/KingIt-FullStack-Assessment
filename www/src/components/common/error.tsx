export function ErrorComponent() {
  return (
    <div className='w-[300px] h-[200px] flex items-center justify-center text-red-600 font-medium flex-col space-y-4 bg-red-50 border border-red-200 rounded-lg shadow-md'>
      <div className='flex items-center justify-center bg-red-100 w-12 h-12 rounded-full'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 text-red-600'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z'></path>
        </svg>
      </div>
      <p className='text-lg font-semibold'>Something went wrong!</p>
      <p className='text-sm text-gray-600'>We couldn't load the content. Please try again later.</p>
    </div>
  );
}
