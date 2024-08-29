import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '../../ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { IUser } from '@/models/User.model';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { useUpdatePoints } from '@/hooks/useUpdateUserById';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/userSlice';
import { fetchUser } from '@/redux/actions';

// Define schema for the form using Zod
const updateFormSchema = z.object({
  points: z.coerce
    .number()
    .min(0, { message: 'minimum allowed value is 0' })
    .max(100, { message: 'maximum allowed value is 100' }),
});

type UpdateFormParams = z.infer<typeof updateFormSchema>;

type UpdateFormProps = {
  user: IUser;
};

export function UpdateDialog({ user }: UpdateFormProps) {
  const form = useForm<UpdateFormParams>({
    resolver: zodResolver(updateFormSchema),
    reValidateMode: 'onSubmit',
    mode: 'all',
    defaultValues: { points: user.points },
  });

  const {
    formState: { isValid },
  } = form;

  const { mutateAsync } = useUpdatePoints();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: UpdateFormParams) => {
    try {
      dispatch(setUser({ id: user.id, rank: user.rank, points: user.points }));
      const success = await mutateAsync({ userId: user.id, points: data.points });

      if (success) {
        dispatch(fetchUser(user.id));
        form.reset();
      }
    } catch (error) {
      console.error('Failed to update points:', error);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Points</DialogTitle>
        <DialogDescription>
          Update the points for this user.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='points'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='points'>Points</FormLabel>
                <FormControl>
                  <Input
                    id='points'
                    type='number'
                    placeholder='Enter points'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end mt-6'>
            <Button disabled={!isValid} type='submit'>
              Confirm
            </Button>
          </div>
          
        </form>
      </Form>
    </DialogContent>
  );
}
