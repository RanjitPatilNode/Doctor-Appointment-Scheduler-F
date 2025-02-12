import { createSlice } from "@reduxjs/toolkit";
const appointmentSlicereducer = createSlice({
  name: "appointments",
  initialState: { data: [] },
  reducers: {
    addAppointment: (state, action) => {
      state.data.push(action.payload);
    },
  },
});
export const { addAppointment } = appointmentSlicereducer.actions;
export default appointmentSlicereducer.reducer;