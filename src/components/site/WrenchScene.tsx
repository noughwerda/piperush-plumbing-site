import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WrenchScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 12);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.6);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);
    const greenLight = new THREE.PointLight(0x22c55e, 3, 20);
    greenLight.position.set(0, 2, 4);
    scene.add(greenLight);
    const fillLight = new THREE.DirectionalLight(0x86efac, 1);
    fillLight.position.set(-4, -2, 5);
    scene.add(fillLight);

    // Materials
    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xd5dce0,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    });
    const greenMat = new THREE.MeshPhysicalMaterial({
      color: 0x16a34a,
      metalness: 0.35,
      roughness: 0.4,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });

    const wrench = new THREE.Group();

    // Handle (along X axis)
    const handle = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.7, 0.42), greenMat);
    wrench.add(handle);

    const edgeGeo = new THREE.CylinderGeometry(0.08, 0.08, 5.4, 20);
    const topEdge = new THREE.Mesh(edgeGeo, chromeMat);
    topEdge.rotation.z = Math.PI / 2;
    topEdge.position.y = 0.33;
    wrench.add(topEdge);
    const bottomEdge = new THREE.Mesh(edgeGeo, chromeMat);
    bottomEdge.rotation.z = Math.PI / 2;
    bottomEdge.position.y = -0.33;
    wrench.add(bottomEdge);

    // Tapered connectors
    const connectorGeo = new THREE.CylinderGeometry(0.35, 0.5, 0.9, 32);
    const leftConn = new THREE.Mesh(connectorGeo, chromeMat);
    leftConn.rotation.z = Math.PI / 2;
    leftConn.position.x = -2.85;
    wrench.add(leftConn);
    const rightConn = new THREE.Mesh(connectorGeo, chromeMat);
    rightConn.rotation.z = -Math.PI / 2;
    rightConn.position.x = 2.85;
    wrench.add(rightConn);

    // --- OPEN-END HEAD (left) — built centered on origin, then positioned ---
    const openShape = new THREE.Shape();
    // Outer rounded head (circle on the left side)
    openShape.absarc(0, 0, 1.0, Math.PI * 0.35, Math.PI * 1.65, false);
    // Right side connects back to handle
    openShape.lineTo(0.95, -0.42);
    openShape.lineTo(0.95, 0.42);
    openShape.closePath();

    // U-shaped jaw opening cut out of the head
    const jawHole = new THREE.Path();
    jawHole.moveTo(0.2, -0.32);
    jawHole.lineTo(-0.55, -0.32);
    jawHole.absarc(-0.55, 0, 0.32, -Math.PI / 2, Math.PI / 2, true);
    jawHole.lineTo(0.2, 0.32);
    jawHole.lineTo(0.2, -0.32);
    openShape.holes.push(jawHole);

    const openGeo = new THREE.ExtrudeGeometry(openShape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 6,
      curveSegments: 48,
    });
    openGeo.center();
    const openHead = new THREE.Mesh(openGeo, chromeMat);
    openHead.rotation.z = Math.PI; // jaw opens to the left
    openHead.rotation.x = Math.PI / 2; // rotate on X so the open jaw faces up
    openHead.position.set(-3.65, 0, 0);
    wrench.add(openHead);

    // --- RING HEAD (right) — centered, then positioned ---
    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, 1.0, 0, Math.PI * 2, false);
    const ringHole = new THREE.Path();
    ringHole.absarc(0, 0, 0.55, 0, Math.PI * 2, true);
    ringShape.holes.push(ringHole);

    const ringGeo = new THREE.ExtrudeGeometry(ringShape, {
      depth: 0.42,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 6,
      curveSegments: 48,
    });
    ringGeo.center();
    const ringHead = new THREE.Mesh(ringGeo, chromeMat);
    ringHead.position.set(3.65, 0, 0);
    wrench.add(ringHead);

    scene.add(wrench);

    // Interaction
    let dragging = false;
    let previousX = 0;
    let previousY = 0;
    let rotationX = 0.35;
    let rotationY = 0.5;

    const canvas = renderer.domElement;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      previousX = e.clientX;
      previousY = e.clientY;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = "grab";
      try { canvas.releasePointerCapture(e.pointerId); } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotationY += (e.clientX - previousX) * 0.01;
      rotationX += (e.clientY - previousY) * 0.01;
      previousX = e.clientX;
      previousY = e.clientY;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.01;
      if (!dragging) rotationY += 0.004;
      wrench.position.y = Math.sin(t) * 0.15;
      wrench.rotation.z = Math.sin(t * 0.5) * 0.05;
      wrench.rotation.x = rotationX;
      wrench.rotation.y = rotationY;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return (
    <section className="relative pt-28 pb-8 gradient-water overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          Drag to rotate
        </span>
        <h2 className="mt-4 text-3xl md:text-5xl font-bold">
          Tools of the <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">trade</span>
        </h2>
      </div>
      <div
        ref={mountRef}
        className="relative mx-auto mt-4 w-full h-[360px] md:h-[460px] cursor-grab select-none touch-none"
      />
    </section>
  );
}
