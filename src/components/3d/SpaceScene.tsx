import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SectionType } from '../SpacePortfolio';
import Spaceship from './Spaceship';
import Planet from './Planet';
import Asteroid from './Asteroid';
import BlackHole from './BlackHole';

interface SpaceSceneProps {
  currentSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

const SpaceScene = ({ currentSection, onSectionChange }: SpaceSceneProps) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Define planet positions and properties - realistic solar system inspired
  const planets = useMemo(() => [
    // Active sections
    {
      id: 'projects' as SectionType,
      position: new THREE.Vector3(18, 6, -12),
      color: '#4A90E2',
      size: 2.2,
      label: 'Projects Galaxy',
      planetType: 'earth' as const,
      isActive: true
    },
    {
      id: 'skills' as SectionType,
      position: new THREE.Vector3(-15, -10, -18),
      color: '#CD5C5C',
      size: 1.8,
      label: 'Skills Nebula',
      planetType: 'mars' as const,
      isActive: true
    },
    {
      id: 'timeline' as SectionType,
      position: new THREE.Vector3(12, -15, -25),
      color: '#DAA520',
      size: 2.5,
      label: 'Timeline Dimension',
      planetType: 'jupiter' as const,
      isActive: true
    },
    {
      id: 'contact' as SectionType,
      position: new THREE.Vector3(-22, 12, -10),
      color: '#FAD5A5',
      size: 2.0,
      label: 'Contact Station',
      planetType: 'saturn' as const,
      isActive: true
    },
    // Future expansion planets
    {
      id: 'home' as SectionType,
      position: new THREE.Vector3(25, -5, -8),
      color: '#FFC649',
      size: 1.4,
      label: 'Home Base',
      planetType: 'venus' as const,
      isActive: false
    },
    {
      id: 'home' as SectionType,
      position: new THREE.Vector3(-8, 18, -22),
      color: '#8C7853',
      size: 1.2,
      label: 'Archive World',
      planetType: 'mercury' as const,
      isActive: false
    },
    {
      id: 'home' as SectionType,
      position: new THREE.Vector3(30, 8, -30),
      color: '#4169E1',
      size: 2.3,
      label: 'Deep Space',
      planetType: 'neptune' as const,
      isActive: false
    },
    {
      id: 'home' as SectionType,
      position: new THREE.Vector3(-25, -18, -35),
      color: '#4FD0E7',
      size: 2.1,
      label: 'Ice World',
      planetType: 'uranus' as const,
      isActive: false
    }
  ], []);

  // Scene animations (removed automatic camera movement for free control)
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle rotation of the entire scene
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.02;
  });

  const handlePlanetClick = (sectionId: SectionType) => {
    onSectionChange(sectionId);
  };

  return (
    <group ref={groupRef}>
      {/* Enhanced Realistic Lighting */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Main sun light */}
      <directionalLight 
        position={[50, 50, 50]} 
        intensity={1.2} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Secondary lights for depth */}
      <pointLight position={[20, 20, 20]} intensity={0.8} color="#00BFFF" />
      <pointLight position={[-20, -20, 20]} intensity={0.6} color="#FF6B9D" />
      <pointLight position={[0, 30, -30]} intensity={0.4} color="#C77DFF" />
      
      {/* Rim lighting */}
      <spotLight
        position={[-50, 0, 50]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
      />
      
      {/* Stars background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />

      {/* Central Spaceship */}
      <Spaceship position={[0, 0, 0]} />

      {/* Planets for each section */}
      {planets.map((planet, index) => (
        <Planet
          key={`${planet.id}-${index}`}
          position={[planet.position.x, planet.position.y, planet.position.z]}
          color={planet.color}
          size={planet.size}
          label={planet.label}
          onClick={() => planet.isActive && handlePlanetClick(planet.id)}
          isActive={currentSection === planet.id && planet.isActive}
          planetType={planet.planetType}
        />
      ))}

      {/* Floating skill asteroids */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 25 + Math.random() * 10;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 20;

        // Skill names for asteroids
        const skills = [
          'React', 'TypeScript', 'Three.js', 'WebGL', 
          'Node.js', 'Python', 'Blender', 'GSAP'
        ];

        return (
          <Asteroid
            key={i}
            position={[x, y, z]}
            size={0.3 + Math.random() * 0.5}
            rotationSpeed={0.01 + Math.random() * 0.02}
            skill={skills[i]}
          />
        );
      })}

      {/* Black hole for timeline section */}
      <BlackHole position={[0, -30, -40]} />

      {/* Free Orbit Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.05}
        zoomSpeed={1.2}
        rotateSpeed={0.8}
        panSpeed={1.0}
        minDistance={2}
        maxDistance={500}
        autoRotate={false}
        autoRotateSpeed={0}
      />
    </group>
  );
};

export default SpaceScene;
