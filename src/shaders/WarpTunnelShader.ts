// Warp Tunnel Shader for enhanced warp jump effect
export const warpTunnelVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const warpTunnelFragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vec2 st = vUv;
    
    // Create tunnel effect
    vec2 center = vec2(0.5, 0.5);
    vec2 toCenter = st - center;
    float dist = length(toCenter);
    float angle = atan(toCenter.y, toCenter.x);
    
    // Warp tunnel animation
    float warpSpeed = uTime * 2.0;
    float tunnel = sin(dist * 20.0 - warpSpeed) * 0.5 + 0.5;
    
    // Create streaking lines
    float lines = sin(angle * 50.0 + warpSpeed * 3.0) * 0.5 + 0.5;
    lines *= smoothstep(0.1, 0.9, dist);
    
    // Add noise for particle effect
    float noiseValue = noise(st * 10.0 + uTime);
    
    // Combine effects
    float intensity = tunnel * lines * uIntensity;
    intensity += noiseValue * 0.3;
    
    // Color mixing based on distance and time
    vec3 color1 = uColor1 * intensity;
    vec3 color2 = uColor2 * (1.0 - intensity) * lines;
    vec3 color3 = uColor3 * noiseValue;
    
    vec3 finalColor = color1 + color2 + color3;
    
    // Add glow effect
    float glow = 1.0 - smoothstep(0.0, 0.7, dist);
    finalColor += glow * uColor1 * 0.5;
    
    // Fade edges
    float alpha = smoothstep(0.9, 0.1, dist) * uIntensity;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// Shader configuration for warp tunnel effect
export const warpTunnelShaderConfig = {
  vertexShader: warpTunnelVertexShader,
  fragmentShader: warpTunnelFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uIntensity: { value: 1.0 },
    uColor1: { value: [0, 0.75, 1] }, // Cyan
    uColor2: { value: [0.78, 0.49, 1] }, // Purple  
    uColor3: { value: [1, 0.42, 0.62] }, // Pink
  },
  transparent: true,
};
