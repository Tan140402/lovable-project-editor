import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpaceScene from './3d/SpaceScene';
import UIOverlay from './ui/UIOverlay';
import LoadingScreen from './ui/LoadingScreen';
import WarpTransition from './ui/WarpTransition';
import NPCAvatar from './AI/NPCAvatar';
import { Button } from './ui/button';

export type SectionType = 'home' | 'projects' | 'skills' | 'timeline' | 'contact';

interface PortfolioData {
  name: string;
  title: string;
  sections: {
    projects: Array<{
      id: string;
      name: string;
      description: string;
      tech: string[];
      demo?: string;
      github?: string;
    }>;
    skills: Array<{
      category: string;
      items: string[];
    }>;
    timeline: Array<{
      year: string;
      title: string;
      description: string;
    }>;
    contact: {
      email: string;
      linkedin?: string;
      github?: string;
    };
  };
}

// Demo data - customize this for your portfolio
const portfolioData: PortfolioData = {
  name: "Space Explorer",
  title: "Full Stack Developer & 3D Enthusiast",
  sections: {
    projects: [
      {
        id: "cosmic-web",
        name: "Cosmic Web Platform",
        description: "Interactive 3D space exploration platform built with React Three Fiber",
        tech: ["React", "Three.js", "TypeScript", "WebGL"],
        demo: "#",
        github: "#"
      },
      {
        id: "nebula-ui",
        name: "Nebula UI Library",
        description: "Component library with space-themed animations and effects",
        tech: ["React", "Framer Motion", "Storybook", "CSS"],
        github: "#"
      }
    ],
    skills: [
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Three.js", "WebGL", "Next.js"]
      },
      {
        category: "3D & Animation",
        items: ["Three.js", "React Three Fiber", "Blender", "GSAP", "Framer Motion"]
      },
      {
        category: "Backend",
        items: ["Node.js", "Python", "PostgreSQL", "GraphQL", "REST APIs"]
      }
    ],
    timeline: [
      {
        year: "2024",
        title: "Senior Frontend Developer",
        description: "Led 3D web development projects and interactive experiences"
      },
      {
        year: "2023",
        title: "Full Stack Developer",
        description: "Developed modern web applications with focus on user experience"
      },
      {
        year: "2022",
        title: "Started Web Development Journey",
        description: "Began learning modern web technologies and 3D programming"
      }
    ],
    contact: {
      email: "explorer@space.dev",
      linkedin: "linkedin.com/in/space-explorer",
      github: "github.com/space-explorer"
    }
  }
};

const SpacePortfolio = () => {
  const [currentSection, setCurrentSection] = useState<SectionType>('home');
  const [isWarping, setIsWarping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showNPC, setShowNPC] = useState(false);

  const handleSectionChange = (section: SectionType) => {
    if (section === currentSection) return;
    
    setIsWarping(true);
    setTimeout(() => {
      setCurrentSection(section);
      setTimeout(() => setIsWarping(false), 1000);
    }, 1000);
  };

  const navigationItems = [
    { id: 'home' as SectionType, label: 'Trang chủ', symbol: '🏠' },
    { id: 'projects' as SectionType, label: 'Dự án', symbol: '🌌' },
    { id: 'skills' as SectionType, label: 'Kỹ năng', symbol: '⚡' },
    { id: 'timeline' as SectionType, label: 'Thời gian', symbol: '🕰️' },
    { id: 'contact' as SectionType, label: 'Liên hệ', symbol: '📡' },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-space-deep">
      {/* Background Nebula */}
      <div className="absolute inset-0 bg-gradient-nebula opacity-30" />
      
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        className="absolute inset-0"
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SpaceScene 
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
          />
        </Suspense>
      </Canvas>

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Warp Transition */}
      <AnimatePresence>
        {isWarping && <WarpTransition />}
      </AnimatePresence>

      {/* UI Overlay */}
      {!loading && (
        <UIOverlay
          currentSection={currentSection}
          portfolioData={portfolioData}
          navigationItems={navigationItems}
          onSectionChange={handleSectionChange}
        />
      )}

      {/* Navigation */}
      {!loading && !isWarping && (
        <motion.nav
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
        >
          <div className="flex flex-col gap-3 p-4 bg-card/90 backdrop-blur-md rounded-xl border border-border shadow-cosmic">
            {navigationItems.map(({ id, label, symbol }) => (
              <Button
                key={id}
                variant={currentSection === id ? "default" : "ghost"}
                size="sm"
                onClick={() => handleSectionChange(id)}
                className={`
                  relative group transition-all duration-300 justify-start
                  ${currentSection === id 
                    ? 'shadow-glow-energy bg-primary text-primary-foreground' 
                    : 'hover:shadow-glow-accent hover:bg-accent/20'
                  }
                `}
              >
                <span className="text-base mr-3">{symbol}</span>
                <span className="text-sm font-medium">{label}</span>
                
                {/* Hover tooltip */}
                <div className="absolute left-full ml-3 px-3 py-1 bg-card/95 backdrop-blur-sm rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap border border-border shadow-lg">
                  {label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
                </div>
              </Button>
            ))}
            
            {/* AI Navigator Button */}
            <div className="border-t border-border pt-3 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNPC(true)}
                className="w-full justify-start group hover:shadow-glow-accent hover:border-primary/40 transition-all duration-300"
              >
                <span className="text-base mr-3">🤖</span>
                <span className="text-sm font-medium">AI Guide</span>
                
                <div className="absolute left-full ml-3 px-3 py-1 bg-card/95 backdrop-blur-sm rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap border border-border shadow-lg">
                  Chat với AI Navigator
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
                </div>
              </Button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* AI NPC Chat */}
      <NPCAvatar 
        isVisible={showNPC} 
        onClose={() => setShowNPC(false)} 
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-star-white rounded-full animate-star-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpacePortfolio;