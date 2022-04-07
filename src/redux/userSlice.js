import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../userAPI';
const initialState = {
  value: [],
  status: 'idle',
  firstValue: {},
  error: null, 
  loading: null
};

export const getUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkApi) => {
    try {
      const response = await fetchUsers();
      console.log('response::::::',response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: "Failed to fetch users.",
      });
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {

    setFirstValue: (state, action) => {
      console.log('action::::::',action);
      state.firstValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const firstValue = action.payload[0]
        state.firstValue = {...firstValue, city: firstValue.address.city}

        console.log('action.payload::::::', action.payload);
        state.value = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.status = "idle";
      });
  },
});
export const { setFirstValue } = userSlice.actions;
export const selectUsers = (state) => state.users.value;
export const selectFirstRow = (state) => state.users.firstValue;
export const selectError = (state) => state.users.error;
export const selectLoading = (state) => state.users.status === "loading";


export const selectUserTableData = (state) => {

  console.log('state.users::::::', state.users);

  return state.users.value?.map((user) => {
    return (
      {
        key: user.id,
        name: user.name,
        email: user.email,
        city: user.address.city,
      }
    )
  })
}


export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectUsers(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};
export default userSlice.reducer;