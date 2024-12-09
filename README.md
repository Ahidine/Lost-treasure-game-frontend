# Lost Treasure Front-End

## Description

This project is the front-end for the "Lost Treasure" game application. It connects to a backend built with Node.js, Express, and TypeScript, implementing **user management**, **treasure handling**, and **authentication services**. The front-end is built with **React**, and it uses **Axios** to interact with the backend APIs.

The application allows users to register, log in, view treasures they've found, and manage their profile.

## Features

- **Authentication**:
  - User registration and login.
  - JWT-based authentication for secure login.
- **User Management**:
  - Display user details such as name and email.
- **Treasure Management**:

  - View treasures that the user has found.
  - Discover new treasures in the game.

- **Hexagonal Architecture**:
  - The front-end architecture is structured to easily connect to the backend, with a focus on reusable components and managing API interactions effectively.

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Redux**: For managing the application state.
- **React Router**: For routing between different pages (Login, Dashboard).
- **TypeScript**: For type safety and better developer experience.
- **CSS**: For styling the application.
- **JWT**: For secure user authentication.
- **Jest**: For testing the application.
- **React Testing Library**: For testing React components.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org) (version 14 or higher)
- [Yarn](https://yarnpkg.com/) (optional, but recommended for package management)

### Setup

```bash
git clone https://github.com/Ahidine/Lost-treasure-game-frontend
cd Lost-treasure-game-frontend
yarn
yarn start
```
