import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WrenchScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const getSize = () => ({ w: container.clientWidth, h: container.clientHeight });

    // ---------- Renderer ----------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const { w, h } = getSize();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ---------- Scene ----------
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x06110b, 14, 36);

    // ---------- Camera ----------
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 12);

    // ---------- Lights ----------
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    const keyLight = new THREE.DirectionalLight(0xffffff, 3);
    keyLight.position.set(6, 9, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -10;
    keyLight.shadow.camera.right = 10;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.radius = 6;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x86efac, 1.4);
    rimLight.position.set(-6, -3, 4);
    scene.add(rimLight);

    const greenGlow = new THREE.PointLight(0x22c55e, 8, 26);
    greenGlow.position.set(0, 2.5, 5);
    scene.add(greenGlow);

    const backGlow = new THREE.PointLight(0x4ade80, 4, 22);
    backGlow.position.set(-3, -1, -4);
    scene.add(backGlow);

    // ---------- Env reflections (PMREM) ----------
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0a1a12);
    const e1 = new THREE.PointLight(0xffffff, 80, 60); e1.position.set(5, 6, 5);
    const e2 = new THREE.PointLight(0x22c55e, 40, 60); e2.position.set(-5, 4, -3);
    const e3 = new THREE.PointLight(0xa7f3d0, 25, 60); e3.position.set(0, -5, 4);
    const e4 = new THREE.PointLight(0xffffff, 30, 60); e4.position.set(3, -3, -5);
    envScene.add(e1, e2, e3, e4);
    const envTex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;

    // ---------- Chrome material ----------
    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xeaeef2,
      metalness: 1.0,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMapIntensity: 1.4,
    });

    // ============================================================
    // COMBINATION WRENCH (matches reference photo)
    // ============================================================
    const wrench = new THREE.Group();

    const HANDLE_LEN = 5.4;
    const HANDLE_W = 0.45;
    const HANDLE_T = 0.32;
    const HEAD_DEPTH = 0.42;
    const segs = 64;

    // --- Handle (rounded rectangle extrude) ---
    const handleShape = new THREE.Shape();
    const hl = HANDLE_LEN / 2;
    const hw = HANDLE_W / 2;
    handleShape.moveTo(-hl, -hw);
    handleShape.lineTo(hl, -hw * 0.95);
    handleShape.quadraticCurveTo(hl + 0.1, 0, hl, hw * 0.95);
    handleShape.lineTo(-hl, hw);
    handleShape.quadraticCurveTo(-hl - 0.1, 0, -hl, -hw);

    const handleGeo = new THREE.ExtrudeGeometry(handleShape, {
      depth: HANDLE_T,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.09,
      bevelSegments: 8,
      curveSegments: 24,
    });
    handleGeo.translate(0, 0, -HANDLE_T / 2);
    const handle = new THREE.Mesh(handleGeo, chrome);
    handle.castShadow = true;
    handle.receiveShadow = true;
    wrench.add(handle);

    // --- OPEN END (C-shape jaw at ~15°) ---
    const openGroup = new THREE.Group();
    const OPEN_OUTER = 0.95;
    const OPEN_INNER = 0.42;

    const openShape = new THREE.Shape();
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const r = OPEN_OUTER * (1 + 0.05 * Math.cos(a * 2));
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r * 0.95;
      if (i === 0) openShape.moveTo(x, y);
      else openShape.lineTo(x, y);
    }
    const jaw = new THREE.Path();
    const jawW = OPEN_INNER;
    const jawDepth = OPEN_OUTER * 0.85;
    jaw.moveTo(-OPEN_OUTER - 0.2, jawW);
    jaw.lineTo(-jawDepth + 0.1, jawW);
    jaw.quadraticCurveTo(-jawDepth + 0.25, 0, -jawDepth + 0.1, -jawW);
    jaw.lineTo(-OPEN_OUTER - 0.2, -jawW);
    jaw.lineTo(-OPEN_OUTER - 0.2, jawW);
    openShape.holes.push(jaw);

    const openGeo = new THREE.ExtrudeGeometry(openShape, {
      depth: HEAD_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 8,
      curveSegments: 64,
    });
    openGeo.translate(0, 0, -HEAD_DEPTH / 2);
    const openHead = new THREE.Mesh(openGeo, chrome);
    openHead.castShadow = true;
    openHead.receiveShadow = true;
    openGroup.add(openHead);

    openGroup.position.x = -(HANDLE_LEN / 2 + 0.55);
    openGroup.rotation.z = Math.PI * 0.083; // ~15° classic combo offset
    wrench.add(openGroup);

    // --- RING END (12-point box) ---
    const ringGroup = new THREE.Group();
    const RING_OUTER = 1.0;
    const RING_INNER = 0.5;

    const ringShape = new THREE.Shape();
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const x = Math.cos(a) * RING_OUTER;
      const y = Math.sin(a) * RING_OUTER * 0.96;
      if (i === 0) ringShape.moveTo(x, y);
      else ringShape.lineTo(x, y);
    }
    const inner = new THREE.Path();
    const ipts = 96;
    for (let i = 0; i <= ipts; i++) {
      const a = (i / ipts) * Math.PI * 2;
      const r = RING_INNER * (1 + 0.04 * Math.cos(a * 12));
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) inner.moveTo(x, y);
      else inner.lineTo(x, y);
    }
    ringShape.holes.push(inner);

    const ringGeo = new THREE.ExtrudeGeometry(ringShape, {
      depth: HEAD_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 8,
      curveSegments: 64,
    });
    ringGeo.translate(0, 0, -HEAD_DEPTH / 2);
    const ringHead = new THREE.Mesh(ringGeo, chrome);
    ringHead.castShadow = true;
    ringHead.receiveShadow = true;
    ringGroup.add(ringHead);

    ringGroup.position.x = HANDLE_LEN / 2 + 0.55;
    wrench.add(ringGroup);

    wrench.rotation.z = -0.04;
    scene.add(wrench);

    // ---------- Soft floor shadow ----------
    const shadowTex = (() => {
      const size = 256;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(0,0,0,0.6)");
      g.addColorStop(0.5, "rgba(0,0,0,0.18)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    })();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 4.5),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -2.4;
    scene.add(shadow);

    // ---------- Interaction ----------
    let dragging = false;
    let prevX = 0, prevY = 0;
    let rotX = 0.15, rotY = 0.25;
    let targetRotX = rotX, targetRotY = rotY;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX; prevY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      targetRotY += (e.clientX - prevX) * 0.008;
      targetRotX += (e.clientY - prevY) * 0.008;
      targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));
      prevX = e.clientX; prevY = e.clientY;
    };
    const onUp = () => { dragging = false; canvas.style.cursor = "grab"; };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    // ---------- Resize ----------
    const handleResize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // ---------- Animate ----------
    let t = 0;
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.01;
      if (!dragging) targetRotY += 0.004;
      rotX += (targetRotX - rotX) * 0.1;
      rotY += (targetRotY - rotY) * 0.1;

      wrench.position.y = Math.sin(t) * 0.16;
      wrench.rotation.x = rotX;
      wrench.rotation.y = rotY;
      wrench.rotation.z = -0.04 + Math.sin(t * 0.5) * 0.04;

      const s = 1 + Math.sin(t) * 0.05;
      shadow.scale.set(s, s, 1);
      (shadow.material as THREE.MeshBasicMaterial).opacity = 0.7 - Math.abs(Math.sin(t)) * 0.18;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      handleGeo.dispose();
      openGeo.dispose();
      ringGeo.dispose();
      chrome.dispose();
      shadowTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #0f2a1c 0%, #06120c 65%, #02080a 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(34,197,94,0.22), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-4 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary-glow text-xs font-semibold uppercase tracking-wider backdrop-blur">
          Drag to rotate
        </span>
        <h2 className="mt-4 text-4xl md:text-6xl font-bold text-white">
          Precision{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            engineered
          </span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/60 max-w-xl mx-auto">
          Premium tools. Master craftsmanship. The Piperush standard.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-[60vh] min-h-[420px] md:h-[72vh]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
    </section>
  );
}
