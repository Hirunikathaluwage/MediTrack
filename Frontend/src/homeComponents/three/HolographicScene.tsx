import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
export const HolographicScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const particlesRef = useRef<THREE.Points>();
  useEffect(() => {
    if (!mountRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    // Camera with enhanced perspective
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 3;
    cameraRef.current = camera;
    // Advanced renderer with post-processing capabilities
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x4da6ff, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x50c878, 2, 100);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);
    // Create holographic logo
    const logoGeometry = new THREE.TorusGeometry(2, 0.4, 16, 100);
    const logoMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        color: {
          value: new THREE.Color(0x4da6ff)
        }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          float elevation = sin(modelPosition.x * 5.0 + time) * 0.1;
          modelPosition.y += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vElevation;
        void main() {
          float intensity = vElevation * 2.0 + 0.5;
          vec3 finalColor = color * intensity;
          gl_FragColor = vec4(finalColor, 0.5);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    scene.add(logo);
    // Create particle system for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
      colors[i] = Math.random();
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;
    // Mouse interaction for particles
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / window.innerWidth * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      gsap.to(particles.rotation, {
        x: mouse.y * 0.2,
        y: mouse.x * 0.2,
        duration: 2,
        ease: "power2.out"
      });
      gsap.to(logo.rotation, {
        x: mouse.y * 0.1,
        y: mouse.x * 0.1,
        duration: 1,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      if (logoMaterial.uniforms) {
        logoMaterial.uniforms.time.value = time;
      }
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
      }
      logo.rotation.z += 0.001;
      renderer.render(scene, camera);
    };
    animate();
    // Handle resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};