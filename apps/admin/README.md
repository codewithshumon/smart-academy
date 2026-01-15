# Admin Dashboard

React 19 + Vite 6 admin dashboard for Smart Academy Digital Portal.

## Getting Started

### Install Dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The admin dashboard will be available at `http://localhost:3001`

### Build

```bash
pnpm build
```

### Type Checking

```bash
pnpm check-types
```

### Linting

```bash
pnpm lint
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── services/        # API client services
├── types/           # TypeScript type definitions
├── styles/          # Global and component styles
├── App.tsx          # Root component
└── main.tsx         # Entry point
```

## Technologies

- **React 19** - UI framework
- **Vite 6** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching
- **React Hook Form** - Form management
- **Axios** - HTTP client

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```
