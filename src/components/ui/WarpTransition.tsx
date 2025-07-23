import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
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
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={warpTunnelVertexShader}
        fragmentShader={warpTunnelFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uIntensity: { value: 1.0 },
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

const WarpTransition = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* 3D Warp Tunnel Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <WarpTunnel />
          </Suspense>
        </Canvas>
      </div>

      {/* Enhanced Warp Effects */}
      <div className="absolute inset-0 bg-space-deep/50">
        {/* Central energy burst */}
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 5, 25, 100],
            opacity: [1, 0.9, 0.5, 0] 
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,191,255,1) 0%, rgba(199,125,255,0.8) 50%, rgba(255,107,157,0.3) 100%)',
            filter: 'blur(2px)',
          }}
        />

        {/* Hyperspace streaks */}
        {Array.from({ length: 80 }).map((_, i) => {
          const angle = (i / 80) * Math.PI * 2;
          const delay = Math.random() * 0.8;
          
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left h-px"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                width: '150vw',
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(0,191,255,0.8) 20%, 
                  rgba(199,125,255,1) 50%, 
                  rgba(255,107,157,0.6) 80%, 
                  transparent 100%)`
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: [0, 0.5, 1, 1.5],
                opacity: [0, 0.8, 1, 0]
              }}
              transition={{
                duration: 2.2,
                delay: delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            />
          );
        })}

        {/* Quantum particles */}
        {Array.from({ length: 150 }).map((_, i) => {
          const startX = 50 + (Math.random() - 0.5) * 10;
          const startY = 50 + (Math.random() - 0.5) * 10;
          const endX = Math.random() * 200 - 50;
          const endY = Math.random() * 200 - 50;
          const delay = Math.random() * 1.2;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 3 === 0 ? '#00BFFF' : i % 3 === 1 ? '#C77DFF' : '#FF6B9D',
                boxShadow: `0 0 6px currentColor`,
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
                scale: [0, 1.5, 0.8, 0],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: delay,
                ease: "easeOut"
              }}
            />
          );
        })}

        {/* Dimensional rifts */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 2, 4, 8],
              rotate: [0, 180, 360, 720],
              opacity: [0, 0.6, 0.3, 0]
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          >
            <div 
              className="w-32 h-32 rounded-full border-2"
              style={{
                borderColor: i % 2 === 0 ? '#00BFFF' : '#C77DFF',
                borderStyle: 'dashed',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        ))}

        {/* Screen distortion waves */}
        <motion.div
          initial={{ opacity: 0, scaleY: 1 }}
          animate={{ 
            opacity: [0, 0.7, 0.9, 0.4, 0],
            scaleY: [1, 0.05, 0.02, 0.1, 1],
            skewX: [0, 5, -5, 2, 0]
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,191,255,0.3) 25%, rgba(199,125,255,0.4) 50%, rgba(255,107,157,0.3) 75%, transparent 100%)',
            mixBlendMode: 'screen'
          }}
        />

        {/* Warp jump text with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ 
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1, 1.1, 1.3, 2],
            y: [20, 0, -5, -10, -30],
            textShadow: [
              '0 0 10px rgba(0,191,255,0.5)',
              '0 0 20px rgba(0,191,255,0.8)',
              '0 0 30px rgba(199,125,255,0.6)',
              '0 0 40px rgba(255,107,157,0.4)',
              '0 0 50px rgba(0,191,255,0.2)'
            ]
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-primary pointer-events-none"
          style={{
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          <motion.span
            animate={{
              opacity: [1, 0.7, 1, 0.8, 1],
            }}
            transition={{
              duration: 0.1,
              repeat: 25,
              repeatType: "reverse"
            }}
          >
            WARP JUMP
          </motion.span>
        </motion.div>

        {/* Chromatic aberration overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.6, 0.2, 0]
          }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                rgba(255,0,0,0.1) 0%, 
                transparent 30%),
              radial-gradient(circle at 52% 48%, 
                rgba(0,255,0,0.1) 0%, 
                transparent 30%),
              radial-gradient(circle at 48% 52%, 
                rgba(0,0,255,0.1) 0%, 
                transparent 30%)
            `,
            mixBlendMode: 'screen'
          }}
        />
      </div>
    </motion.div>
  );
};

export default WarpTransition;
