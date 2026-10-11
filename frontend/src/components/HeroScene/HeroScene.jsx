/**
 * HeroScene.jsx — 3D Centerpiece with full isolation
 * Uses a pure Three.js implementation (no R3F reconciler)
 * to avoid React 18.3.x reconciler incompatibilities.
 * 
 * Direct Three.js renderer embedded in a React component via useEffect.
 */

import { useEffect, useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroScene = ({ pointerRef }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Renderer setup ──
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not available:', e);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.outline = 'none';
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(3, 5, 2);
    scene.add(dirLight);

    const bluePoint = new THREE.PointLight(0x1d4ed8, 0.7);
    bluePoint.position.set(-3, -2, -3);
    scene.add(bluePoint);

    const skyPoint = new THREE.PointLight(0x0ea5e9, 0.5);
    skyPoint.position.set(4, 3, -1);
    scene.add(skyPoint);

    // ── Main group ──
    const group = new THREE.Group();
    scene.add(group);

    // ── Core octahedron ──
    const outerGeo = new THREE.OctahedronGeometry(0.76, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x050a14,
      metalness: 0.1,
      roughness: 0.02,
      transparent: true,
      opacity: 0.88,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    const innerGeo = new THREE.OctahedronGeometry(0.76, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      metalness: 1,
      roughness: 0.05,
      emissive: new THREE.Color(0x1d4ed8),
      emissiveIntensity: 0.18,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.scale.setScalar(0.5);
    group.add(innerMesh);

    // ── Precision rings ──
    const rings = [];
    const ringConfigs = [
      { radius: 1.55, tube: 0.011, rotX: 0,                 rotZ: 0,                speed:  0.26,  color: 0x1d4ed8, opacity: 0.92 },
      { radius: 1.95, tube: 0.009, rotX: Math.PI / 3,       rotZ: 0,                speed: -0.19,  color: 0x0ea5e9, opacity: 0.58 },
      { radius: 1.28, tube: 0.013, rotX: Math.PI / 5,       rotZ: Math.PI / 6,      speed:  0.33,  color: 0x3b82f6, opacity: 0.75 },
      { radius: 2.35, tube: 0.007, rotX: -Math.PI / 4,      rotZ: Math.PI / 8,      speed:  0.13,  color: 0x172554, opacity: 0.42 },
      { radius: 1.72, tube: 0.008, rotX: Math.PI / 2.5,     rotZ: -Math.PI / 5,     speed: -0.22,  color: 0x60a5fa, opacity: 0.35 },
    ];

    ringConfigs.forEach(cfg => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 4, 140);
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        metalness: 0.95,
        roughness: 0.08,
        transparent: true,
        opacity: cfg.opacity,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.rotX;
      mesh.rotation.z = cfg.rotZ;
      group.add(mesh);
      rings.push({ mesh, speed: cfg.speed, baseX: cfg.rotX, baseZ: cfg.rotZ });
    });

    // ── Orbit particles ──
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.6 + (Math.random() - 0.5) * 0.7;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      size: 0.016,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pointsGeo, pointsMat);
    group.add(particles);

    // ── Micro-fragments ──
    const frags = [];
    const fragConfigs = [
      { pos: [1.85, 0.65, -0.45], size: 0.082, speed: 0.72, delay: 0 },
      { pos: [-1.7, -0.75, 0.35], size: 0.062, speed: 0.52, delay: 1.3 },
      { pos: [0.95, -1.6, 0.65],  size: 0.05,  speed: 0.88, delay: 0.6 },
      { pos: [-2.2, 0.45, -0.7],  size: 0.072, speed: 0.62, delay: 2.1 },
      { pos: [1.25, 1.85, -0.35], size: 0.055, speed: 0.78, delay: 0.9 },
    ];
    const fragMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.92,
      roughness: 0.08,
      transparent: true,
      opacity: 0.65,
    });
    fragConfigs.forEach(cfg => {
      const geo = new THREE.BoxGeometry(cfg.size, cfg.size, cfg.size);
      const mesh = new THREE.Mesh(geo, fragMat);
      mesh.position.set(...cfg.pos);
      group.add(mesh);
      frags.push({ mesh, baseY: cfg.pos[1], speed: cfg.speed, delay: cfg.delay });
    });

    // ── Scroll transform ──
    if (!prefersReduced) {
      gsap.to(group.rotation, {
        x: 0.35, y: -0.85,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
      gsap.to(group.position, {
        y: -1.4,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
      gsap.to(group.scale, {
        x: 0.65, y: 0.65, z: 0.65,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    }

    // ── Pointer-reactive camera ──
    const camTarget = { x: 0, y: 0 };
    const camLerp  = { x: 0, y: 0 };

    // ── Resize handler ──
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ──
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Core rotation
      outerMesh.rotation.y = t * 0.14;
      outerMesh.rotation.x = Math.sin(t * 0.28) * 0.08;
      innerMesh.rotation.y = -t * 0.22;
      innerMesh.rotation.z = t * 0.09;

      // Rings
      rings.forEach(r => {
        r.mesh.rotation.x = r.baseX + t * r.speed * 0.35;
        r.mesh.rotation.z = r.baseZ + t * r.speed * 0.15;
      });

      // Particles
      particles.rotation.y = t * 0.055;
      particles.rotation.x = Math.sin(t * 0.03) * 0.09;

      // Fragments
      frags.forEach(f => {
        const ft = t + f.delay;
        f.mesh.position.y = f.baseY + Math.sin(ft * f.speed) * 0.13;
        f.mesh.rotation.x = ft * 0.38;
        f.mesh.rotation.z = ft * 0.19;
      });

      // Pointer-reactive camera
      if (!prefersReduced && pointerRef?.current) {
        camTarget.x = pointerRef.current.x * 0.55;
        camTarget.y = pointerRef.current.y * 0.28;
        camLerp.x += (camTarget.x - camLerp.x) * 0.04;
        camLerp.y += (camTarget.y - camLerp.y) * 0.04;
        camera.position.x += (camLerp.x - camera.position.x) * 0.06;
        camera.position.y += (camLerp.y - camera.position.y) * 0.06;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      fragMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [pointerRef]);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};

export default HeroScene;
