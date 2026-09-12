import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

interface Ring3D {
  radius: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  rotationSpeed: number;
  points: number;
  color: string;
}

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Particle Constellation
    const particleCount = 55;
    const particles: Particle3D[] = [];
    const focalLength = 450;

    const colors = [
      'rgba(4, 120, 87, 0.65)',    // Deep Emerald
      'rgba(16, 185, 129, 0.6)',   // Bright Emerald
      'rgba(249, 115, 22, 0.55)',   // Warm Peach
      'rgba(251, 146, 60, 0.5)',   // Soft Amber
      'rgba(52, 211, 153, 0.6)',   // Mint
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.4,
        y: (Math.random() - 0.5) * height * 1.4,
        z: Math.random() * 800 - 400,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.8 + 1.2,
        color: colors[i % colors.length],
      });
    }

    // 3D Orbiting Wireframe Rings
    const rings: Ring3D[] = [
      { radius: 240, tiltX: 0.6, tiltY: 0.4, tiltZ: 0.2, rotationSpeed: 0.003, points: 28, color: 'rgba(249, 115, 22, 0.18)' },
      { radius: 360, tiltX: -0.4, tiltY: 0.7, tiltZ: -0.3, rotationSpeed: -0.002, points: 36, color: 'rgba(16, 185, 129, 0.18)' },
      { radius: 480, tiltX: 0.3, tiltY: -0.5, tiltZ: 0.5, rotationSpeed: 0.0015, points: 44, color: 'rgba(4, 120, 87, 0.14)' },
    ];

    let angleY = 0;
    let angleX = 0;
    let ringAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      angleY += 0.001 + mouseRef.current.x * 0.004;
      angleX += 0.0006 + mouseRef.current.y * 0.004;
      ringAngle += 0.004;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 1. Draw 3D Orbiting Geometric Rings
      rings.forEach((ring) => {
        ctx.beginPath();
        let firstPoint: { x: number; y: number } | null = null;

        for (let i = 0; i <= ring.points; i++) {
          const theta = (i / ring.points) * Math.PI * 2 + ringAngle * ring.rotationSpeed * 100;
          let rx = Math.cos(theta) * ring.radius;
          let ry = Math.sin(theta) * ring.radius;
          let rz = 0;

          // Apply ring tilt rotations
          const y1 = ry * Math.cos(ring.tiltX) - rz * Math.sin(ring.tiltX);
          const z1 = rz * Math.cos(ring.tiltX) + ry * Math.sin(ring.tiltX);

          const x2 = rx * Math.cos(ring.tiltY) + z1 * Math.sin(ring.tiltY);
          const z2 = z1 * Math.cos(ring.tiltY) - rx * Math.sin(ring.tiltY);

          // World camera rotation
          const x3 = x2 * cosY - z2 * sinY;
          const z3 = z2 * cosY + x2 * sinY;
          const y4 = y1 * cosX - z3 * sinX;
          const z4 = z3 * cosX + y1 * sinX;

          const scale = focalLength / (focalLength + z4 + 400);
          if (scale > 0) {
            const px = x3 * scale + width / 2;
            const py = y4 * scale + height / 2;

            if (i === 0) {
              firstPoint = { x: px, y: py };
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
        }

        if (firstPoint) {
          ctx.strokeStyle = ring.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      // 2. Draw 3D Particles & Dynamic Constellation Web
      const projectedPoints: { x2d: number; y2d: number; scale: number; p: Particle3D }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Spatial boundary wrap
        const boundX = width * 0.7;
        const boundY = height * 0.7;
        if (p.x < -boundX) p.x = boundX;
        if (p.x > boundX) p.x = -boundX;
        if (p.y < -boundY) p.y = boundY;
        if (p.y > boundY) p.y = -boundY;
        if (p.z < -400) p.z = 400;
        if (p.z > 400) p.z = -400;

        // 3D Matrix Rotation
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const scale = focalLength / (focalLength + z2 + 450);
        const x2d = x1 * scale + width / 2;
        const y2d = y1 * scale + height / 2;

        projectedPoints.push({ x2d, y2d, scale, p });

        // Draw particle node with depth glow
        if (scale > 0) {
          const r = Math.max(1.2, p.radius * scale);
          ctx.beginPath();
          ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Luminous Outer Halo
          ctx.beginPath();
          ctx.arc(x2d, y2d, r * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(/[\d\.]+\)$/, '0.12)');
          ctx.fill();
        }
      }

      // Draw 3D Constellation Connections
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const pt1 = projectedPoints[i];
          const pt2 = projectedPoints[j];

          const dx = pt1.x2d - pt2.x2d;
          const dy = pt1.y2d - pt2.y2d;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 145 * ((pt1.scale + pt2.scale) / 2);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28 * Math.min(pt1.scale, pt2.scale);
            ctx.beginPath();
            ctx.moveTo(pt1.x2d, pt1.y2d);
            ctx.lineTo(pt2.x2d, pt2.y2d);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.9 * ((pt1.scale + pt2.scale) / 2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Dynamic foundation gradient */}
      <div className="absolute inset-0 bg-[#fbfdfc] dark:bg-[#020e09] transition-colors duration-500" />

      {/* Moving Ambient 3D Volumetric Orbs */}
      <motion.div
        animate={{
          x: [0, 90, -50, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.2, 0.9, 1],
          rotate: [0, 45, -45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 sm:w-[560px] h-96 sm:h-[560px] rounded-full bg-gradient-to-br from-emerald-400/25 via-forest-600/15 to-transparent dark:from-emerald-800/35 dark:via-forest-950/25 dark:to-transparent blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.25, 0.92, 1],
          rotate: [0, -30, 30, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/4 -right-32 w-80 sm:w-[520px] h-80 sm:h-[520px] rounded-full bg-gradient-to-bl from-peach-400/30 via-peach-500/15 to-transparent dark:from-peach-700/20 dark:via-forest-900/20 dark:to-transparent blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 70, -80, 0],
          y: [0, -50, 70, 0],
          scale: [0.9, 1.15, 0.95, 0.9],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute -bottom-40 left-1/3 w-96 sm:w-[620px] h-96 sm:h-[620px] rounded-full bg-gradient-to-tr from-forest-600/20 via-emerald-400/20 to-transparent dark:from-forest-900/30 dark:via-emerald-950/25 dark:to-transparent blur-3xl"
      />

      {/* Interactive 3D Canvas Scene */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 dark:opacity-85" />

      {/* Tech Grid Floor Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#062016 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
