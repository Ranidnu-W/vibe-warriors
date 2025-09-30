# Vibe Battle - Coding Tournament Registration

A modern, fun web application for the "Vibe Battle" coding tournament registration and participant management.

## Features

- 🎯 **Modern UI**: Beautiful, animated interface with gradient backgrounds and smooth transitions
- 📝 **Waitlist Form**: Collect participant information (email, nickname, city)
- 🗄️ **Database Integration**: SQLite database with Prisma ORM
- 👥 **Participants Page**: Dynamic table showing all registered participants
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: SQLite with Prisma ORM
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy
4. The database will be created automatically on first run

### Environment Variables

For production deployment, you may want to use a different database:

```env
DATABASE_URL="your-production-database-url"
```

## Project Structure

```
src/
├── app/
│   ├── api/participants/route.ts    # API endpoints
│   ├── participants/page.tsx        # Participants display page
│   ├── page.tsx                      # Homepage with registration form
│   └── layout.tsx                    # Root layout
├── lib/
│   └── prisma.ts                     # Database client
prisma/
├── schema.prisma                     # Database schema
└── migrations/                       # Database migrations
```

## API Endpoints

- `POST /api/participants` - Create a new participant
- `GET /api/participants` - Get all participants

## Database Schema

```prisma
model Participant {
  id        String   @id @default(cuid())
  email     String   @unique
  nickname  String
  city      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Features Implemented

✅ **Deploy a Website with a Public URL**: Ready for Vercel deployment  
✅ **Website Loads Without Errors**: Tested and optimized  
✅ **Display Event Information**: Tournament details on homepage  
✅ **Waitlist Form with Email Input**: Complete form with validation  
✅ **Collect Nickname and City**: All required fields implemented  
✅ **Database Integration**: Prisma with SQLite database  
✅ **Participants Display Page**: Dynamic table with all participants  

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own tournaments!