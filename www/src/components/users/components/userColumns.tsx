import { ColumnDef } from '@tanstack/react-table';

import { IUser } from '@/models/User.model';
import Avatar from './avatar';
import { Rank } from './rank';
import ActionsDialog from './actionDialog';

interface UserColumnsProps {
  newRank: number;
  prevRank: number;
  userId: number;
  pointChanges: Record<number, number>;
}

const getStatusType = (
  currentRank: number,
  prevRank: number,
  newRank: number,
  isCurrentUser: boolean,
  rankMovement: 'UP' | 'DOWN'
): 'UP' | 'DOWN' | 'SAME' => {
  if (isCurrentUser) {
    return prevRank > newRank ? 'UP' : 'DOWN';
  }

  if (rankMovement === 'UP') {
    return (currentRank > newRank && currentRank <= prevRank) ? 'DOWN' : 'SAME';
  }

  if (rankMovement === 'DOWN') {
    return (currentRank <= newRank && currentRank >= prevRank) ? 'UP' : 'SAME';
  }

  return 'SAME';
};



export const UserColumns = ({
  newRank,
  prevRank,
  userId,
  pointChanges,
}: UserColumnsProps): ColumnDef<IUser>[] => [
  {
  id: 'position',
  header: 'Rank',
  cell: ({ row }) => {
    const rank = row.original.rank;
    const isSameUser = userId === row.original.id;
    const promoteType = newRank > prevRank ? 'DOWN' : 'UP';
    const statusType = getStatusType(rank,prevRank,newRank,isSameUser,promoteType)

    return (
      <div className='flex items-center justify-center space-x-2'>
        <Rank status={statusType} />
        <p>{rank}</p>
      </div>
    );
  },
}
,
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.original.name;
      const firstname = name.split(' ')[0];
      return (
        <div className='flex items-center space-x-2'>
          <Avatar seed={firstname} />
          <p className='font-semibold'>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'country',
    header: 'Predicted World Champion',
    cell: ({ row }) => {
      const country = row.original.country;
      const change = pointChanges[row.original.id] || 0;
      const changeText = change > 0 ? `+${change}` : change < 0 ? `${change}` : '';

      return (
        <div className='flex items-center space-x-2'>
        <p className='font-semibold'>{country}</p>
        {changeText && (
          <span
            className={`ml-2 px-2 py-1 text-xs rounded-full bg-yellow-100 ${
              change > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {`${changeText} PTS`}
          </span>
        )}
      </div>
      );
    },
  },
  {
    accessorKey: 'points',
    header: 'Points',
    cell: ({ row }) => {
      const points = row.original.points;
      
      return (
        <div className='flex justify-center'>
          <span>{`${points} PTS`}</span>
        </div>
      );
    },
  },
  {
  id: 'actions',
  cell: ({ row }) => {
    const user = row.original;

    return <ActionsDialog user={user} />;
  },
}
];
