import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
  onClick: () => void;
  isActive: boolean;
  planetType?: 'earth' | 'mars' | 'jupiter' | 'saturn' | 'venus' | 'mercury' | 'neptune' | 'uranus';
}

const Planet = ({ position, color, size, label, onClick, isActive, planetType = 'earth' }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Planet configurations based on real solar system
  const planetConfigs = {
    earth: {
      mainColor: '#4A90E2',
      secondaryColor: '#2E7D32',
      atmosphereColor: '#87CEEB',
      hasRings: false,
      cloudOpacity: 0.3,
      emissiveIntensity: 0.1
    },
    mars: {
      mainColor: '#CD5C5C',
      secondaryColor: '#8B4513',
      atmosphereColor: '#FFA07A',
      hasRings: false,
      cloudOpacity: 0.1,
      emissiveIntensity: 0.05
    },
    jupiter: {
      mainColor: '#DAA520',
      secondaryColor: '#B8860B',
      atmosphereColor: '#F4A460',
      hasRings: true,
      cloudOpacity: 0.4,
      emissiveIntensity: 0.15
    },
    saturn: {
      mainColor: '#FAD5A5',
      secondaryColor: '#DEB887',
      atmosphereColor: '#F5DEB3',
      hasRings: true,
      cloudOpacity: 0.3,
      emissiveIntensity: 0.1
    },
    venus: {
      mainColor: '#FFC649',
      secondaryColor: '#FFB347',
      atmosphereColor: '#FFFF99',
      hasRings: false,
      cloudOpacity: 0.6,
      emissiveIntensity: 0.2
    },
    mercury: {
      mainColor: '#8C7853',
      secondaryColor: '#A0522D',
      atmosphereColor: '#D2B48C',
      hasRings: false,
      cloudOpacity: 0.1,
      emissiveIntensity: 0.05
    },
    neptune: {
      mainColor: '#4169E1',
      secondaryColor: '#0000CD',
      atmosphereColor: '#6495ED',
      hasRings: true,
      cloudOpacity: 0.4,
      emissiveIntensity: 0.12
    },
    uranus: {
      mainColor: '#4FD0E7',
      secondaryColor: '#40E0D0',
      atmosphereColor: '#AFEEEE',
      hasRings: true,
      cloudOpacity: 0.3,
      emissiveIntensity: 0.1
    }
  };

  const config = planetConfigs[planetType];

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Planet rotation (different speeds for realism)
    const rotationSpeed = planetType === 'jupiter' ? 0.02 : planetType === 'saturn' ? 0.015 : 0.01;
    meshRef.current.rotation.y += rotationSpeed;
    
    // Orbit animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.3;
    
    // Atmosphere pulsing
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
    }
    
    // Rings rotation
    if (ringsRef.current && config.hasRings) {
      ringsRef.current.rotation.z += 0.005;
    }
    
    // Scale effect when active or hovered
    const targetScale = isActive ? 1.4 : hovered ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onClick();
  };

  // Create surface texture pattern
  const createSurfaceTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Base color
    ctx.fillStyle = config.mainColor;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add surface details based on planet type
    if (planetType === 'earth') {
      // Continents
      ctx.fillStyle = config.secondaryColor;
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const w = 50 + Math.random() * 100;
        const h = 30 + Math.random() * 60;
        ctx.fillRect(x, y, w, h);
      }
    } else if (planetType === 'jupiter' || planetType === 'saturn') {
      // Gas giant bands
      for (let i = 0; i < 256; i += 20) {
        ctx.fillStyle = i % 40 === 0 ? config.secondaryColor : config.mainColor;
        ctx.fillRect(0, i, 512, 20);
      }
    } else if (planetType === 'mars') {
      // Craters and surface features
      ctx.fillStyle = config.secondaryColor;
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = 5 + Math.random() * 15;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const surfaceTexture = createSurfaceTexture();

  return (
    <group ref={groupRef} position={position}>
      {/* Planet atmosphere */}
      <mesh 
        ref={atmosphereRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size * 1.1, 64, 32]} />
        <meshStandardMaterial 
          color={config.atmosphereColor}
          transparent 
          opacity={config.cloudOpacity}
          emissive={config.atmosphereColor}
          emissiveIntensity={isActive ? config.emissiveIntensity * 2 : config.emissiveIntensity}
        />
      </mesh>

      {/* Main planet */}
      <mesh 
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 64, 32]} />
        <meshStandardMaterial 
          map={surfaceTexture}
          metalness={0.1}
          roughness={0.8}
          emissive={config.mainColor}
          emissiveIntensity={isActive ? config.emissiveIntensity * 1.5 : config.emissiveIntensity * 0.5}
        />
      </mesh>

      {/* Planetary rings */}
      {config.hasRings && (
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.3, size * 1.8, 64]} />
            <meshStandardMaterial 
              color={config.secondaryColor}
              transparent 
              opacity={0.6}
              side={THREE.DoubleSide}
              emissive={config.secondaryColor}
              emissiveIntensity={0.1}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <ringGeometry args={[size * 1.9, size * 2.2, 64]} />
            <meshStandardMaterial 
              color={config.atmosphereColor}
              transparent 
              opacity={0.3}
              side={THREE.DoubleSide}
              emissive={config.atmosphereColor}
              emissiveIntensity={0.05}
            />
          </mesh>
        </group>
      )}

      {/* Selection rings when active */}
      {isActive && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 2.5, size * 2.7, 32]} />
            <meshStandardMaterial 
              color="#00BFFF"
              transparent 
              opacity={0.8}
              emissive="#00BFFF"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 3]}>
            <ringGeometry args={[size * 2.8, size * 3.0, 32]} />
            <meshStandardMaterial 
              color="#C77DFF"
              transparent 
              opacity={0.6}
              emissive="#C77DFF"
              emissiveIntensity={0.3}
            />
          </mesh>
        </>
      )}

      {/* Planet label */}
      {(hovered || isActive) && (
        <Text
          position={[0, size + 1.5, 0]}
          fontSize={0.6}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {label}
        </Text>
      )}

      {/* Orbital moons/satellites */}
      {(planetType === 'earth' || planetType === 'jupiter' || planetType === 'saturn') && (
        <>
          {Array.from({ length: planetType === 'jupiter' ? 4 : planetType === 'saturn' ? 3 : 1 }).map((_, i) => {
            const angle = (i / (planetType === 'jupiter' ? 4 : planetType === 'saturn' ? 3 : 1)) * Math.PI * 2;
            const orbitRadius = size * (3 + i * 0.5);
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            
            return (
              <mesh key={i} position={[x, 0, z]}>
                <sphereGeometry args={[0.1, 16, 8]} />
                <meshStandardMaterial 
                  color="#CCCCCC"
                  emissive="#CCCCCC"
                  emissiveIntensity={0.3}
                />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
};

export default Planet;
