import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface AsteroidProps {
  position: [number, number, number];
  size: number;
  rotationSpeed: number;
  skill?: string;
}

const Asteroid = ({ position, size, rotationSpeed, skill }: AsteroidProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotation animation
    meshRef.current.rotation.x += rotationSpeed;
    meshRef.current.rotation.y += rotationSpeed * 0.7;
    meshRef.current.rotation.z += rotationSpeed * 0.3;
    
    // Floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.2;
    
    // Scale effect when hovered
    const targetScale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  return (
    <group ref={groupRef} position={position}>
      <mesh 
        ref={meshRef} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial 
          color={hovered ? "#8B5CF6" : "#64748B"} 
          metalness={0.9} 
          roughness={hovered ? 0.4 : 0.8}
          emissive={hovered ? "#8B5CF6" : "#1E293B"}
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </mesh>

      {/* Skill tooltip */}
      {hovered && skill && (
        <Text
          position={[0, size + 0.8, 0]}
          fontSize={0.3}
          color="#8B5CF6"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {skill}
        </Text>
      )}

      {/* Particle trail effect */}
      {hovered && (
        <>
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = size * 1.5;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            return (
              <mesh key={i} position={[x, 0, z]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial 
                  color="#8B5CF6"
                  emissive="#8B5CF6"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
};

export default Asteroid;
