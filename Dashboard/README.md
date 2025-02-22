# Appointment Booking Dashboard (MERN)

# Appointment Scheduling System

## Overview

The **Appointment Scheduling System** is a full-stack web application built using the **MERN** (MongoDB, Express.js, React.js, Node.js) stack. This system enables users to efficiently schedule, manage, and track appointments.

## Features

- Secure user authentication & authorization (JWT-based)
- Schedule, reschedule, and cancel appointments
- Calendar-based UI for easy appointment management
- Role-based access control (Admin & User)
- Notifications for upcoming appointments
- Robust API error handling & validation
- Responsive UI using Tailwind CSS 
- State management with Redux Toolkit

## Tech Stack

### Frontend (Client)

- **React.js (Vite)** – High-performance React development
- **Tailwind CSS** – Modern, responsive styling
- **Redux Toolkit** – State management
- **React Router** – Client-side navigation

### Backend (Server)

- **Node.js** – JavaScript runtime
- **Express.js** – Fast and lightweight backend framework
- **MongoDB** – Scalable NoSQL database
- **Mongoose** – Elegant MongoDB ODM
- **JWT** – Secure authentication

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js**
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)
- **Git**

### Clone the Repository front end

```sh 
git clone https://github.com/RanjitPatilNode/Doctor-Appointment-Scheduler-F
```
### Clone the Repository front end

```sh 
git clone https://github.com/RanjitPatilNode/Doctor-Appointment-Scheduler-B
```

### Install Dependencies

#### Client (React.js with Vite)

```sh
cd client
npm install
```

#### Server (Node.js & Express)

```sh
cd server
npm install
```

### Environment Variables

Create a `.env` file inside the `server` folder and add the following:

```
PORT=4400
MONGO_URI=mongodb+srv://app:app@cluster0.mntoeil.mongodb.net/RanjitProject
```

### Running the Application

#### Start the Backend Server

```sh
cd server
nodemon server.js
```

#### Start the Frontend (Vite)

```sh
cd client
npm run dev
```

## API Endpoints

### Authentication Routes

- `POST /loginApis` - User login

### Appointment Routes

#### POST Endpoints

- `POST /createDoctor` - Register a new doctor
- `POST /createPatient` - Register a new patient

#### GET Endpoints

- `GET /getAllDoctors` - Retrieve all doctors
- `GET /getAllAppointments` - Retrieve all appointments
- `GET /getDashboardStats` - Fetch dashboard statistics

#### PUT (Update) Endpoints

- `PUT /updatePatient/:patientId` - Update patient details
- `PUT /updateDoctor/:doctorId` - Update doctor details

#### DELETE Endpoints

- `DELETE /deletePatient/:patientId` - Remove a patient
- `DELETE /deleteDoctor/:doctorId` - Remove a doctor




## Contact

For queries, contact **[ranjitpatil368@gmail.com](mailto:ranjitpatil368@gmail.com)**.




