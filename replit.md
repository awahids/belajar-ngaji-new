# Overview

This is a full-stack Islamic learning web platform called "Belajar Ngaji" built with React, Express.js, and PostgreSQL. The platform provides interactive modules for learning Quranic fundamentals including Hijaiyah letters, Dhikr (morning/evening prayers), Quran reading, and Islamic quizzes. It features both a public-facing educational site and a simple admin panel for content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with Vite as the build tool and development server
- **TypeScript** for type safety throughout the application
- **React Router** for client-side routing with separate public and admin routes
- **TailwindCSS** with shadcn/ui components for consistent UI design
- **Framer Motion** for smooth animations and transitions
- **Tanstack Query** for efficient API data fetching and caching

## Backend Architecture
- **Express.js** server with TypeScript support
- **RESTful API** structure with dedicated routes for different content types
- **Drizzle ORM** for database operations and schema management
- **Server-side data validation** using Zod schemas
- **File-based routing** with organized route handlers in `/server/routes.ts`

## Database Design
- **PostgreSQL** database hosted on Neon serverless platform
- **Schema-first approach** with type-safe database operations
- Core tables include:
  - `hijaiyah_letters` - 28 Arabic letters with audio and metadata
  - `dhikr` - Morning and evening prayers with translations
  - `articles` - Educational content and tips
  - `quiz_categories` and `quiz_questions` - Interactive learning assessments
  - `modules`, `features`, `value_pillars` - Content management tables
  - `contact_messages` - User inquiries and communication
  - `metrics` - Platform analytics and statistics

## Authentication & Authorization
- Simple admin authentication system using custom hooks
- Role-based access control for admin panel functionality
- Session management for admin users
- Protected routes for administrative functions

## Content Management
- **CRUD operations** for all educational content types
- **Audio file support** for pronunciation guides
- **Progress tracking** with localStorage for user learning progress
- **Multilingual support** with Indonesian and English translations
- **Category-based organization** for quizzes and educational materials

## Performance Optimizations
- **Component lazy loading** for better initial page load
- **Image optimization** with proper sizing and lazy loading
- **API response caching** using React Query
- **Efficient database queries** with Drizzle ORM optimizations

# External Dependencies

## Database & Hosting
- **Neon PostgreSQL** - Serverless PostgreSQL database platform
- **Vercel/Replit** - Hosting and deployment platform

## Audio Content
- **External CDN** - Audio files hosted on GitHub repository for Hijaiyah pronunciation
- **Web Audio API** - Browser-native audio playback functionality

## Islamic Content APIs
- **Quran.com API** - For Quranic text, translations, and metadata
- **Islamic content repositories** - Community-sourced Dhikr and educational materials

## UI & Styling
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Icon library for consistent iconography
- **TailwindCSS** - Utility-first CSS framework

## Development Tools
- **ESBuild** - Fast JavaScript bundler for production builds
- **PostCSS** - CSS processing with TailwindCSS plugins
- **TypeScript** - Static type checking and enhanced developer experience