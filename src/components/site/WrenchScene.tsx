import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WrenchScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const getSize = () => ({
      w: container.clientWidth,
      h: container.clientHeight,
    });

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    const { w, h } = getSize();
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x08120d, 12, 32);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 1, 11);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.4);
    mainLight.position.set(5, 8, 6);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(1024, 1024);
    mainLight.shadow.radius = 8;
    scene.add(mainLight);

    const greenLight = new THREE.PointLight(0x22c55e, 6, 28);
    greenLight.position.set(0, 2, 5);
    scene.add(greenLight);

    const rimLight = new THREE.DirectionalLight(0x86efac, 1.2);
    rimLight.position.set(-5, -2, 4);
    scene.add(rimLight);

    const backGlow = new THREE.PointLight(0x4ade80, 3, 20);
    backGlow.position.set(-3, -1, -4);
    scene.add(backGlow);

    // Environment for reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0a1a12);
    const envLight1 = new THREE.PointLight(0xffffff, 50, 50);
    envLight1.position.set(5, 5, 5);
    const envLight2 = new THREE.PointLight(0x22c55e, 30, 50);
    envLight2.position.set(-5, 3, -3);
    const envLight3 = new THREE.PointLight(0xa7f3d0, 20, 50);
    envLight3.position.set(0, -4, 4);
    envScene.add(envLight1, envLight2, envLight3);
    const envTex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;

    // Chrome material
    const metal = new THREE.MeshPhysicalMaterial({
      color: 0xd7dde2,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      reflectivity: 1,
      envMapIntensity: 1.3,
    });

    // Wrench shape
    const shape = new THREE.Shape();
    shape.moveTo(-4.5, 0.55);
    shape.lineTo(-3.7, 1.25);
    shape.lineTo(-2.7, 0.72);
    shape.lineTo(-3.18, 0.18);
    shape.quadraticCurveTo(-3.5, 0, -3.18, -0.18);
    shape.lineTo(-2.7, -0.72);
    shape.lineTo(-3.7, -1.25);
    shape.lineTo(-4.5, -0.55);
    shape.lineTo(3.2, -0.42);
    shape.absarc(4.2, 0, 1.1, -Math.PI / 2, Math.PI / 2, false);
    shape.lineTo(-4.5, 0.55);

    const ringHole = new THREE.Path();
    ringHole.absarc(4.2, 0, 0.55, 0, Math.PI * 2, true);
    shape.holes.push(ringHole);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 10,
      curveSegments: 64,
    });
    geometry.center();

    const wrench = new THREE.Mesh(geometry, metal);
    wrench.castShadow = true;
    wrench.receiveShadow = true;
    scene.add(wrench);

    // Soft shadow disc
    const shadowTex = (() => {
      const size = 256;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, "rgba(0,0,0,0.55)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.18)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    })();

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(11, 5),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -2.6;
    scene.add(shadow);

    // Interaction
    let dragging = false;
    let prevX = 0,
      prevY = 0;
    let rotX = 0.15;
    let rotY = 0.3;
    let targetRotX = rotX;
    let targetRotY = rotY;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      targetRotY += (e.clientX - prevX) * 0.008;
      targetRotX += (e.clientY - prevY) * 0.008;
      targetRotX = Math.max(-1.2, Math.min(1.2, targetRotX));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    // Resize
    const handleResize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // Animate
    let t = 0;
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.01;

      if (!dragging) {
        targetRotY += 0.004;
      }

      // Smooth interpolation
      rotX += (targetRotX - rotX) * 0.1;
      rotY += (targetRotY - rotY) * 0.1;

      wrench.position.y = Math.sin(t) * 0.15;
      wrench.rotation.x = rotX;
      wrench.rotation.y = rotY;
      wrench.rotation.z = Math.sin(t * 0.5) * 0.04;

      // Subtle shadow pulse
      const s = 1 + Math.sin(t) * 0.04;
      shadow.scale.set(s, s, 1);
      (shadow.material as THREE.MeshBasicMaterial).opacity = 0.7 - Math.abs(Math.sin(t)) * 0.15;

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
      geometry.dispose();
      metal.dispose();
      shadowTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #0f2a1c 0%, #06120c 70%, #03080a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 40%, rgba(34,197,94,0.18), transparent 60%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary-glow text-xs font-semibold uppercase tracking-wider backdrop-blur">
          Drag to rotate
        </span>
        <h2 className="mt-4 text-4xl md:text-6xl font-bold text-white">
          Precision <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">engineered</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/60 max-w-xl mx-auto">
          Premium tools. Master craftsmanship. The Piperush standard.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-[60vh] min-h-[420px] md:h-[70vh]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      </div>
    </section>
  );
}
