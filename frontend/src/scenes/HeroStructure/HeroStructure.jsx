/**
 * HeroStructure — the homepage 3D centrepiece.
 *
 * An exploded architectural model of a software product: five slabs, one per
 * layer (infrastructure → experience), held by four structural columns, with a
 * signal travelling up through the stack. Plain Three.js, no React renderer.
 *
 * Behaviour
 *  - assembles once on load, then idles with a slow drift
 *  - leans gently towards the pointer (fine pointers only)
 *  - separates and turns as the hero scrolls away
 *  - pauses when off-screen or when the tab is hidden
 *  - prefers-reduced-motion: renders one assembled, static frame
 *  - no WebGL: calls onFail so the parent can show the static fallback
 */
import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  DirectionalLight,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import styles from './HeroStructure.module.css';

const SLAB = { w: 3.1, h: 0.1, d: 2.05 };
const BASE_GAP = 0.8;
const ACCENT = 0x3b82f6;
const EDGE = 0xdfe6f3;

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/** Small raised details that give each layer its own meaning. */
function buildLayerDetail(index, mats) {
  const g = new Group();
  const y = SLAB.h / 2;
  const add = (geo, mat, x, yy, z) => {
    const m = new Mesh(geo, mat);
    m.position.set(x, y + yy, z);
    g.add(m);
    return m;
  };

  if (index === 0) {
    // Infrastructure: a rack of server units
    for (let i = 0; i < 5; i += 1) {
      add(new BoxGeometry(0.34, 0.16, 1.3), mats.block, -1.04 + i * 0.52, 0.08, 0);
      add(new BoxGeometry(0.34, 0.012, 0.06), i === 3 ? mats.accent : mats.light, -1.04 + i * 0.52, 0.166, 0.5);
    }
  } else if (index === 1) {
    // Data: stores
    [-0.9, 0, 0.9].forEach((x, i) => {
      add(new CylinderGeometry(0.28, 0.28, 0.2, 28), mats.block, x, 0.1, 0);
      add(new CylinderGeometry(0.285, 0.285, 0.014, 28), i === 1 ? mats.accent : mats.light, x, 0.2, 0);
    });
  } else if (index === 2) {
    // Application: modules of different sizes
    add(new BoxGeometry(0.9, 0.2, 0.9), mats.block, -0.85, 0.1, -0.25);
    add(new BoxGeometry(0.6, 0.12, 0.6), mats.block, 0.1, 0.06, 0.4);
    add(new BoxGeometry(0.7, 0.26, 0.5), mats.block, 0.95, 0.13, -0.4);
    add(new BoxGeometry(0.9, 0.012, 0.06), mats.accent, -0.85, 0.206, 0.15);
    add(new BoxGeometry(0.06, 0.012, 0.6), mats.light, 0.1, 0.126, 0.4);
  } else if (index === 3) {
    // Interface: a grid of components
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 5; c += 1) {
        const accent = r === 1 && c === 3;
        add(new BoxGeometry(0.44, 0.03, 0.44), accent ? mats.accent : mats.block, -1.08 + c * 0.54, 0.015, -0.56 + r * 0.56);
      }
    }
  } else {
    // Experience: a page layout drawn in light
    add(new BoxGeometry(2.6, 0.012, 0.09), mats.light, 0, 0.006, -0.78);
    add(new BoxGeometry(1.3, 0.012, 0.2), mats.light, -0.65, 0.006, -0.38);
    add(new BoxGeometry(1.0, 0.012, 0.06), mats.dim, -0.8, 0.006, -0.08);
    add(new BoxGeometry(0.8, 0.012, 0.06), mats.dim, -0.9, 0.006, 0.08);
    add(new BoxGeometry(0.5, 0.02, 0.2), mats.accent, -1.05, 0.01, 0.42);
    add(new BoxGeometry(1.05, 0.02, 1.05), mats.block, 0.72, 0.01, 0.2);
  }
  return g;
}

