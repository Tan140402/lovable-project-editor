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

  // Define planet positions and properties
  const planets = useMemo(() => [
    {
      id: 'projects' as SectionType,
      position: new THREE.Vector3(15, 5, -10),
      color: '#00BFFF',
      size: 2,
      label: 'Projects Galaxy'
    },
    {
      id: 'skills' as SectionType,
      position: new THREE.Vector3(-12, -8, -15),
      color: '#FF6B9D',
      size: 1.5,
      label: 'Skills Nebula'
    },
    {
      id: 'timeline' as SectionType,
      position: new THREE.Vector3(8, -12, -20),
      color: '#C77DFF',
      size: 1.8,
      label: 'Timeline Dimension'
    },
    {
      id: 'contact' as SectionType,
      position: new THREE.Vector3(-20, 10, -8),
      color: '#7209B7',
      size: 1.3,
      label: 'Contact Station'
    }
  ], []);

  // Camera animations based on current section
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Gentle rotation of the entire scene
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    
    // Camera positioning based on current section
    const targetPosition = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    switch (currentSection) {
      case 'home':
        targetPosition.set(0, 0, 10);
        targetLookAt.set(0, 0, 0);
        break;
      case 'projects':
        targetPosition.set(12, 3, -5);
        targetLookAt.copy(planets[0].position);
        break;
      case 'skills':
        targetPosition.set(-8, -5, -10);
        targetLookAt.copy(planets[1].position);
        break;
      case 'timeline':
        targetPosition.set(5, -8, -15);
        targetLookAt.copy(planets[2].position);
        break;
      case 'contact':
        targetPosition.set(-15, 7, -3);
        targetLookAt.copy(planets[3].position);
        break;
    }

    // Smooth camera movement
    camera.position.lerp(targetPosition, 0.02);
    camera.lookAt(targetLookAt);
  });

  const handlePlanetClick = (sectionId: SectionType) => {
    onSectionChange(sectionId);
  };

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00BFFF" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#FF6B9D" />
      
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
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          position={[planet.position.x, planet.position.y, planet.position.z]}
          color={planet.color}
          size={planet.size}
          label={planet.label}
          onClick={() => handlePlanetClick(planet.id)}
          isActive={currentSection === planet.id}
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

      {/* Orbit Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.5}
        rotateSpeed={0.3}
        minDistance={5}
        maxDistance={50}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
    </group>
  );
};

export default SpaceScene;