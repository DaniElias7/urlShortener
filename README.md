# Fancy URL Shortener

A simple and professional URL shortener application built with Next.js, Express.js, and PostgreSQL.

## Overview

This application allows users to shorten long URLs into more manageable and shareable short links. It provides a clean and intuitive interface for users to paste a long URL, generate a short code, and easily copy the resulting short link.

## Technologies Used

* Frontend:Frontend: Next.js
* Backend: Node.js, Express
* Database: PostgreSQL

## Setup Instructions

Follow these steps to get the application running on your local machine:

**Frontend Setup (Next.js):**

1.  Navigate to the frontend directory:
    ```bash
    cd client
    ```
2.  Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend will be accessible at `http://localhost:3000`.

**Backend Setup (Express.js):**

1.  Navigate to the backend directory:
    ```bash
    cd api
    ```
2.  Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Create a `.env` file in the backend directory and configure your PostgreSQL database credentials:
    ```
    DB_USER=your_database_user
    DB_HOST=localhost
    DB_NAME=your_database_name
    DB_PASSWORD=your_database_password
    DB_PORT=5432
    ```
    Replace the placeholder values with your actual PostgreSQL setup.
4.  Run the backend server:
    ```bash
    npm start
    # or
    yarn start
    ```
    The backend server will be running on `http://localhost:5000` (or the port specified in your `.env` file).

## Usage

1.  Open your browser and go to the frontend URL (usually `http://localhost:3000`).
2.  In the input field, paste the long URL you want to shorten.
3.  Click the "Shorten URL" button.
4.  If successful, a short URL will be generated and displayed in the input field. The button will change to "Copy URL".
5.  Click the "Copy URL" button to copy the short link to your clipboard. You can then share this short link as needed.
6.  To shorten another URL, simply clear the input field and paste a new long URL.
