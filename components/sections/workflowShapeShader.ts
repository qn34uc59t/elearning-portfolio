export const VERTEX_SHADER = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uFromStep;
  uniform float uToStep;
  uniform float uMorph;

  #define PI 3.14159265359
  #define TAU 6.28318530718
  #define MAX_STEPS 72
  #define MAX_DIST 40.0
  #define SURF_DIST 0.001

  mat2 rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  float sdSphere(vec3 p, float r) {
    return length(p) - r;
  }

  float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
  }

  float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    float m = p.x + p.y + p.z - s;
    vec3 q;
    if (3.0 * p.x < m) q = p.xyz;
    else if (3.0 * p.y < m) q = p.yzx;
    else if (3.0 * p.z < m) q = p.zxy;
    else return m * 0.57735027;

    float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
    return length(vec3(q.x, q.y - s + k, q.z - k));
  }

  float sdTriPrism(vec3 p, vec2 h) {
    vec3 q = abs(p);
    return max(q.z - h.y, max(q.x * 0.866025 + p.y * 0.5, -p.y) - h.x * 0.5);
  }

  float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
  }

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float shapeForStep(vec3 p, float stepIndex) {
    vec3 q = p;

    if (stepIndex < 0.5) {
      q.xz *= rot(uTime * 0.1);
      return sdSphere(q, 1.35);
    }
    if (stepIndex < 1.5) {
      q.xy *= rot(uTime * 0.08);
      q.xz *= rot(PI * 0.25);
      return sdBox(q, vec3(1.1, 1.1, 1.1));
    }
    if (stepIndex < 2.5) {
      q.yz *= rot(uTime * 0.12);
      float distort = sin(q.x * 4.0 + uTime) * sin(q.y * 4.0 + uTime) * sin(q.z * 4.0 + uTime) * 0.06;
      return sdOctahedron(q, 1.45) + distort;
    }
    if (stepIndex < 3.5) {
      q.xy *= rot(PI * 0.25 + uTime * 0.15);
      return sdTriPrism(q, vec2(1.5, 1.8));
    }

    q.xz *= rot(uTime * 0.1);
    q.xy *= rot(uTime * 0.07);
    return sdTorus(q, vec2(1.15, 0.32));
  }

  float map(vec3 p) {
    vec2 m = (uMouse - 0.5) * 1.8;
    p.xy += m * 0.08;

    p.xz *= rot(uTime * 0.08);
    p.xy *= rot(uTime * 0.05);

    float fromShape = shapeForStep(p, uFromStep);
    float toShape = shapeForStep(p, uToStep);
    float morph = smoothstep(0.0, 1.0, uMorph);

    return mix(fromShape, toShape, morph);
  }

  vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
      map(p + e.xyy) - map(p - e.xyy),
      map(p + e.yxy) - map(p - e.yxy),
      map(p + e.yyx) - map(p - e.yyx)
    ));
  }

  float raymarch(vec3 ro, vec3 rd) {
    float t = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 p = ro + rd * t;
      float d = map(p);
      if (abs(d) < SURF_DIST || t > MAX_DIST) break;
      t += d * 0.72;
    }
    return t;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

    vec2 m = (uMouse - 0.5) * 0.35;
    vec3 ro = vec3(m.x * 0.5, m.y * 0.5, 5.5);
    vec3 rd = normalize(vec3(uv, -1.0));

    rd.xy *= rot(m.x * 0.06);
    rd.yz *= rot(m.y * 0.06);

    float t = raymarch(ro, rd);

    if (t >= MAX_DIST) {
      gl_FragColor = vec4(0.0);
      return;
    }

    vec3 p = ro + rd * t;
    vec3 normal = getNormal(p);
    vec3 viewDir = normalize(ro - p);

    vec3 keyDir = normalize(vec3(0.5, 0.85, 0.6));
    vec3 fillDir = normalize(vec3(-0.6, -0.1, 0.4));

    float key = max(dot(normal, keyDir), 0.0);
    float fill = max(dot(normal, fillDir), 0.0);

    float ambient = 0.55;
    vec3 base = vec3(0.4, 0.2, 0.933);
    vec3 color = base * (ambient + (1.0 - ambient) * key);
    color += vec3(0.12, 0.06, 0.28) * fill;

    vec3 halfDir = normalize(keyDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 70.0);
    color += spec * vec3(1.0) * 0.7;

    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);
    color = mix(color, vec3(0.55, 0.35, 0.95), fresnel * 0.6);
    color += fresnel * vec3(0.1, 0.05, 0.2);

    color = clamp(color, 0.0, 1.0);
    gl_FragColor = vec4(color, 1.0);
  }
`;
