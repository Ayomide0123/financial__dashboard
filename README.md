# Financial Dashboard

## Overview
The Financial Dashboard is a web application designed to provide users with insights into their financial data. It allows users to visualize their financial information through interactive charts, including bar charts and pie charts. The application fetches financial data from a backend API, which is built using Node.js and Express, and stores the data in a MySQL database.

### Features
- User registration and login functionality.
- Visualization of financial data using charts (BarChart and PieChart).
- Responsive design for optimal viewing on various devices.
- Data fetching from a backend API.
- Secure user authentication using JWT (JSON Web Tokens).

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MySQL

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- A package manager like npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone [<repository-url>](https://github.com/Ayomide0123/financial__dashboard)
   cd financial_dashboard
   ```

2. **Set up the backend**:
   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install the backend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory and add the following environment variables:
     ```plaintext
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_mysql_password
     DB_NAME=financial_dashboard_db
     PORT=5001
     JWT_SECRET=your_jwt_secret
     ```
   - Create the MySQL database:
     ```sql
     CREATE DATABASE financial_dashboard_db;
     ```
   - Run the server:
     ```bash
     npm start
     ```

3. **Set up the frontend**:
   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Install the frontend dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

### Running the Application
- Once both the backend and frontend servers are running, you can access the application in your web browser at `http://localhost:3000`.
- You can register a new user or log in with existing credentials to access the dashboard.

### API Endpoints
- **User Registration**: `POST /api/users/register`
- **User Login**: `POST /api/users/login`
- **Financial Data**:
  - **Get Financial Data**: `GET /api/financial/financial-data`
  - **Add Financial Data**: `POST /api/financial/financial-data`

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.
