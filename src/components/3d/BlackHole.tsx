import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BlackHoleProps {
  position: [number, number, number];
}

const BlackHole = ({ position }: BlackHoleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Core pulsing
    const pulseScale = 1 + Math.sin(time * 2) * 0.1;
    coreRef.current.scale.setScalar(pulseScale);
    
    // Accretion disk rotation
    groupRef.current.rotation.y += 0.02;
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Black hole core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#000000"
          emissive="#1E293B"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Event horizon */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial 
          color="#1E293B"
          transparent 
          opacity={0.5}
          emissive="#7209B7"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Accretion disk */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6, 0.5, 16, 32]} />
        <meshStandardMaterial 
          color="#FF6B9D"
          emissive="#FF6B9D"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.3, 16, 32]} />
        <meshStandardMaterial 
          color="#C77DFF"
          emissive="#C77DFF"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[10, 0.2, 16, 32]} />
        <meshStandardMaterial 
          color="#00BFFF"
          emissive="#00BFFF"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Gravitational lensing effect particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 12 + Math.random() * 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 4;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#FFD700"
              emissive="#FFD700"
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default BlackHole;