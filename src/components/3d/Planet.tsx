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
}

const Planet = ({ position, color, size, label, onClick, isActive }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Planet rotation
    meshRef.current.rotation.y += 0.01;
    
    // Orbit animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.5;
    
    // Scale effect when active or hovered
    const targetScale = isActive ? 1.3 : hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Planet atmosphere */}
      <mesh>
        <sphereGeometry args={[size * 1.2, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          transparent 
          opacity={0.3}
          emissive={color}
          emissiveIntensity={isActive ? 0.4 : 0.1}
        />
      </mesh>

      {/* Main planet */}
      <mesh 
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={isActive ? 0.2 : hovered ? 0.1 : 0.05}
        />
      </mesh>

      {/* Rings for active planet */}
      {isActive && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 1.7, 32]} />
            <meshStandardMaterial 
              color={color}
              transparent 
              opacity={0.5}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <ringGeometry args={[size * 1.8, size * 2, 32]} />
            <meshStandardMaterial 
              color={color}
              transparent 
              opacity={0.3}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </>
      )}

      {/* Planet label */}
      {(hovered || isActive) && (
        <Text
          position={[0, size + 1, 0]}
          fontSize={0.5}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}

      {/* Orbital particles */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const orbitRadius = size * 2.5;
        const x = Math.cos(angle) * orbitRadius;
        const z = Math.sin(angle) * orbitRadius;
        
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Planet;