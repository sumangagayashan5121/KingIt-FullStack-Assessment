import React from 'react';
import { Dialog, DialogTrigger } from '../../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { Button } from '../../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { UpdateDialog } from './userUpdateModel';
import { IUser } from '@/models/User.model';

interface ActionsDialogProps {
  user: IUser;
}

const ActionsDialog: React.FC<ActionsDialogProps> = ({ user }) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DialogTrigger asChild>
            <DropdownMenuItem>Update Points</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateDialog user={user} />
    </Dialog>
  );
};

export default ActionsDialog;
