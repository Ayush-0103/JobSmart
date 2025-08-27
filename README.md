# JOBSMART - Intelligent Job Recommendation Portal

![JOBSMART Logo](public/jobsmart-logo.png)

**A PROFESSIONAL DEVELOPMENT**

JOBSMART is an AI-powered job recommendation portal that connects job seekers with their ideal opportunities through intelligent matching algorithms. Built with Next.js and modern web technologies, it provides a comprehensive platform for both job seekers and recruiters.

## 🚀 Features

### For Job Seekers
- **AI-Powered Recommendations**: Get personalized job matches with percentage scores
- **Smart Dashboard**: Track applications, view profile insights, and monitor progress
- **Advanced Job Search**: Filter by skills, location, experience, salary, and company type
- **Profile Analytics**: See skills matched vs. missing skills for each opportunity
- **Application Tracking**: Monitor applied, shortlisted, and rejected applications
- **Real-time Updates**: Get notified when new matching jobs are posted

### For Recruiters & Admins
- **Job Management**: Post, edit, and manage job listings with full CRUD operations
- **User Management**: View and manage job seeker profiles and activities
- **Analytics Dashboard**: Track system metrics, user engagement, and match success rates
- **Interactive Charts**: Visualize data with responsive charts and graphs

### Technical Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI/UX**: Professional design with dark theme and green/teal accents
- **RESTful APIs**: Well-structured API endpoints for all functionality
- **Real-time Matching**: Dynamic recommendation engine with location and experience boosting
- **Secure Authentication**: User registration and login system

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript strict mode

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/jobsmart-portal.git
   cd jobsmart-portal
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

\`\`\`
jobsmart-portal/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel pages
│   │   ├── jobs/                 # Job management
│   │   ├── users/                # User management
│   │   └── page.tsx              # Admin dashboard
│   ├── api/                      # API routes
│   │   └── recommendations/      # Recommendation engine APIs
│   ├── dashboard/                # Job seeker dashboard
│   ├── jobs/                     # Job search and listings
│   ├── login/                    # Authentication pages
│   ├── register/
│   ├── globals.css               # Global styles and design tokens
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── admin-sidebar.tsx         # Admin navigation
│   ├── job-card.tsx              # Job listing component
│   ├── recommendation-engine.tsx # AI recommendation component
│   └── ...
├── public/                       # Static assets
│   └── jobsmart-logo.png         # Brand logo
└── ...
\`\`\`

## 🔌 API Endpoints

### Recommendations
- `GET /api/recommendations` - Get personalized job recommendations
- `POST /api/recommendations/refresh` - Refresh recommendation cache

### Jobs (Future Implementation)
- `GET /api/jobs` - Get all jobs with filtering
- `POST /api/jobs` - Create new job listing
- `PUT /api/jobs/[id]` - Update job listing
- `DELETE /api/jobs/[id]` - Delete job listing

### Users (Future Implementation)
- `GET /api/users` - Get user profiles
- `POST /api/users` - Create user profile
- `PUT /api/users/[id]` - Update user profile

## 🎨 Design System

JOBSMART uses a professional design system with:

- **Colors**: Dark navy primary (#2D2A5A) with green/teal accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent shadcn/ui component library
- **Responsive**: Mobile-first design with desktop enhancements
- **Accessibility**: WCAG compliant color contrasts and semantic HTML

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/jobsmart-portal)

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔮 Future Enhancements

- **Database Integration**: Connect with Supabase or PostgreSQL
- **Real Authentication**: Implement secure user authentication
- **Email Notifications**: Job alerts and application updates
- **Resume Upload**: PDF parsing and skill extraction
- **Company Profiles**: Detailed company pages and reviews
- **Advanced Analytics**: Machine learning insights and predictions
- **Mobile App**: React Native companion app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

---

**JOBSMART** - Connecting talent with opportunity through intelligent matching.

For support or questions, please open an issue or contact the development team.
