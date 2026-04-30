export const servicesData = [
  {
    title: "Frontend Development",
    price: "Starting from $80",
    description:
      "Transform designs into pixel-perfect, interactive web experiences. I build responsive applications with React, implement smooth animations with GSAP, and ensure flawless performance across all devices—delivering interfaces that users love to interact with.",
    items: [
      {
        title: "React Development",
        description:
          "(Component Architecture, Hooks, State Management, Context API)",
      },
      {
        title: "Modern Styling",
        description:
          "(Tailwind CSS, Shadcn UI, Responsive Design, GSAP Animations)",
      },
      {
        title: "UI/UX Implementation",
        description:
          "(Figma to Code, Pixel-Perfect Layouts, Interactive Components)",
      },
    ],
  },
  {
    title: "Business Website Development",
    price: "Starting from $80",
    description:
      "Help local businesses and startups establish their digital presence. I create professional, conversion-focused websites tailored to any industry—from salons and auto detailing to corporate gifting and retail. Fast turnaround, modern design, and built to drive real business results.",
    items: [
      {
        title: "Industry-Specific Solutions",
        description: "(E-commerce, Services, Corporate, Retail, Any Niche)",
      },
      {
        title: "Conversion-Focused Design",
        description: "(Lead Generation, Booking Systems, Contact Forms, CTAs)",
      },
      {
        title: "Rapid Deployment",
        description:
          "(Quick Launch, SEO Ready, Mobile Optimized, Analytics Integrated)",
      },
    ],
  },
  {
    title: "Web Development & Deployment",
    price: "Starting from $50",
    description:
      "Take your projects from code to live production. I handle complete deployment workflows on Vercel and Netlify, optimize performance for Lighthouse 90+ scores, and ensure your application runs smoothly with proper version control and CI/CD practices.",
    items: [
      {
        title: "Deployment & Hosting",
        description: "(Vercel, Netlify, GitHub Pages, Domain Configuration)",
      },
      {
        title: "Performance Optimization",
        description:
          "(Lighthouse Optimization, Asset Compression, Lazy Loading)",
      },
      {
        title: "Version Control",
        description: "(Git, GitHub, Collaborative Workflows, Code Reviews)",
      },
    ],
  },
  {
    title: "AI Integration & Automation",
    price: "Starting from $120",
    description:
      "Bring intelligence to your applications with cutting-edge AI capabilities. I integrate pre-trained models, implement LangChain workflows, and build automated systems using Python—transforming raw data into actionable insights and smart automation.",
    items: [
      {
        title: "Python Development",
        description: "(NumPy, Pandas, Data Processing, Automation Scripts)",
      },
      {
        title: "AI/ML Integration",
        description: "(LangChain, PyTorch Fundamentals, Hugging Face Models)",
      },
      {
        title: "Data Processing",
        description:
          "(API Integration, Data Visualization, Workflow Automation)",
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Fine Cuts Gents Salon",
    description:
      "A professional landing page for Abu Dhabi's premier men's grooming salon, featuring service showcases, booking information, and responsive design optimized for mobile and desktop users seeking premium barbering services.",
    href: "https://finecuts-salon.vercel.app/",
    github: "https://github.com/ShayanGaba/Finecuts-salon",
    image: "/assets/projects/finecuts.png",
    // bgImage: "/assets/backgrounds/finecuts.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Vercel" },
    ],
  },
  {
    id: 2,
    name: "Detailing Crew - Car Care Services",
    description:
      "A modern web application for automotive detailing services, showcasing service packages, pricing, and booking functionality. Built with a focus on visual appeal and user-friendly navigation for car enthusiasts.",
    href: "https://detailing-crew.vercel.app/",
    github: "https://github.com/ShayanGaba/Detailing-Crew-Islamabad",
    image: "/assets/projects/detailing-crew.png",
    // bgImage: "/assets/backgrounds/detailing-crew.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Vercel" },
    ],
  },
  {
    id: 3,
    name: "Krystal - AI Powered Corporate Gifting Platform",
    description:
      "Krystal is a full-stack React/TypeScript web application for luxury corporate gifting. It features an AI gift matching engine, a curated product catalogue, cart and wishlist management, and a WhatsApp-first ordering flow designed for the Pakistani market.",
    href: "https://krystal-gifting.vercel.app/",
    github: "https://github.com/ShayanGaba/krystal-gifting",
    status: "In Progress",
    image: "/assets/projects/krystal-gifting.png",
    // bgImage: "/assets/backgrounds/krystal-gifting.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Framer Motion" },
      { id: 4, name: "Vercel" },
    ],
  },
  {
    id: 4,
    name: "Agentic AI System - Multi-Agent Platform",
    description:
      "An intelligent multi-agent system built with Python, LangChain, and PyTorch. Features tool-using agents, vector database integration with ChromaDB, and NLP capabilities for automated workflows and decision-making processes.",
    href: "",
    github: "https://github.com/ShayanGaba",
    status: "In Development",
    // image: "/assets/projects/agentic-ai.jpg",
    // bgImage: "/assets/backgrounds/ai-neural.jpg",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "LangChain" },
      { id: 3, name: "PyTorch" },
      { id: 4, name: "ChromaDB" },
      { id: 5, name: "Hugging Face" },
    ],
  },
  {
    id: 5,
    name: "Quizora - Interactive Quiz Platform",
    description:
      "A modern quiz application featuring timer-based questions, score tracking, and smooth animations. Built with React and Vite for optimal performance, showcasing clean UI/UX design with the Manrope font family.",
    href: "https://quizora-shayan.vercel.app",
    github: "https://github.com/ShayanGaba/Quizora-React",
    image: "/assets/projects/quizora.png",
    // bgImage: "/assets/backgrounds/quizora.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Vite" },
      { id: 3, name: "JavaScript ES6+" },
      { id: 4, name: "CSS3" },
    ],
  },
  {
    id: 6,
    name: "Pokédex - Pokemon Encyclopedia",
    description:
      "An interactive encyclopedia for the first 151 Pokemon with real-time search, type filtering, and detailed stat displays. Integrates PokeAPI for dynamic data fetching, featuring favorites system with localStorage persistence and dark/light theme toggle.",
    href: "https://shayan-pokedex.vercel.app/",
    github: "https://github.com/ShayanGaba/React-Pokedex-App",
    image: "/assets/projects/pokedex.png",
    // bgImage: "/assets/backgrounds/pokedex.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "PokeAPI" },
      { id: 3, name: "Vite" },
      { id: 4, name: "CSS3" },
    ],
  },
  {
    id: 7,
    name: "Task Master - Todo Application",
    description:
      "A responsive task management application with local storage persistence, enabling users to create, edit, delete, and organize tasks efficiently. Features a clean modern interface with smooth transitions and intuitive UX design.",
    href: "https://todo-shayan.vercel.app/",
    github: "https://github.com/ShayanGaba/Todo-App",
    image: "/assets/projects/todo.png",
    // bgImage: "/assets/backgrounds/todo.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Local Storage API" },
      { id: 3, name: "Vite" },
      { id: 4, name: "CSS3" },
    ],
  },

  {
    id: 8,
    name: "Portfolio V1 - Web Development Showcase",
    description:
      "My first portfolio website built with vanilla HTML, CSS, and JavaScript, featuring custom SVG graphics and smooth animations. Demonstrates foundational web development skills and creative design implementation.",
    href: "https://portfolio-shayan.vercel.app/",
    github: "https://github.com/ShayanGaba/PortFolio",
    image: "/assets/projects/portfolio-v1.png",
    // bgImage: "/assets/backgrounds/portfolio-v1.png",
    frameworks: [
      { id: 1, name: "HTML5" },
      { id: 2, name: "CSS3" },
      { id: 3, name: "Vanilla JavaScript" },
      { id: 4, name: "SVG Graphics" },
    ],
  },
];

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/ShayanGaba",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shayangaba/",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
  },
];
