# Project Setup

## Client

### Prerequisites
- `.env` files are included in the repository.

### Setup and Running

1. **Navigate to the Client Directory**:
   ```bash
   cd www
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Start the Frontend**:
   ```bash
   yarn dev
   ```
   - By default, the frontend will run on [http://localhost:5173](http://localhost:5173).
   - All origins are allowed.

### Tech Stack
- **ReactJS**: Frontend framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **Shadcn**: UI components
- **React Query**: Data fetching and synchronization
- **Redux Toolkit**: State management
- **Thunk**: Middleware for Redux

## Backend

### Prerequisites
- `.env` files are included in the repository.

### Setup and Running

1. **Navigate to the Server Directory**:
   ```bash
   cd server
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Start the Backend**:
   ```bash
   yarn start:dev
   ```
   - The backend will be accessible at [http://localhost:3000](http://localhost:3000).

### Tech Stack
- **NestJS**: Backend framework
- **TypeScript**: Type safety
- **REST**: API architecture

---