const HeroStructure = ({ labels = [], onReady, onFail }) => {
  const mountRef = useRef(null);
  const labelRefs = useRef([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const small = window.matchMedia('(max-width: 760px)').matches;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
    } catch (err) {
      onFail?.();
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.className = styles.canvas;
    canvas.setAttribute('aria-hidden', 'true');
    mount.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.2, 13.5);
    camera.lookAt(0, 0, 0);

    // Lighting: cool key from above, electric-blue fill from below
    scene.add(new AmbientLight(0xffffff, 0.9));
    const key = new DirectionalLight(0xffffff, 2.8);
    key.position.set(4, 7, 5);
    scene.add(key);
    const rim = new DirectionalLight(0x9db8ff, 0.9);
    rim.position.set(-6, 2, -4);
    scene.add(rim);
    const glow = new PointLight(ACCENT, 26, 14, 1.6);
    glow.position.set(-2.4, -2.2, 2.6);
    scene.add(glow);

    const mats = {
      slab: new MeshStandardMaterial({ color: 0x161a26, metalness: 0.5, roughness: 0.42 }),
      block: new MeshStandardMaterial({ color: 0x2a3042, metalness: 0.35, roughness: 0.5 }),
      light: new MeshBasicMaterial({ color: 0xe8edf7 }),
      dim: new MeshBasicMaterial({ color: 0x5b6477 }),
      accent: new MeshBasicMaterial({ color: ACCENT }),
    };
    const edgeMat = new LineBasicMaterial({ color: EDGE, transparent: true, opacity: 0.62 });
    const columnMat = new LineBasicMaterial({ color: EDGE, transparent: true, opacity: 0.16 });

    const rig = new Group(); // pointer + scroll rotation
    const stack = new Group(); // base isometric pose
    stack.rotation.set(0.44, -0.7, 0);
    rig.add(stack);
    scene.add(rig);

    const slabGeo = new BoxGeometry(SLAB.w, SLAB.h, SLAB.d);
    const slabEdges = new EdgesGeometry(slabGeo);
    const count = 5;
    const layers = [];
    for (let i = 0; i < count; i += 1) {
      const layer = new Group();
      layer.add(new Mesh(slabGeo, mats.slab));
      layer.add(new LineSegments(slabEdges, edgeMat));
      layer.add(buildLayerDetail(i, mats));
      stack.add(layer);
      layers.push(layer);
    }

    // Structural columns: four vertical lines through the corners
    const colGeo = new BufferGeometry();
    const cx = SLAB.w / 2 - 0.12;
    const cz = SLAB.d / 2 - 0.12;
    const colPositions = new Float32Array(4 * 2 * 3);
    colGeo.setAttribute('position', new Float32BufferAttribute(colPositions, 3));
    const columns = new LineSegments(colGeo, columnMat);
    stack.add(columns);
    const corners = [
      [-cx, -cz],
      [cx, -cz],
      [cx, cz],
      [-cx, cz],
    ];

    // Signal: a point of light that climbs the front-left column
    const signal = new Mesh(new SphereGeometry(0.055, 16, 16), mats.accent);
    stack.add(signal);

    const state = {
      start: performance.now(),
      pointerX: 0,
      pointerY: 0,
      rx: 0,
      ry: 0,
      scroll: 0,
      visible: true,
      raf: 0,
      ready: false,
    };

    const layerY = (i, gap) => (i - (count - 1) / 2) * gap;
    const tmp = new Vector3();

    const layout = (time) => {
      const elapsed = (time - state.start) / 1000;
      const gap = BASE_GAP + state.scroll * 0.42;

      layers.forEach((layer, i) => {
        const t = reduce ? 1 : clamp01((elapsed - 0.15 - i * 0.14) / 1.25);
        const e = easeOutExpo(t);
        const drift = reduce ? 0 : Math.sin(elapsed * 0.6 + i * 0.9) * 0.018;
        layer.position.y = layerY(i, gap) + (1 - e) * 2.6 + drift;
        layer.visible = t > 0;
        layer.scale.setScalar(0.92 + 0.08 * e);
      });

      const top = layerY(count - 1, gap) + 0.2;
      const bottom = layerY(0, gap) - 0.2;
      corners.forEach(([x, z], i) => {
        colPositions.set([x, bottom, z, x, top, z], i * 6);
      });
      colGeo.attributes.position.needsUpdate = true;
      const intro = reduce ? 1 : clamp01((elapsed - 0.9) / 1.2);
      columnMat.opacity = 0.16 * intro;

      const travel = reduce ? 0.62 : (elapsed * 0.22) % 1;
      signal.position.set(-cx, bottom + (top - bottom) * travel, cz);
      signal.visible = intro > 0.2;

      // pointer + scroll
      const targetY = state.pointerX * 0.16 + state.scroll * 0.55;
      const targetX = state.pointerY * 0.1 - state.scroll * 0.12;
      state.ry += (targetY - state.ry) * (reduce ? 1 : 0.06);
      state.rx += (targetX - state.rx) * (reduce ? 1 : 0.06);
      rig.rotation.y = state.ry + (reduce ? 0 : Math.sin(elapsed * 0.25) * 0.04);
      rig.rotation.x = state.rx;
    };

    const placeLabels = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      layers.forEach((layer, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        // anchor to the slab's right-hand corner so the text sits clear of the model
        tmp.set(SLAB.w / 2, 0, -SLAB.d / 2);
        layer.localToWorld(tmp);
        tmp.project(camera);
        const x = Math.min((tmp.x * 0.5 + 0.5) * w + 14, w - el.offsetWidth - 4);
        const y = (-tmp.y * 0.5 + 0.5) * h;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translateY(-50%)`;
        el.style.opacity = layer.visible ? '1' : '0';
      });
    };

    const render = (time) => {
      layout(time);
      renderer.render(scene, camera);
      placeLabels();
      if (!state.ready) {
        state.ready = true;
        onReady?.();
      }
    };

    const loop = (time) => {
      state.raf = 0;
      if (!state.visible || document.hidden) return;
      render(time);
      state.raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (reduce) {
        render(performance.now());
      } else if (!state.raf) {
        state.raf = requestAnimationFrame(loop);
      }
    };

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole model in frame on narrow or short stages
      const fit = Math.min(1, w / h / 1.05);
      rig.scale.setScalar((0.74 + 0.26 * fit) * (small ? 1.22 : 1));
      camera.updateProjectionMatrix();
      if (reduce) render(performance.now());
    };

    const onPointer = (e) => {
      state.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      state.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const rect = mount.getBoundingClientRect();
      const span = rect.height + window.innerHeight * 0.4;
      state.scroll = clamp01(-rect.top / span + 0.0);
      if (reduce) state.scroll = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    const io = new IntersectionObserver(([entry]) => {
      state.visible = entry.isIntersecting;
      if (state.visible) kick();
    });
    io.observe(mount);
    const onVisibility = () => {
      if (!document.hidden) kick();
    };

    if (finePointer && !reduce) window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    const onLost = (e) => {
      e.preventDefault();
      cancelAnimationFrame(state.raf);
      onFail?.();
    };
    canvas.addEventListener('webglcontextlost', onLost);

    resize();
    onScroll();
    kick();

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onLost);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
      });
      Object.values(mats).forEach((m) => m.dispose());
      edgeMat.dispose();
      columnMat.dispose();
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.stage} ref={mountRef}>
      <div className={styles.labels} aria-hidden="true">
        {labels.map((label, i) => (
          <span
            key={label}
            className={styles.label}
            ref={(el) => {
              labelRefs.current[labels.length - 1 - i] = el;
            }}
          >
            <i />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroStructure;
