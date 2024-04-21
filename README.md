# ✏️ Scribble Suite
### Realtime Scribbling Tool

<br>

## Overview

Scribble Suite is an innovative, real-time collaborative drawing application that leverages the power of WebSocket communication via Socket.io to provide a seamless and interactive drawing experience. Built with a modern tech stack including Next.js, Redux Toolkit, and Tailwind CSS for the frontend, and Node.js with Express for the backend, this application offers a robust platform for users to unleash their creativity and collaborate with others in real-time.

<div align="center">
	<code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" alt="Redux" title="Redux"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/187070862-03888f18-2e63-4332-95fb-3ba4f2708e59.png" alt="websocket" title="WebSocket (Socket.io)"/></code>
</div>

## Deployed Link: 
[https://scribble-suite-frontend.vercel.app/](https://scribble-suite-frontend.vercel.app/)



https://github.com/KaziNizamul/ScribbleSuite/assets/19683035/af254fed-e6f1-4ec7-a383-f766546902c7



## Features

- **Real-Time Collaboration:** Utilize Socket.io for real-time drawing and updates across all connected clients.
- **Drawing Tools:** Access a variety of drawing tools, including different brush sizes and colors, to create detailed artwork.
- **Undo/Redo Actions:** Easily undo or redo actions to perfect your drawing.
- **Download Artwork:** Download your creations with a simple click.
- **Responsive Design:** Enjoy a seamless experience across various devices and screen sizes.

## Getting Started

To get started with Scribble Suite, follow these steps:

### Prerequisites

Ensure you have Node.js installed on your system to run the application.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kazinizamul/scribblesuite.git
   ```
2. Navigate to the project directory and install dependencies for both the client and server:
   ```bash
   # Install server dependencies
   cd scribblesuite/server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   # From the server directory
   npm start
   ```
2. In a new terminal, start the client:
   ```bash
   # From the client directory
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Tech Stack

- **Frontend:** Next.js, Redux Toolkit, Tailwind CSS, Socket.io-client
- **Backend:** Node.js, Express, Socket.io
- **Development Tools:** ESLint, Babel

## Real-Time Drawing Implementation

The real-time drawing feature is at the heart of Scribble Suite, enabled by Socket.io for WebSocket communication. Here's a brief overview of how it works:

- **Client-Side:** The `Board` component manages drawing actions, emitting socket events on drawing start (`beginDraw`), drawing move (`endDraw`), and drawing end. It listens for these events from other clients to update the canvas in real-time.
- **Server-Side:** The server listens for `beginDraw`, `endDraw`, and `changeConfig` socket events, broadcasting them to all clients except the sender. This ensures all users' canvases are updated simultaneously, reflecting real-time collaboration.

## Project Structure

- `/client`: Contains the Next.js frontend application, including components like `Menu`, `ToolBox`, and `Board`.
- `/server`: Houses the Node.js server application setup with Express and Socket.io for handling real-time communication.
