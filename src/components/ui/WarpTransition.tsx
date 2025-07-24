import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { warpTunnelVertexShader, warpTunnelFragmentShader } from '../../shaders/WarpTunnelShader';

// 3D Warp Tunnel Component
const WarpTunnel = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uIntensity.value = 1.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={warpTunnelVertexShader}
        fragmentShader={warpTunnelFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uIntensity: { value: 1.5 },
          uColor1: { value: new THREE.Color(0x00BFFF) },
          uColor2: { value: new THREE.Color(0xC77DFF) },
          uColor3: { value: new THREE.Color(0xFF6B9D) },
        }}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Warp Portal Component
const WarpPortal = () => {
  const portalRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group ref={portalRef}>
      {/* Portal rings */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
          <torusGeometry args={[3 + i * 0.5, 0.1, 16, 100]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? '#00BFFF' : i % 3 === 1 ? '#C77DFF' : '#FF6B9D'}
            emissive={i % 3 === 0 ? '#00BFFF' : i % 3 === 1 ? '#C77DFF' : '#FF6B9D'}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
};

const WarpTransition = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    >
      {/* Full screen 3D Warp Tunnel */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 90 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <WarpTunnel />
            <WarpPortal />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced Warp Effects Overlay */}
      <div className="absolute inset-0 w-full h-full">
        {/* Central energy vortex */}
        <motion.div
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{ 
            scale: [0, 3, 8, 20, 50],
            opacity: [1, 0.9, 0.7, 0.3, 0],
            rotate: [0, 180, 360, 720, 1080]
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #00BFFF, #C77DFF, #FF6B9D, #00BFFF)',
            filter: 'blur(3px)',
          }}
        />

        {/* Radial energy beams */}
        {Array.from({ length: 120 }).map((_, i) => {
          const angle = (i / 120) * Math.PI * 2;
          const delay = Math.random() * 1.0;
          const duration = 1.8 + Math.random() * 0.8;
          
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                width: '200vw',
                height: '2px',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(0,191,255,0.9) 10%, 
                  rgba(199,125,255,1) 30%, 
                  rgba(255,107,157,0.8) 60%, 
                  transparent 100%)`
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: [0, 0.3, 1, 2],
                opacity: [0, 0.9, 1, 0]
              }}
              transition={{
                duration: duration,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          );
        })}

        {/* Quantum energy particles */}
        {Array.from({ length: 200 }).map((_, i) => {
          const startAngle = Math.random() * Math.PI * 2;
          const startRadius = 50 + Math.random() * 100;
          const endRadius = 2000 + Math.random() * 1000;
          const delay = Math.random() * 1.5;
          
          const startX = 50 + Math.cos(startAngle) * (startRadius / 20);
          const startY = 50 + Math.sin(startAngle) * (startRadius / 20);
          const endX = 50 + Math.cos(startAngle) * (endRadius / 20);
          const endY = 50 + Math.sin(startAngle) * (endRadius / 20);
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 4 === 0 ? '#00BFFF' : 
                           i % 4 === 1 ? '#C77DFF' : 
                           i % 4 === 2 ? '#FF6B9D' : '#FFFFFF',
                boxShadow: `0 0 8px currentColor`,
              }}
              initial={{
                left: `${startX}%`,
                top: `${startY}%`,
                scale: 0,
                opacity: 0
              }}
              animate={{
                left: `${endX}%`,
                top: `${endY}%`,
                scale: [0, 2, 1.5, 0],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 2.2 + Math.random() * 0.8,
                delay: delay,
                ease: "easeOut"
              }}
            />
          );
        })}

        {/* Dimensional ripples */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{
              borderColor: i % 3 === 0 ? '#00BFFF' : i % 3 === 1 ? '#C77DFF' : '#FF6B9D',
              borderStyle: 'solid',
              filter: 'blur(1px)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 15, 30, 60],
              opacity: [1, 0.8, 0.4, 0],
              rotate: [0, 180, 360, 720]
            }}
            transition={{
              duration: 2.8,
              delay: i * 0.15,
              ease: "easeOut"
            }}
          >
            <div className="w-8 h-8" />
          </motion.div>
        ))}

        {/* Space-time distortion waves */}
        <motion.div
          initial={{ opacity: 0, scaleY: 1, skewX: 0 }}
          animate={{ 
            opacity: [0, 0.8, 1, 0.6, 0],
            scaleY: [1, 0.02, 0.01, 0.05, 1],
            skewX: [0, 10, -10, 5, 0]
          }}
          transition={{ duration: 2.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(45deg, transparent 0%, rgba(0,191,255,0.4) 20%, rgba(199,125,255,0.5) 50%, rgba(255,107,157,0.4) 80%, transparent 100%)',
            mixBlendMode: 'screen'
          }}
        />

        {/* Chromatic aberration effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0.8, 0.3, 0]
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 48% 52%, 
                rgba(255,0,0,0.15) 0%, 
                transparent 40%),
              radial-gradient(circle at 50% 50%, 
                rgba(0,255,0,0.15) 0%, 
                transparent 40%),
              radial-gradient(circle at 52% 48%, 
                rgba(0,0,255,0.15) 0%, 
                transparent 40%)
            `,
            mixBlendMode: 'screen'
          }}
        />
      </div>
    </motion.div>
  );
};

export default WarpTransition;
