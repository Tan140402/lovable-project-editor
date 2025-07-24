import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
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
  orbitRadius?: number;
  orbitSpeed?: number;
  rotationSpeed?: number;
}

const Planet = ({ 
  position, 
  color, 
  size, 
  label, 
  onClick, 
  isActive, 
  planetType = 'earth',
  orbitRadius = 0,
  orbitSpeed = 0.001,
  rotationSpeed = 0.01
}: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const orbitPivotRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Realistic planet data based on solar system simulator
  const planetConfigs = {
    earth: {
      mainColor: '#6B93D6',
      secondaryColor: '#4F7942',
      atmosphereColor: '#87CEEB',
      hasRings: false,
      cloudOpacity: 0.3,
      emissiveIntensity: 0.1,
      metalness: 0.0,
      roughness: 0.9,
      hasAtmosphere: true
    },
    mars: {
      mainColor: '#CD5C5C',
      secondaryColor: '#8B4513',
      atmosphereColor: '#FFA07A',
      hasRings: false,
      cloudOpacity: 0.1,
      emissiveIntensity: 0.05,
      metalness: 0.0,
      roughness: 0.95,
      hasAtmosphere: false
    },
    jupiter: {
      mainColor: '#D8CA9D',
      secondaryColor: '#B8860B',
      atmosphereColor: '#F4A460',
      hasRings: true,
      cloudOpacity: 0.4,
      emissiveIntensity: 0.15,
      metalness: 0.0,
      roughness: 0.8,
      hasAtmosphere: true
    },
    saturn: {
      mainColor: '#FAD5A5',
      secondaryColor: '#DEB887',
      atmosphereColor: '#F5DEB3',
      hasRings: true,
      cloudOpacity: 0.3,
      emissiveIntensity: 0.1,
      metalness: 0.0,
      roughness: 0.8,
      hasAtmosphere: true
    },
    venus: {
      mainColor: '#FFC649',
      secondaryColor: '#FFB347',
      atmosphereColor: '#FFFF99',
      hasRings: false,
      cloudOpacity: 0.8,
      emissiveIntensity: 0.2,
      metalness: 0.0,
      roughness: 0.7,
      hasAtmosphere: true
    },
    mercury: {
      mainColor: '#8C7853',
      secondaryColor: '#A0522D',
      atmosphereColor: '#D2B48C',
      hasRings: false,
      cloudOpacity: 0.0,
      emissiveIntensity: 0.05,
      metalness: 0.1,
      roughness: 0.95,
      hasAtmosphere: false
    },
    neptune: {
      mainColor: '#4169E1',
      secondaryColor: '#0000CD',
      atmosphereColor: '#6495ED',
      hasRings: true,
      cloudOpacity: 0.4,
      emissiveIntensity: 0.12,
      metalness: 0.0,
      roughness: 0.7,
      hasAtmosphere: true
    },
    uranus: {
      mainColor: '#4FD0E7',
      secondaryColor: '#40E0D0',
      atmosphereColor: '#AFEEEE',
      hasRings: true,
      cloudOpacity: 0.3,
      emissiveIntensity: 0.1,
      metalness: 0.0,
      roughness: 0.7,
      hasAtmosphere: true
    }
  };

  const config = planetConfigs[planetType];

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Orbital motion around center (like real solar system)
    if (orbitPivotRef.current && orbitRadius > 0) {
      orbitPivotRef.current.rotation.y += orbitSpeed;
    }
    
    // Planet rotation on its axis
    meshRef.current.rotation.y += rotationSpeed;
    
    // Atmosphere pulsing
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.01);
    }
    
    // Rings rotation
    if (ringsRef.current && config.hasRings) {
      ringsRef.current.rotation.z += 0.003;
    }
    
    // Scale effect when active or hovered
    const targetScale = isActive ? 1.3 : hovered ? 1.1 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onClick();
  };

  // Create realistic surface texture
  const createSurfaceTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Base color
    ctx.fillStyle = config.mainColor;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Add surface details based on planet type
    if (planetType === 'earth') {
      // Continents and oceans
      ctx.fillStyle = config.secondaryColor;
      for (let i = 0; i < 12; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const w = 80 + Math.random() * 150;
        const h = 40 + Math.random() * 80;
        ctx.fillRect(x, y, w, h);
      }
      // Add some islands
      ctx.fillStyle = '#2F5233';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const r = 5 + Math.random() * 15;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (planetType === 'jupiter' || planetType === 'saturn') {
      // Gas giant bands
      for (let i = 0; i < 512; i += 15) {
        const shade = Math.sin(i * 0.02) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(${parseInt(config.mainColor.slice(1, 3), 16) * shade}, ${parseInt(config.mainColor.slice(3, 5), 16) * shade}, ${parseInt(config.mainColor.slice(5, 7), 16) * shade}, 1)`;
        ctx.fillRect(0, i, 1024, 15);
      }
      // Add storm spots
      if (planetType === 'jupiter') {
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(300, 200, 40, 25, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (planetType === 'mars') {
      // Craters and surface features
      ctx.fillStyle = config.secondaryColor;
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const r = 3 + Math.random() * 20;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Polar ice caps
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 30);
      ctx.fillRect(0, 482, 1024, 30);
    } else if (planetType === 'venus') {
      // Thick atmosphere with swirls
      for (let i = 0; i < 512; i += 10) {
        const opacity = Math.sin(i * 0.05) * 0.2 + 0.8;
        ctx.fillStyle = `rgba(255, 198, 73, ${opacity})`;
        ctx.fillRect(0, i, 1024, 10);
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const surfaceTexture = createSurfaceTexture();

  return (
    <group ref={orbitPivotRef} position={orbitRadius > 0 ? [0, 0, 0] : position}>
      <group ref={groupRef} position={orbitRadius > 0 ? [orbitRadius, 0, 0] : [0, 0, 0]}>
        {/* Planet atmosphere */}
        {config.hasAtmosphere && (
          <mesh 
            ref={atmosphereRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <sphereGeometry args={[size * 1.05, 64, 32]} />
            <meshStandardMaterial 
              color={config.atmosphereColor}
              transparent 
              opacity={config.cloudOpacity}
              emissive={config.atmosphereColor}
              emissiveIntensity={isActive ? config.emissiveIntensity * 2 : config.emissiveIntensity}
            />
          </mesh>
        )}

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
            metalness={config.metalness}
            roughness={config.roughness}
            emissive={config.mainColor}
            emissiveIntensity={isActive ? config.emissiveIntensity * 1.5 : config.emissiveIntensity * 0.3}
          />
        </mesh>

        {/* Planetary rings */}
        {config.hasRings && (
          <group ref={ringsRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 1.2, size * 1.8, 64]} />
              <meshStandardMaterial 
                color={config.secondaryColor}
                transparent 
                opacity={0.7}
                side={THREE.DoubleSide}
                emissive={config.secondaryColor}
                emissiveIntensity={0.1}
              />
            </mesh>
            {planetType === 'saturn' && (
              <>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[size * 1.9, size * 2.3, 64]} />
                  <meshStandardMaterial 
                    color={config.atmosphereColor}
                    transparent 
                    opacity={0.5}
                    side={THREE.DoubleSide}
                    emissive={config.atmosphereColor}
                    emissiveIntensity={0.05}
                  />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[size * 2.4, size * 2.7, 64]} />
                  <meshStandardMaterial 
                    color={config.mainColor}
                    transparent 
                    opacity={0.3}
                    side={THREE.DoubleSide}
                    emissive={config.mainColor}
                    emissiveIntensity={0.03}
                  />
                </mesh>
              </>
            )}
          </group>
        )}

        {/* Selection rings when active */}
        {isActive && (
          <>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 3.0, size * 3.2, 32]} />
              <meshStandardMaterial 
                color="#00BFFF"
                transparent 
                opacity={0.8}
                emissive="#00BFFF"
                emissiveIntensity={0.5}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, Math.PI / 3]}>
              <ringGeometry args={[size * 3.3, size * 3.5, 32]} />
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
            position={[0, size + 2, 0]}
            fontSize={0.8}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {label}
          </Text>
        )}

        {/* Moons */}
        {planetType === 'earth' && (
          <mesh position={[size * 2.5, 0, 0]}>
            <sphereGeometry args={[size * 0.27, 16, 16]} />
            <meshStandardMaterial 
              color="#CCCCCC"
              metalness={0.1}
              roughness={0.9}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default Planet;
