import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceshipProps {
  position: [number, number, number];
}

const Spaceship = ({ position }: SpaceshipProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const engineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle floating animation
    groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    
    // Engine glow effect
    if (engineRef.current) {
      const material = engineRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(time * 5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main hull */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 8]} />
        <meshStandardMaterial 
          color="#1E293B" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>

      {/* Wings */}
      <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.3, 2, 8]} />
        <meshStandardMaterial 
          color="#334155" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.3, 2, 8]} />
        <meshStandardMaterial 
          color="#334155" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.3, 0.8]}>
        <sphereGeometry args={[0.4, 12, 8]} />
        <meshStandardMaterial 
          color="#00BFFF" 
          transparent 
          opacity={0.7}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Engine */}
      <mesh ref={engineRef} position={[0, 0, -1.5]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial 
          color="#FF6B9D" 
          emissive="#FF6B9D"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Engine particles effect */}
      <mesh position={[0, 0, -2.5]}>
        <cylinderGeometry args={[0.1, 0.5, 2, 8]} />
        <meshStandardMaterial 
          color="#C77DFF" 
          transparent 
          opacity={0.6}
          emissive="#C77DFF"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Navigation lights */}
      <mesh position={[-1.5, 0.2, 0.5]}>
        <sphereGeometry args={[0.05, 8, 6]} />
        <meshStandardMaterial 
          color="#00FF00" 
          emissive="#00FF00"
          emissiveIntensity={1}
        />
      </mesh>
      
      <mesh position={[1.5, 0.2, 0.5]}>
        <sphereGeometry args={[0.05, 8, 6]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive="#FF0000"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
};

export default Spaceship;