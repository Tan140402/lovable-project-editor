import { motion, AnimatePresence } from 'framer-motion';
import { SectionType } from '../SpacePortfolio';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

interface UIOverlayProps {
  currentSection: SectionType;
  portfolioData: any;
  navigationItems: any[];
  onSectionChange: (section: SectionType) => void;
}

const UIOverlay = ({ currentSection, portfolioData }: UIOverlayProps) => {
  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-cosmic bg-clip-text text-transparent">
              {portfolioData.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {portfolioData.title}
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" size="lg" className="shadow-glow-energy">
                🌌 Khám phá thiên hà
              </Button>
              <Button variant="outline" size="lg">
                🚀 Xem dự án
              </Button>
            </div>
          </motion.div>
        );

      case 'projects':
        return (
          <motion.div
            key="projects"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                Project Galaxy
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.sections.projects.map((project: any) => (
                <Card key={project.id} className="group hover:shadow-glow-accent transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.name}
                      <div className="flex gap-2">
                        {project.demo && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-xs px-2 py-1 hover:bg-primary/20"
                          >
                            🚀 Demo
                          </Button>
                        )}
                        {project.github && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-xs px-2 py-1 hover:bg-primary/20"
                          >
                            💻 Code
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            key="skills"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-warp bg-clip-text text-transparent">
                Skills Nebula
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolioData.sections.skills.map((skillGroup: any, index: number) => (
                <Card key={skillGroup.category} className="hover:shadow-glow-energy transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-primary">{skillGroup.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill: string) => (
                        <Badge key={skill} variant="outline" className="hover:bg-primary/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        );

      case 'timeline':
        return (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-cosmic bg-clip-text text-transparent">
                Timeline Dimension
              </span>
            </h2>
            <div className="space-y-6">
              {portfolioData.sections.timeline.map((item: any, index: number) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <Card className="hover:shadow-glow-accent transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-4">
                        <Badge variant="default" className="text-lg px-3 py-1">
                          {item.year}
                        </Badge>
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-warp bg-clip-text text-transparent">
                Contact Station
              </span>
            </h2>
            <Card className="shadow-glow-energy">
              <CardHeader>
                <CardTitle>Kết nối xuyên thiên hà</CardTitle>
                <CardDescription>
                  Sẵn sàng cho một cuộc hợp tác liên sao?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="default" size="lg" className="shadow-glow-energy">
                    📡 Gửi tin nhắn
                  </Button>
                  <Button variant="outline" size="lg">
                    📄 Tải CV
                  </Button>
                </div>
                <div className="flex gap-4 justify-center pt-4">
                  <Badge variant="secondary" className="text-sm">
                    Email: {portfolioData.sections.contact.email}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center p-8">
      <div className="pointer-events-auto max-h-[80vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UIOverlay;