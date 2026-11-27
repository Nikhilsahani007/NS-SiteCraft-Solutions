/**
 * HeroScene.jsx — the original hero centrepiece, polished.
 *
 * Same composition as before (octahedron core, precision rings, orbit
 * particles, fragments), with:
 * - image-based lighting (RoomEnvironment) and ACES tone mapping for a
 *   softer, more premium look, plus a cheap additive glow on the main rings
 * - the whole structure tilting towards the pointer
 * - a scroll exit: it turns, shrinks and fades as the hero scrolls away
 * - rendering paused when off screen or when the tab is hidden
 * - a lighter build on phones and low-power devices
 *
 * Pure Three.js inside a React effect (no R3F reconciler). GSAP work is
 * scoped to a gsap.context so cleanup never touches other ScrollTriggers.
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isLowPower = () =>
  window.matchMedia('(max-width: 768px), (pointer: coarse)').matches ||
  (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

const HeroScene = ({ pointerRef }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const low = isLowPower();

    // ── Renderer ──
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !low,
        alpha: true,
        powerPreference: low ? 'low-power' : 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not available:', e);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, low ? 1.25 : 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.outline = 'none';
    container.appendChild(renderer.domElement);

    // ── Scene, camera, environment ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envTex = pmrem.fromScene(room, 0.04).texture;
    scene.environment = envTex;
    room.dispose();
    pmrem.dispose();

    // A few coloured lights on top of the environment for the blue rim.
    scene.add(new THREE.HemisphereLight(0x9cc2ff, 0x05070d, 0.12));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 5, 2);
    scene.add(key);
    const rimBlue = new THREE.PointLight(0x2563eb, 6, 12, 2);
    rimBlue.position.set(-3, -2, -2.5);
    scene.add(rimBlue);
    const rimSky = new THREE.PointLight(0x38bdf8, 4, 12, 2);
    rimSky.position.set(3.5, 2.5, -1);
    scene.add(rimSky);

    // Root follows scroll; tilt follows the pointer; group holds the art.
    const root = new THREE.Group();
    const tilt = new THREE.Group();
    const group = new THREE.Group();
    scene.add(root);
    root.add(tilt);
    tilt.add(group);

    const disposables = [envTex];
    const track = (...items) => { disposables.push(...items); return items[0]; };

    // ── Core ──
    const outerGeo = track(new THREE.OctahedronGeometry(0.76, low ? 1 : 2));
    // Kept close to the original near-black glass; the environment only adds
    // soft reflections on the facets.
    const outerMat = track(new THREE.MeshStandardMaterial({
      color: 0x050a14,
      metalness: 0.1,
      roughness: 0.04,
      envMapIntensity: 0.35,
      transparent: true,
      opacity: 0.88,
    }));
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    const innerGeo = track(new THREE.OctahedronGeometry(0.76, 0));
    const innerMat = track(new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      metalness: 1,
      roughness: 0.18,
      emissive: new THREE.Color(0x2563eb),
      emissiveIntensity: 0.45,
      envMapIntensity: 1.2,
    }));
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.scale.setScalar(0.5);
    group.add(innerMesh);

    // ── Rings (+ additive glow halo on the brighter ones) ──
    const rings = [];
    const ringConfigs = [
      { radius: 1.55, tube: 0.011, rotX: 0,              rotZ: 0,             speed:  0.26, color: 0x2563eb, opacity: 0.95, glow: true },
      { radius: 1.95, tube: 0.009, rotX: Math.PI / 3,    rotZ: 0,             speed: -0.19, color: 0x0ea5e9, opacity: 0.6,  glow: true },
      { radius: 1.28, tube: 0.013, rotX: Math.PI / 5,    rotZ: Math.PI / 6,   speed:  0.33, color: 0x3b82f6, opacity: 0.8,  glow: !low },
      { radius: 2.35, tube: 0.007, rotX: -Math.PI / 4,   rotZ: Math.PI / 8,   speed:  0.13, color: 0x1e3a8a, opacity: 0.45, glow: false },
      { radius: 1.72, tube: 0.008, rotX: Math.PI / 2.5,  rotZ: -Math.PI / 5,  speed: -0.22, color: 0x60a5fa, opacity: 0.38, glow: false },
    ];
    const segs = low ? 96 : 160;
    ringConfigs.forEach((cfg) => {
      const ring = new THREE.Group();
      const geo = track(new THREE.TorusGeometry(cfg.radius, cfg.tube, 6, segs));
      const mat = track(new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: new THREE.Color(cfg.color),
        emissiveIntensity: 0.35,
        metalness: 0.9,
        roughness: 0.15,
        transparent: true,
        opacity: cfg.opacity,
      }));
      ring.add(new THREE.Mesh(geo, mat));
      if (cfg.glow) {
        const gGeo = track(new THREE.TorusGeometry(cfg.radius, cfg.tube * 5, 6, segs));
        const gMat = track(new THREE.MeshBasicMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.09,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }));
        ring.add(new THREE.Mesh(gGeo, gMat));
      }
      ring.rotation.x = cfg.rotX;
      ring.rotation.z = cfg.rotZ;
      group.add(ring);
      rings.push({ mesh: ring, speed: cfg.speed, baseX: cfg.rotX, baseZ: cfg.rotZ });
    });

    // ── Orbit particles ──
    const particleCount = low ? 120 : 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.6 + (Math.random() - 0.5) * 0.8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointsGeo = track(new THREE.BufferGeometry());
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointsMat = track(new THREE.PointsMaterial({
      size: 0.018,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    const particles = new THREE.Points(pointsGeo, pointsMat);
    group.add(particles);

    // ── Fragments ──
    const frags = [];
    const fragConfigs = [
      { pos: [1.85, 0.65, -0.45], size: 0.082, speed: 0.72, delay: 0 },
      { pos: [-1.7, -0.75, 0.35], size: 0.062, speed: 0.52, delay: 1.3 },
      { pos: [0.95, -1.6, 0.65], size: 0.05, speed: 0.88, delay: 0.6 },
      { pos: [-2.2, 0.45, -0.7], size: 0.072, speed: 0.62, delay: 2.1 },
      { pos: [1.25, 1.85, -0.35], size: 0.055, speed: 0.78, delay: 0.9 },
    ];
    const fragMat = track(new THREE.MeshStandardMaterial({
      color: 0x1e40af,
      metalness: 0.95,
      roughness: 0.12,
      envMapIntensity: 1.4,
    }));
    fragConfigs.forEach((cfg) => {
      const geo = track(new THREE.BoxGeometry(cfg.size, cfg.size, cfg.size));
      const mesh = new THREE.Mesh(geo, fragMat);
      mesh.position.set(...cfg.pos);
      group.add(mesh);
      frags.push({ mesh, baseY: cfg.pos[1], speed: cfg.speed, delay: cfg.delay });
    });

    // ── Intro + scroll exit (scoped, so cleanup only removes ours) ──
    const ctx = gsap.context(() => {
      if (prefersReduced) return;
      gsap.from(root.scale, { x: 0.82, y: 0.82, z: 0.82, duration: 1.8, ease: 'expo.out' });
      gsap.from(root.rotation, { y: -0.6, duration: 2.2, ease: 'expo.out' });

      const exit = gsap.timeline({
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      exit
        .to(root.rotation, { x: 0.45, y: -1.1, ease: 'none' }, 0)
        .to(root.position, { y: -1.2, ease: 'none' }, 0)
        .to(root.scale, { x: 0.62, y: 0.62, z: 0.62, ease: 'none' }, 0)
        .to(container, { opacity: 0, ease: 'power1.in' }, 0.25);
    }, container);

    // ── Resize ──
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Loop (paused off screen / hidden tab) ──
    // Elapsed time only advances while rendering, so resuming never jumps.
    let elapsed = 0;
    let last = 0;
    const cam = { x: 0, y: 0 };
    const tiltNow = { x: 0, y: 0 };

    const frame = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      elapsed += dt;
      const t = elapsed;
      const speed = prefersReduced ? 0.25 : 1;

      outerMesh.rotation.y = t * 0.14 * speed;
      outerMesh.rotation.x = Math.sin(t * 0.28) * 0.08;
      innerMesh.rotation.y = -t * 0.22 * speed;
      innerMesh.rotation.z = t * 0.09 * speed;
      innerMat.emissiveIntensity = 0.4 + Math.sin(t * 1.4) * 0.12;

      rings.forEach((r) => {
        r.mesh.rotation.x = r.baseX + t * r.speed * 0.35 * speed;
        r.mesh.rotation.z = r.baseZ + t * r.speed * 0.15 * speed;
      });
      particles.rotation.y = t * 0.055 * speed;
      particles.rotation.x = Math.sin(t * 0.03) * 0.09;
      frags.forEach((f) => {
        const ft = t + f.delay;
        f.mesh.position.y = f.baseY + Math.sin(ft * f.speed) * 0.13;
        f.mesh.rotation.x = ft * 0.38;
        f.mesh.rotation.z = ft * 0.19;
      });

      if (!prefersReduced && pointerRef?.current) {
        const px = pointerRef.current.x || 0;
        const py = pointerRef.current.y || 0;
        // structure tilts towards the pointer
        tiltNow.x += (py * -0.32 - tiltNow.x) * 0.05;
        tiltNow.y += (px * 0.45 - tiltNow.y) * 0.05;
        tilt.rotation.x = tiltNow.x;
        tilt.rotation.y = tiltNow.y;
        // and the camera drifts a little for depth
        cam.x += (px * 0.35 - cam.x) * 0.04;
        cam.y += (py * 0.18 - cam.y) * 0.04;
        camera.position.x = cam.x;
        camera.position.y = cam.y;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    let visible = true;
    let running = false;
    const sync = () => {
      const shouldRun = visible && !document.hidden;
      if (shouldRun && !running) {
        last = 0;
        renderer.setAnimationLoop(frame);
        running = true;
      } else if (!shouldRun && running) {
        renderer.setAnimationLoop(null);
        running = false;
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(container);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      renderer.setAnimationLoop(null);
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('resize', onResize);
      ctx.revert();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [pointerRef]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
};

export default HeroScene;
