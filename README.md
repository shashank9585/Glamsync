# ✨ GlamSync - AI-Powered Beauty & Styling Platform

**Your AI-Powered Glamour Platform** - Discover salons, find expert stylists, and plan your beauty journey with intelligent recommendations.

🌐 **Live Demo:** [https://glamsync-yarf.vercel.app/](https://glamsync-yarf.vercel.app/)

---

## 📖 About

GlamSync is a modern, full-stack beauty marketplace platform that connects users with top-rated salons and stylists. Powered by AI, it provides personalized beauty planning, inspiration analysis, and intelligent recommendations tailored to your needs and budget.

Whether you're planning your bridal look, preparing for a job interview, or just want a fresh new style, GlamSync matches you with the perfect experience and books it instantly.

---

## 🚀 Features

### For Customers
- **🎯 AI Beauty Planner** - Get personalized beauty roadmaps with timelines and budget breakdowns
- **💒 Bridal Hub** - Complete wedding beauty planning with intelligent timeline generation
- **💼 Men's Grooming Hub** - Professional grooming plans tailored to your occasion
- **🎨 Inspiration Studio** - Describe a look, let AI analyze it and match you with the right services
- **💬 AI Chatbot** - 24/7 beauty assistant for questions and recommendations
- **📍 Salon Discovery** - Find salons with map view, search, and filtering
- **✂️ Stylist Portfolios** - Browse stylist portfolios and book directly
- **📅 Easy Booking** - 4-step booking flow with service selection, scheduling, and mock payment
- **👤 User Dashboard** - Manage bookings, saved salons, and AI plans
- **🔐 Authentication** - Secure login/register with role-based access (Customer, Salon Owner, Stylist)

### For Salon Owners
- **📊 Salon Dashboard** - Manage bookings, services, and track revenue
- **💰 Service Management** - Add/edit services with pricing and duration
- **📈 Analytics** - View booking statistics and performance metrics

### For Stylists
- **🎨 Portfolio Management** - Upload and manage portfolio images (Base64 conversion)
- **📅 Booking Management** - Accept/decline bookings and mark as complete
- **⭐ Reviews** - View customer reviews and ratings
- **💼 Earnings Tracking** - Monitor your earnings and performance

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router) - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **ShadCN/ui** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations
- **Leaflet + React-Leaflet** - Interactive maps
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - Serverless backend
- **Prisma ORM** - Database toolkit
- **SQLite** - Lightweight database (easily swappable to PostgreSQL)
- **NextAuth.js** - Authentication with JWT strategy
- **bcryptjs** - Password hashing

### AI Integration
- **FreeLLM API** - AI-powered beauty planning and inspiration analysis
- **Custom Prompts** - Tailored AI responses with salon/stylist recommendations

### Deployment
- **Vercel** - Hosting and deployment
- **GitHub** - Version control

---

## 🎨 Design

GlamSync features a premium **Jewel Gold** color theme with warm cream backgrounds and elegant gold/bronze accents, creating a luxurious and inviting user experience.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shashank9585/Glamsync.git
cd Glamsync```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
FREE_LLM_API_KEY="your-api-key"
FREE_LLM_ENDPOINT="https://apifreellm.com/api/v1/chat"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Schema

The application uses the following models:
- **User** - Customers, salon owners, and stylists
- **Salon** - Beauty salons with services and locations
- **Stylist** - Individual stylists with portfolios
- **Service** - Services offered by salons
- **Booking** - Appointment bookings
- **Review** - Customer reviews
- **PortfolioImage** - Stylist portfolio images
- **BeautyPlan** - AI-generated beauty plans

---

## 🌍 Deployment

This project is deployed on **Vercel**:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy!

**Live URL:** [https://glamsync-yarf.vercel.app/](https://glamsync-yarf.vercel.app/)

---

## 📝 Future Enhancements

- [ ] Cloud database integration (Supabase/PostgreSQL)
- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] Real-time chat between customers and stylists
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Image upload to cloud storage (AWS S3/Cloudinary)

---

## 🤝 Contributing

This is a portfolio/demo project. Feel free to fork and customize for your own needs!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by Shashank

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [ShadCN/ui](https://ui.shadcn.com/)
- [Unsplash](https://unsplash.com/) for beautiful images
- [FreeLLM](https://apifreellm.com/) for AI integration

---

**⭐ If you like this project, consider giving it a star on GitHub!**
```

