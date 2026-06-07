# Mahip Bansal — Portfolio & AI Product Ecosystem 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-e10098?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

An executive, high-performance personal portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and **Framer Motion**. Designed with an dark obsidian glassmorphic UI, interactive Dynamic Programming state visualizer, live technical stock exchange, and an interactive 2D penguin mascot.

---

## ✨ Key Features

### 1. ⚡ Dynamic Programming (DP) State Engine (`UnifiedAboutSection`)
- **Sequential Story Mode Loop**: Visualizes career growth as a 6-node DP recurrence graph ($\text{dp}[0] \rightarrow \text{dp}[5]$).
- **Interactive State Inspection**: Click any node card or use `<` `>` state controls to step through mathematical state equations ($\text{dp}[i] = \max(\text{prev}) + \text{gain}$).
- **Step-Level Resume & Breather Gaps**: Seamlessly pauses/resumes animation with 2.3s hold times per node and 3.0s breather gaps at 100% optimum.

### 2. 🐧 Running Blue-Scarf Penguin Preloader & Mascot
- **Leg-Striding Running Animation**: Real leg & flipper motion as the penguin mascot runs across a full-width track while components load.
- **Smart Duration Engine**: Completes in ~4.0s for first-time visitors and ~2.0s for reloads via `sessionStorage`.
- **Interactive Website Companion**: Interactive 2D canvas penguin following scrolling and providing audio-visual feedback.

### 3. 📈 Technical Stock Exchange (`TechnicalStockExchange`)
- Displays technical skills (Next.js, React, TypeScript, C++, Python, PyTorch, RAG) formatted as a live financial stock market dashboard with sparkline trends and trading stats.

### 4. 💼 Digital Asset Exchange (`InvestmentPortfolioSection`)
- Interactive project showcase rendering active AI platforms (PA Roxxx OS, JARVIS AI Assistant) and future stealth projects.
- **Mobile Responsive Layout**: Flex responsive rows with zero text overlapping on mobile screens.
- **Executive Project Modals**: Deep-dive modals with executive overviews, problem statements, market signals, and live demo links.

### 5. 📅 Native Mobile Meeting Scheduler (`ExecutiveBoardroomContactSection`)
- **Direct Native App Launch**: Submitting a meeting request triggers a `mailto:` protocol link that **automatically opens the native Gmail / Mail App** on smartphones without web browser login prompts.
- Pre-fills requester name, email, preferred date/time, and agenda directly in the email body.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Directory Structure

```text
portfolio-website/
├── public/
│   └── images personal/     # High-resolution media assets
├── src/
│   ├── app/
│   │   ├── globals.css      # Custom design system tokens
│   │   ├── layout.tsx       # Root layout wrapper
│   │   └── page.tsx         # Main portfolio entry route
│   └── components/
│       ├── About/           # DP Recurrence State Machine Visualizer
│       ├── Chat/            # AI Assistant Bot Drawer
│       ├── Companion/       # Interactive Blue-Scarf Penguin Companion
│       ├── Contact/         # Boardroom Contact & Meeting Scheduler
│       ├── Hero/            # 3D Z-Axis Parallax Landing Hero
│       ├── Navigation/      # Executive Glass Sticky Navbar
│       ├── Position/        # Career Timeline & Current Position
│       ├── Preloader/       # Fast Running Penguin Preloader
│       ├── Projects/        # Digital Asset Project Exchange & Modals
│       └── Skills/          # Technical Stock Exchange Dashboard
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mahipbansal/portfolio-website.git
   cd portfolio-website
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the live app.

---

## 📬 Contact & Connect

- **Email**: [bansalmahip84@gmail.com](mailto:bansalmahip84@gmail.com)
- **WhatsApp**: [+91 80000 19771](https://wa.me/918000019771)
- **LinkedIn**: [linkedin.com/in/mahip-bansal](https://www.linkedin.com/in/mahip-bansal)
- **GitHub**: [github.com/mahipbansal](https://github.com/mahipbansal)

---

Designed & Built with precision by **Mahip Bansal**.
