# Insyd Notifications Frontend

A modern React-based frontend application for managing and creating notifications. This project provides a user-friendly interface for viewing notifications and creating new notification events.

## 🚀 Project Overview

**Insyd Notifications Frontend** is a TypeScript React application that serves as the client-side interface for a notification management system. It allows users to:

- View and manage notifications in real-time
- Filter notifications by read/unread status
- Create new notification events
- Mark notifications as read
- Receive real-time feedback through toast notifications

## 📁 Project Structure

```
insyd/
├── 📄 package.json                 # Project dependencies and scripts
├── 📄 package-lock.json           # Locked dependency versions
├── 📄 index.html                  # Main HTML entry point
├── 📄 vite.config.ts              # Vite build configuration
├── 📄 tailwind.config.js          # Tailwind CSS configuration
├── 📄 postcss.config.js           # PostCSS configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tsconfig.app.json           # App-specific TypeScript config
├── 📄 tsconfig.node.json          # Node-specific TypeScript config
├── 📄 eslint.config.js            # ESLint configuration
├── 📄 vite-env.d.ts               # Vite environment types
└── 📁 src/                        # Source code directory
    ├── 📄 main.tsx                # Application entry point
    ├── 📄 App.tsx                 # Main application component
    ├── 📄 index.css               # Global styles
    ├── 📄 api.ts                  # API service functions
    ├── 📄 types.ts                # TypeScript type definitions
    ├── 📁 components/             # Reusable UI components
    │   ├── 📄 Header.tsx          # Navigation header component
    │   └── 📄 Toast.tsx           # Toast notification component
    └── 📁 pages/                  # Page components
        ├── 📄 NotificationsPage.tsx    # Notifications listing page
        └── 📄 CreateEventPage.tsx      # Event creation page
```

## 🛠️ Technologies Used

### Core Technologies
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Vite 5.4.2** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - CSS vendor prefixing
- **Lucide React 0.344.0** - Beautiful icon library

### Routing & State Management
- **React Router DOM 6.28.0** - Client-side routing
- **React Hooks** - Built-in state management

### Development Tools
- **ESLint 9.9.1** - Code linting and quality
- **TypeScript ESLint 8.3.0** - TypeScript-specific linting rules

## 🏗️ Architecture

### Component Structure
The application follows a modular component architecture:

1. **App Component** (`src/App.tsx`)
   - Main application wrapper
   - Sets up routing with React Router
   - Renders the Header and main content area

2. **Header Component** (`src/components/Header.tsx`)
   - Navigation bar with app title
   - Navigation links to different pages
   - Active state management for current route

3. **Page Components**
   - **NotificationsPage** (`src/pages/NotificationsPage.tsx`)
     - Displays list of notifications
     - Handles filtering (all/unread)
     - Manages notification read status
     - Real-time refresh functionality
   
   - **CreateEventPage** (`src/pages/CreateEventPage.tsx`)
     - Form for creating new notification events
     - Type selection with visual indicators
     - Form validation and submission

4. **Utility Components**
   - **Toast Component** (`src/components/Toast.tsx`)
     - Displays temporary success/error/info messages
     - Auto-dismiss functionality
     - Multiple toast types with icons

### API Integration
The application communicates with a backend API through the `api.ts` service:

- **Base URL**: `https://api-node-insyd.onrender.com/api` (production)
- **Development Proxy**: `/api` (proxied to production API)
- **Key Endpoints**:
  - `GET /notifications/:userId` - Fetch user notifications
  - `POST /events` - Create new notification event
  - `PUT /notifications/:id/read` - Mark notification as read

### Type System
Comprehensive TypeScript types defined in `types.ts`:

```typescript
export type NotificationType = 'FOLLOW' | 'LIKE' | 'COMMENT' | 'SHARE_JOB' | 'SHARE_BLOG';

export interface Notification {
  _id: string;
  userId: string;
  type: NotificationType;
  content: string;
  isRead: boolean;
  createdAt: string;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd insyd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   The application will automatically open at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Features

### Notifications Management
- **Real-time Display**: View notifications with live updates
- **Smart Filtering**: Toggle between all notifications and unread only
- **Read Status**: Mark individual notifications as read
- **Time Formatting**: Human-readable timestamps (e.g., "2h ago", "3d ago")
- **Visual Indicators**: Different icons for each notification type
- **Unread Counter**: Badge showing number of unread notifications

### Event Creation
- **Type Selection**: Choose from 5 notification types with visual emojis
- **Form Validation**: Required field validation with helpful error messages
- **Auto-fill Content**: Pre-filled sample content for each notification type
- **Success Feedback**: Toast notifications for successful operations

### User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Graceful error handling with retry options
- **Toast Notifications**: Non-intrusive feedback messages
- **Navigation**: Clean navigation between pages

## 🎨 UI/UX Design

### Design System
- **Color Scheme**: Modern, clean interface with consistent colors
- **Typography**: Clear, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Icons**: Lucide React icons for consistent visual language
- **Animations**: Subtle animations for better user feedback

### Component Styling
- **Utility-First CSS**: Tailwind CSS for rapid development
- **Component Isolation**: Scoped styles for each component
- **Responsive Grid**: Flexible layouts that adapt to screen size
- **Interactive States**: Hover, focus, and active states for all interactive elements

## 🔧 Configuration

### Development Environment
- **Port**: 3000 (configurable in `vite.config.ts`)
- **API Proxy**: Development requests to `/api` are proxied to production API
- **Hot Reload**: Automatic page refresh on file changes
- **Type Checking**: Real-time TypeScript error checking

### Production Build
- **Optimization**: Vite optimizes bundle size and performance
- **Tree Shaking**: Unused code is automatically removed
- **Asset Optimization**: Images and other assets are optimized
- **Environment Variables**: Production API URL configuration

## 📱 Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Considerations

- **CORS**: Proper CORS configuration for API communication
- **Input Validation**: Client-side validation for all user inputs
- **Error Handling**: Secure error messages that don't expose sensitive information
- **HTTPS**: Production API communication over HTTPS

## 🧪 Testing

While no testing framework is currently configured, the project structure supports:
- Unit testing with Jest/Vitest
- Component testing with React Testing Library
- E2E testing with Playwright or Cypress

## 📈 Performance

- **Code Splitting**: Automatic code splitting by routes
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Optimized bundle size with Vite
- **Caching**: Proper caching headers for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support and questions:
- Check the documentation above
- Review the code comments for implementation details
- Contact the development team

---

**Built with ❤️ using React, TypeScript, and Vite**
