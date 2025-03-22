import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
export const AdvancedPharmacyScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const groupRef = useRef<THREE.Group>();
  useEffect(() => {
    if (!mountRef.current) return;
    // Scene setup with fog for depth
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    sceneRef.current = scene;
    // Enhanced camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 5;
    cameraRef.current = camera;
    // Advanced renderer setup
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
    // Advanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x4da6ff, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x50c878, 2, 100);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);
    // Create main group
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;
    // Create DNA Helix
    const createDNAHelix = () => {
      const dnaGroup = new THREE.Group();
      const numberOfPoints = 50;
      const radius = 2;
      const height = 20;
      for (let i = 0; i < numberOfPoints; i++) {
        const angle = i / numberOfPoints * Math.PI * 4;
        const y = i / numberOfPoints * height - height / 2;
        // Create spheres for DNA structure
        const sphere1Geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const sphere2Geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const sphere1Material = new THREE.MeshPhongMaterial({
          color: 0x4da6ff,
          emissive: 0x4da6ff,
          emissiveIntensity: 0.2
        });
        const sphere2Material = new THREE.MeshPhongMaterial({
          color: 0x50c878,
          emissive: 0x50c878,
          emissiveIntensity: 0.2
        });
        const sphere1 = new THREE.Mesh(sphere1Geometry, sphere1Material);
        const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
        sphere1.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        sphere2.position.set(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
        dnaGroup.add(sphere1, sphere2);
        // Add connecting lines
        if (i < numberOfPoints - 1) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([sphere1.position, sphere2.position]);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3
          });
          const line = new THREE.Line(lineGeometry, lineMaterial);
          dnaGroup.add(line);
        }
      }
      dnaGroup.position.set(-10, 0, -5);
      return dnaGroup;
    };
    // Create medical cross
    const createMedicalCross = () => {
      const crossGroup = new THREE.Group();
      const crossGeometry = new THREE.BoxGeometry(2, 0.5, 0.5);
      const verticalGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
      const crossMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8
      });
      const horizontalPart = new THREE.Mesh(crossGeometry, crossMaterial);
      const verticalPart = new THREE.Mesh(verticalGeometry, crossMaterial);
      crossGroup.add(horizontalPart, verticalPart);
      crossGroup.position.set(10, 5, 0);
      // Add pulsing animation
      gsap.to(crossGroup.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      return crossGroup;
    };
    // Create floating molecules
    const createMolecules = () => {
      const moleculeGroup = new THREE.Group();
      for (let i = 0; i < 20; i++) {
        const moleculeGeometry = new THREE.IcosahedronGeometry(0.3, 0);
        const moleculeMaterial = new THREE.MeshPhongMaterial({
          color: Math.random() > 0.5 ? 0x4da6ff : 0x50c878,
          transparent: true,
          opacity: 0.8,
          shininess: 100
        });
        const molecule = new THREE.Mesh(moleculeGeometry, moleculeMaterial);
        molecule.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
        // Add floating animation
        gsap.to(molecule.position, {
          y: molecule.position.y + Math.random() * 2,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
        // Add rotation animation
        gsap.to(molecule.rotation, {
          x: Math.PI * 2,
          y: Math.PI * 2,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          ease: "none"
        });
        moleculeGroup.add(molecule);
      }
      return moleculeGroup;
    };
    group.add(createDNAHelix(), createMedicalCross(), createMolecules());
    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      gsap.to(group.rotation, {
        x: y * 0.3,
        y: x * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.001;
      }
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



