<h1 align='center'>🤝👋❤️ Dost ❤️👋🤝</h1>

This project is a responsive full stack Facebook clone built using the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. It aims to replicate some of the core features and design elements of Facebook, providing users with a familiar social media experience.

<div align='center'>
    <img 
        src='https://tenor.com/view/did-we-just-become-best-friends-did-we-just-become-best-friends-meme-step-brothers-best-friends-besties-best-friend-gif-23405805.gif'
        height='180'
        width='300'
    >
</div>

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Demo

Check out the live demo of the project [here](https://dost-production.up.railway.app/).

## Features

- User authentication and authorization
- News Feed with posts from friends and other users
- Like and comment on posts
- User profiles with profile pictures and user posts
- Add friends and manage your friend's list
- Responsive design for various screen sizes
- Toggle between a light and dark theme

## Technologies

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Passport
- **Deployment**: Railway

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/DustyDogCodex/Dost.git
   cd Dost
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `server` directory and add the following:

   ```env
   MONGO_URL=your-mongodb-uri
   SESSION_SECRET=your-secret
   ```

4. Run the development servers:

   ```bash
   npm run devstart
   ```

5. Access the app in your browser at `http://localhost:5173`.

## Usage

- Register an account or log in if you already have one.
- Explore the News Feed to see posts from friends and other users.
- Interact with posts by liking and commenting.
- Manage your friend list.
- Update your profile picture.
- Toggle between a light and dark theme.

## License

This project is licensed under the MIT License.