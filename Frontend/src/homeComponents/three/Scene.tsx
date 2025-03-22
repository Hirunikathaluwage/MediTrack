import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
export const Scene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const groupRef = useRef<THREE.Group>();
  useEffect(() => {
    if (!mountRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    // Camera setup with perspective for depth
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 2;
    cameraRef.current = camera;
    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x4da6ff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x50c878, 2);
    pointLight.position.set(-5, -5, 2);
    scene.add(pointLight);
    // Create main group for all objects
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;
    // Create multiple medicine bottles
    for (let i = 0; i < 3; i++) {
      const bottle = new THREE.Group();
      // Bottle body
      const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.7,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.5
      });
      const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
      // Bottle cap
      const capGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32);
      const capMaterial = new THREE.MeshPhongMaterial({
        color: 0x4da6ff
      });
      const capMesh = new THREE.Mesh(capGeometry, capMaterial);
      capMesh.position.y = 0.9;
      bottle.add(bodyMesh, capMesh);
      bottle.position.set((i - 1) * 3, Math.sin(i * Math.PI / 2) * 0.5, Math.cos(i * Math.PI / 2) * 0.5);
      group.add(bottle);
    }
    // Create floating pills
    for (let i = 0; i < 20; i++) {
      const pillGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const pillMaterial = new THREE.MeshPhongMaterial({
        color: Math.random() > 0.5 ? 0x4da6ff : 0x50c878
      });
      const pill = new THREE.Mesh(pillGeometry, pillMaterial);
      // Random positions in a more controlled area
      pill.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5);
      group.add(pill);
      // Add individual rotation animation
      gsap.to(pill.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 10 + Math.random() * 5,
        repeat: -1,
        ease: "none"
      });
    }
    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      gsap.to(group.rotation, {
        x: y * 0.1,
        y: x * 0.1,
        duration: 1,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (groupRef.current) {
        groupRef.current.children.forEach((child, i) => {
          if (child.type === "Group") {
            // Rotate bottles
            child.rotation.y += 0.01;
            child.position.y = Math.sin(Date.now() * 0.001 + i) * 0.2;
          } else {
            // Float pills
            child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
          }
        });
      }
      renderer.render(scene, camera);
    };
    animate();
    // Enhanced resize handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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