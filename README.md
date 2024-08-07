# TradeLog

TradeLog is a web application built with React that helps users track their trade logs. The application provides functionalities to add, edit, delete trade logs, and view all trades and the most recent trades. Authenticated users can also view and add comments to trades, view their profiles.

## Features

### Public Features

- **User Registration and Login**: Users can register and log into the system.
- **View Trade Logs**: View a list of all trade logs.
- **View Comments on Trades**: Non-logged-in users can only view comments.

### Private Features (Authenticated Users Only)

- **Add Trade Log**: Allows authenticated users to add a new trade log with details such as date, ticker, volume, and price.
- **Edit Trade Log**: Authenticated users can edit their existing trade logs.
- **Delete Trade Log**: Allows authenticated users to delete unwanted trade logs.
- **Add Comments on Trades**: Logged-in users can add comments to trades.
- **User Profile**: Displays Username, email and all trades made by the user.

### Auth Guards

- Guards to manage authenticated and unauthenticated user access.

## Installation

Follow these steps to run the project locally:

### Client

1. Clone the repository:
    ```sh
    git clone https://github.com/PetkoKrPetkov/TradeLog.git
    ```
2. Navigate to the client directory:
    ```sh
    cd TradeLog/client
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the client application:
    ```sh
    npm run dev
    ```
The application will be available at `http://localhost:2112`.

### Server

1. Navigate to the server directory:
    ```sh
    cd TradeLog/server-1.0.0
    ```
2. Start the server:
    ```sh
    node ./server.js
    ```
Note: This server is a SoftUni Practice-Server and does not persist data. All data will be lost upon server restart.

## Technologies Used

- **React** - JavaScript library for building user interfaces
- **React Router** - For handling routing within the application
- **Fetch API** - For making HTTP requests
- **CSS Modules** - For styling components
- **localStorage** - For storing tokens and other client-side information
