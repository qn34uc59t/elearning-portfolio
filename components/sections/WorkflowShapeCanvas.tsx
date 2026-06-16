"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FRAGMENT_SHADER,
  VERTEX_SHADER,
} from "@/components/sections/workflowShapeShader";
import styles from "./WorkflowShapeCanvas.module.css";

const MORPH_DURATION = 0.65;

type WorkflowShapeCanvasProps = {
  stepIndex: number;
  isActive: boolean;
};

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function WorkflowShapeCanvas({
  stepIndex,
  isActive,
}: WorkflowShapeCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const morphStateRef = useRef({
    fromStep: stepIndex,
    toStep: stepIndex,
    morph: 1,
  });
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const rafRef = useRef<number>(0);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const morph = morphStateRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (stepIndex === morph.toStep && morph.morph >= 1) {
      return;
    }

    gsap.killTweensOf(morph);

    if (prefersReducedMotion || !isActive) {
      morph.fromStep = stepIndex;
      morph.toStep = stepIndex;
      morph.morph = 1;
      return;
    }

    morph.fromStep = morph.toStep;
    morph.toStep = stepIndex;
    morph.morph = 0;

    gsap.to(morph, {
      morph: 1,
      duration: MORPH_DURATION,
      ease: "power2.inOut",
      onComplete: () => {
        morph.fromStep = morph.toStep;
        morph.morph = 1;
      },
    });
  }, [stepIndex, isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: false,
      }) || canvas.getContext("experimental-webgl");

    if (!gl) return;

    const webgl = gl as WebGLRenderingContext;

    const vertexShader = createShader(webgl, webgl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = createShader(
      webgl,
      webgl.FRAGMENT_SHADER,
      FRAGMENT_SHADER
    );

    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(webgl, vertexShader, fragmentShader);
    if (!program) return;

    const uTime = webgl.getUniformLocation(program, "uTime");
    const uResolution = webgl.getUniformLocation(program, "uResolution");
    const uMouse = webgl.getUniformLocation(program, "uMouse");
    const uFromStep = webgl.getUniformLocation(program, "uFromStep");
    const uToStep = webgl.getUniformLocation(program, "uToStep");
    const uMorph = webgl.getUniformLocation(program, "uMorph");

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const positionBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, positions, webgl.STATIC_DRAW);

    const positionLocation = webgl.getAttribLocation(program, "position");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = wrapper.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      webgl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouseRef.current.targetX = (event.clientX - rect.left) / rect.width;
      mouseRef.current.targetY =
        1 - (event.clientY - rect.top) / rect.height;
    };

    window.addEventListener("pointermove", onPointerMove);

    const startTime = performance.now();
    let running = true;

    const render = () => {
      if (!running) return;

      rafRef.current = requestAnimationFrame(render);

      if (!isActiveRef.current) return;

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const morph = morphStateRef.current;
      const time = (performance.now() - startTime) * 0.001;

      webgl.clearColor(0, 0, 0, 0);
      webgl.clear(webgl.COLOR_BUFFER_BIT);
      webgl.enable(webgl.BLEND);
      webgl.blendFunc(webgl.SRC_ALPHA, webgl.ONE_MINUS_SRC_ALPHA);

      webgl.useProgram(program);
      webgl.uniform1f(uTime, time);
      webgl.uniform2f(uResolution, canvas.width, canvas.height);
      webgl.uniform2f(uMouse, mouse.x, mouse.y);
      webgl.uniform1f(uFromStep, morph.fromStep);
      webgl.uniform1f(uToStep, morph.toStep);
      webgl.uniform1f(uMorph, morph.morph);

      webgl.enableVertexAttribArray(positionLocation);
      webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
      webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
      webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      gsap.killTweensOf(morphStateRef.current);
      webgl.deleteProgram(program);
      webgl.deleteShader(vertexShader);
      webgl.deleteShader(fragmentShader);
      webgl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.shapeCanvas}
      data-shape-canvas
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
