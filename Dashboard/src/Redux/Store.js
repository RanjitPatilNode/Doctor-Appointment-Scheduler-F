import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./Slices/appointmentSlicereducer";
import { doctorApi } from "../Api/doctorApi";
import { createDoctorApi } from "../Api/createDoctorApi";
import { appointmentApi } from "../Api/appointmentApi";
import { createAppointmentApi } from "../Api/createAppointmentApi";
import { updateDoctorApi } from "../Api/updateDoctor";
import { deleteDoctorApi } from "../Api/deleteDoctor";
import { updateAppointmentApi } from "../Api/updaateAppointment";
import { deleteAppointmentApi } from "../Api/deleteAppointmentApi";
import { dashboardApi } from "../Api/dashboardApi";
import { authApi } from "../Api/authApi";

const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [createDoctorApi.reducerPath]: createDoctorApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [createAppointmentApi.reducerPath]: createAppointmentApi.reducer,
    [updateDoctorApi.reducerPath]: updateDoctorApi.reducer,
    [deleteDoctorApi.reducerPath]: deleteDoctorApi.reducer,
    [updateAppointmentApi.reducerPath]: updateAppointmentApi.reducer,
    [deleteAppointmentApi.reducerPath]:deleteAppointmentApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorApi.middleware, createDoctorApi.middleware, appointmentApi.middleware,
      createAppointmentApi.middleware, updateDoctorApi.middleware, deleteDoctorApi.middleware ,
       updateAppointmentApi.middleware , deleteAppointmentApi.middleware , appointmentApi.middleware, 
       dashboardApi.middleware , authApi.middleware  ),

});

export default store;
