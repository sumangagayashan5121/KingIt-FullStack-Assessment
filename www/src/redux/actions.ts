import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { IResponse } from '@/models/Response.model';
import { IUser } from '@/models/User.model';

const VITE_BASE_URL = import.meta.env.VITE_BASE_API_URL as string;
const VERSION = import.meta.env.VITE_API_VERSION as string;

export const fetchUser = createAsyncThunk(
  'rank/fetchUser',
  async (userId: number) => {
    const response: AxiosResponse<IResponse<IUser>> = await axios.get(
      `${VITE_BASE_URL}/${VERSION}/users/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  }
);
