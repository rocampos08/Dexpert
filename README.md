# Dexpert

Dexpert is a web platform that connects students and SMEs (PYMEs) through real-world projects, allowing students to gain experience and companies to find talent for their needs.

## Features

- **Authentication:** Secure login and registration using Clerk.
- **Role-based access:** Users can be either STUDENT or PYME, with different dashboards and permissions.
- **Project Management:** PYMEs can create, edit, and delete projects.
- **Project Application:** Students can browse, filter, and apply to projects.
- **Responsive Design:** Fully responsive and mobile-friendly.
- **Custom UI:** Modern design with custom colors and animations.
- **Notifications:** Toast notifications for actions and errors.

## Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Clerk** (Authentication)
- **Prisma** (ORM)
- **PostgreSQL** 
- **Lucide React** (Icons)
- **Sonner** (Toast notifications)

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL (or compatible database)
- Clerk account (for authentication)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/dexpert.git
   cd dexpert
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add:

   ```
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

```
app/
  (auth)/           # Authentication pages (sign-in, sign-up)
  (main)/           # Main application routes
  (routes)/         # Route components
  (root)/           # Root-level components (sidebar, banners, etc.)
  onboarding/       # Onboarding flows for students and PYMEs
  api/              # API routes (role check, project CRUD, etc.)
  redirect-by-role/ # Role-based redirect logic
components/         # Reusable UI components
lib/                # Prisma client and utilities
public/             # Static assets
prisma/             # Prisma schema and migrations
```

## Usage

- **Students:**  
  - Sign up and complete onboarding.
  - Browse and filter available projects.
  - Apply to projects and track application status.

- **PYMEs:**  
  - Register and complete onboarding.
  - Create and manage projects.
  - Review student applications.



---

**Made by the Dexpert
