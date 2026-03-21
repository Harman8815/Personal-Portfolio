# Developer Portfolio

A high-performance, immersive 3D portfolio built with Next.js and Three.js. Features interactive WebGL experiences, cinematic scroll animations, and a comprehensive showcase of projects, achievements, and technical expertise.

---

## Overview

This portfolio transcends traditional static websites by delivering a cinematic, interactive experience. It combines cutting-edge 3D graphics with smooth, performant animations to create a memorable presentation of professional work.

**Key Differentiators:**
- Interactive 3D hero section with real-time rendered laptop model
- Cinematic scroll-driven animations using GSAP ScrollTrigger
- Dynamic project detail pages with parallax backgrounds and system flow visualizations
- Real-time GitHub contribution heatmap and competitive programming statistics
- Custom loading orchestration with progress tracking

---

## Features

### Core Experience
- **Immersive 3D Hero** - Interactive laptop model with orbit controls and smooth camera transitions
- **Cinematic Scrolling** - GSAP-powered scroll animations with parallax layers and pinned sections
- **Dynamic Project Showcase** - Detailed project pages featuring architecture diagrams, tech stacks, and metrics
- **Loading Orchestration** - Custom loading screen with simulated progress and content readiness detection

### Content Sections
- **Projects Gallery** - Filterable project grid with modal previews and quick actions
- **Major Projects Carousel** - Embla-powered carousel with autoplay and gesture controls
- **Achievements Dashboard** - GitHub heatmap, LeetCode stats, HackerRank badges, and certification displays
- **Experience Timeline** - Animated career progression with Bloom effect transitions
- **Skills Visualization** - Interactive skill clouds and tier-based categorization
- **Contact Integration** - 3D Earth visualization with social link integration

### Technical Features
- **Auto-Scroll Controller** - Programmatic scroll management with pause/resume capabilities
- **Custom Cursor** - Context-aware cursor with hover states
- **Background Symbols** - Dynamic tech symbol animations that adapt to content context
- **Error Boundaries** - Comprehensive error handling with graceful fallbacks
- **Responsive Design** - Mobile-optimized 3D scenes and touch-friendly interactions

---

## Tech Stack

### Frontend
- **Next.js 14** - App Router, Server Components, Static Generation
- **React 18** - Concurrent features, Suspense boundaries
- **Tailwind CSS** - Utility-first styling with custom design tokens

### 3D & Animation
- **Three.js** - WebGL rendering and 3D scene management
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Helper components and abstractions
- **GSAP** - Advanced timeline animations and ScrollTrigger integration
- **Framer Motion** - React animation library for gestures and transitions

### State & Data
- **TanStack Query** - Server state management with caching
- **React Context** - Loading state and UI state management

### UI Components
- **Embla Carousel** - Lightweight, extensible carousel
- **Lucide React** - Consistent iconography
- **Recharts** - Data visualization for metrics

---

## Demo

**Live Site:** [https://your-portfolio-url.vercel.app](https://your-portfolio-url.vercel.app)

### Screenshots

| Hero Section | Projects | Achievements |
|-------------|----------|--------------|
| ![Hero](public/assets/images/MP1.png) | ![Projects](public/assets/images/MP2.png) | ![Achievements](public/assets/images/arrow-up.png) |

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or pnpm

### Steps

```bash
# Clone repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the portfolio.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.jsx           # Home with 3D hero
│   ├── layout.jsx         # Root layout with providers
│   ├── projects/page.jsx  # Projects listing
│   ├── project/[projectid]/page.jsx  # Dynamic project detail
│   ├── achievements/page.jsx
│   ├── certifications/page.jsx
│   ├── experience/page.jsx
│   ├── links/page.jsx
│   └── api/               # API routes
├── components/
│   ├── r3f/              # Three.js/React Three Fiber
│   │   ├── Hero/         # 3D laptop scene
│   │   └── project/      # Project 3D elements
│   ├── pages/            # Page-specific components
│   │   ├── achievements/
│   │   ├── experience/
│   │   ├── landing/
│   │   └── social/
│   ├── projectDetail/    # Project detail sections
│   ├── portfolio/        # Main portfolio sections
│   ├── majorProject/     # Carousel components
│   ├── projects/         # Project grid components
│   ├── skills/           # Skill visualization
│   ├── certifications/ # Certification displays
│   ├── common/           # Shared utilities
│   ├── layout/           # Navbar, Footer
│   └── loadingScreen/    # Loading experience
├── data/                 # Static data
│   ├── index.js         # Projects data
│   ├── achievements/    # Achievement datasets
│   └── certificationsData.js
├── context/             # React Context providers
└── hooks/               # Custom React hooks
```

---

## Usage

### Navigation Flow
1. **Landing** - Loading screen transitions to 3D hero with laptop model
2. **Scroll** - Scroll down triggers cinematic sequence through sections
3. **Projects** - Click any project card to view detailed case study
4. **Detail Pages** - Parallax scrolling through project architecture, metrics, and artifacts

### Key Interactions
- **3D Hero** - Drag to rotate laptop, scroll to trigger camera animations
- **Project Cards** - Hover for preview, click for full detail page
- **Carousel** - Swipe or use arrow keys for project navigation
- **Achievements** - Hover cards for detailed statistics

---

## Key Concepts

### 3D Architecture
The 3D scene uses `@react-three/fiber` for React integration with `three.js`. The laptop model is loaded via `useGLTF` with `useProgress` tracking for loading states. Camera animations are orchestrated through GSAP timelines synchronized with scroll position.

### Animation System
Animations follow a timeline-based architecture:
- **Loading Sequence** - Simulated progress (0-100%) with content readiness gates
- **Scroll Triggers** - GSAP ScrollTrigger pins sections and drives progress animations
- **Component Animations** - Framer Motion handles enter/exit transitions and gesture responses

### Data Flow
- Static project data in `data/index.js` with full project specifications
- Dynamic project pages use Next.js `generateStaticParams` for optimal loading
- GitHub data fetched via TanStack Query with SWR caching strategy

### Performance Optimizations
- `ssr: false` for 3D components to prevent hydration mismatches
- Dynamic imports with loading fallbacks for heavy components
- Image optimization via Next.js Image component
- Code splitting by route and component

---

## Future Improvements

- [ ] Dark/light theme toggle
- [ ] Blog section with MDX support
- [ ] Real-time GitHub activity feed
- [ ] Project filtering by tech stack
- [ ] Contact form with email integration
- [ ] Analytics dashboard for site metrics
- [ ] PWA support for offline viewing
- [ ] Multi-language support

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://harmandevexp.netlify.app/)

---

<p align="center">Built with Next.js, Three.js, and attention to detail.</p>
