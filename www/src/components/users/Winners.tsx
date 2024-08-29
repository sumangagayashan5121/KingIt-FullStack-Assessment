import CustomAvatar from './components/avatar';
import useGetUsers from '@/hooks/useGetAllUsers';
import { Loader } from '../common/loading';

export function Winners() {
  const fetchUserData = useGetUsers({ page: 1, pageSize: 3 });

  const { data: userRankingData, isLoading, isError } = fetchUserData;

  if (isLoading) return <Loader />;

  if (isError) return <div>Error: Unable to load data.</div>;

  // Map user data and assign positions
  const usersWithPosition = userRankingData?.list?.map((user, index) => ({
    position: index + 1,
    ...user,
  }));

  // Reorder users: 2nd place, 1st place, 3rd place
  const reorderUsers = (users) => {
    if (users.length < 3) return users;
    return [users[1], users[0], users[2]];
  };

  type Position = {
    place: string;
    price: string;
  };
 function getPosition(position: number): Position {
  switch (position) {
    case 1:
      return { place: '1st', price: '100$' };
    case 2:
      return { place: '2nd', price: '60$' };
    case 3:
      return { place: '3rd', price: '40$' };
    default:
      return { place: '', price: '' };
  }
}

  const orderedUsers = reorderUsers(usersWithPosition);

  return (
    <>
      <div className='flex justify-center items-center bg-light-gray'>
        <div className='bg-white shadow-md rounded-md p-4 w-full max-w-lg'>
          <div className='grid grid-cols-3 gap-2 items-end'>
            {orderedUsers?.map((user, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center p-2 rounded-md space-y-4`}
              >
                <CustomAvatar seed={user.name.split(' ')[0]} size={70} />
                <div className='text-lg font-semibold'>
                  {user.name.split(' ')[0]}
                </div>
                <div
                  className={`flex flex-col w-[130px] items-center justify-end space-y-3 p-3 ${
                    user.rank === 1
                      ? 'bg-[#ffefce] h-[220px]'
                      : user.rank === 2
                      ? 'bg-[#f7f7f7] h-[160px]'
                      : 'bg-[#e8d5d6] h-[110px]'
                  } rounded-md`}
                >
                  <div className='text-md font-semibold'>
                    {getPosition(user.rank).place}
                  </div>
                  <div className='flex items-center text-sm space-x-3 bg-gray-200 p-2 rounded-full'>
                    <div>{user.points} PTS</div>
                    <div>{getPosition(user.rank).price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
