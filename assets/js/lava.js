(function () {
  var canvas = document.getElementById('lava-canvas');
  if (!canvas) return;
  var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return;

  var vs = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';

  var fs = [
    'precision highp float;',
    'uniform vec2 u_res;',
    'uniform float u_t;',
    'float sdSphere(vec3 p, float r){ return length(p) - r; }',
    'float smin(float a, float b, float k){',
    '  float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);',
    '  return mix(b, a, h) - k*h*(1.0-h);',
    '}',
    'float blob(vec3 p, float t, vec3 seed, float radius){',
    '  float bob = sin(t*0.25 + seed.x*6.0) * 0.9;',
    '  float wx  = sin(t*0.18 + seed.y*4.0) * 0.6 + cos(t*0.11 + seed.z*5.0) * 0.4;',
    '  float wz  = cos(t*0.14 + seed.z*3.0) * 0.5;',
    '  return sdSphere(p - vec3(wx, bob, wz), radius);',
    '}',
    'float map(vec3 p, float t){',
    '  float d = blob(p, t, vec3(0.1, 0.4, 0.7), 0.55);',
    '  d = smin(d, blob(p, t, vec3(0.6, 0.2, 0.3), 0.45), 0.65);',
    '  d = smin(d, blob(p, t, vec3(0.9, 0.7, 0.1), 0.50), 0.65);',
    '  d = smin(d, blob(p, t, vec3(0.3, 0.8, 0.5), 0.38), 0.65);',
    '  d = smin(d, blob(p, t, vec3(0.7, 0.1, 0.9), 0.42), 0.65);',
    '  d = smin(d, blob(p, t, vec3(0.2, 0.5, 0.2), 0.32), 0.65);',
    '  d = smin(d, blob(p, t, vec3(0.8, 0.3, 0.6), 0.28), 0.65);',
    '  return d;',
    '}',
    'vec3 normal(vec3 p, float t){',
    '  vec2 e = vec2(0.001, 0.0);',
    '  return normalize(vec3(',
    '    map(p+e.xyy, t) - map(p-e.xyy, t),',
    '    map(p+e.yxy, t) - map(p-e.yxy, t),',
    '    map(p+e.yyx, t) - map(p-e.yyx, t)',
    '  ));',
    '}',
    'void main(){',
    '  vec2 uv = (gl_FragCoord.xy - 0.5*u_res)/u_res.y;',
    '  float t = u_t;',
    '  vec3 ro = vec3(0.0, 0.0, 3.2);',
    '  vec3 rd = normalize(vec3(uv, -1.6));',
    '  float tt = 0.0, hit = 0.0, minDist = 1e9;',
    '  for(int i=0;i<80;i++){',
    '    vec3 p = ro + rd*tt;',
    '    float d = map(p, t);',
    '    minDist = min(minDist, d);',
    '    if(d < 0.001){ hit = 1.0; break; }',
    '    if(tt > 7.0) break;',
    '    tt += d * 0.92;',
    '  }',
    '  vec3 bg = vec3(1.0);',
    '  vec3 col = bg;',
    '  float alpha = 0.0;',
    '  if(hit > 0.5){',
    '    vec3 p = ro + rd*tt;',
    '    vec3 n = normal(p, t);',
    '    vec3 l1 = normalize(vec3(0.5, 0.8, 0.6));',
    '    vec3 l2 = normalize(vec3(-0.6, -0.2, -0.7));',
    '    float diff1 = max(dot(n, l1), 0.0);',
    '    float diff2 = max(dot(n, l2), 0.0);',
    '    vec3 h = normalize(l1 - rd);',
    '    float spec = pow(max(dot(n, h), 0.0), 32.0);',
    '    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 2.2);',
    '    vec3 wax1 = vec3(0.95, 0.32, 0.12);',
    '    vec3 wax2 = vec3(0.82, 0.15, 0.42);',
    '    vec3 wax3 = vec3(1.00, 0.62, 0.22);',
    '    vec3 base = mix(wax1, wax2, n.y*0.5+0.5);',
    '    base = mix(base, wax3, n.x*0.5+0.5);',
    '    col  = base * (0.35 + diff1 * 0.80);',
    '    col += vec3(1.00, 0.85, 0.55) * spec * 1.4;',
    '    col += vec3(1.00, 0.45, 0.30) * fres * 0.55;',
    '    col += vec3(0.50, 0.12, 0.55) * diff2 * 0.30;',
    '    alpha = 1.0;',
    '  } else {',
    '    float glow = exp(-minDist * 2.8);',
    '    vec3 haloColor = vec3(1.0, 0.40, 0.18);',
    '    col = mix(bg, haloColor, glow * 0.55);',
    '    alpha = glow * 0.85;',
    '  }',
    '  gl_FragColor = vec4(col * alpha, alpha);',
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(s));
    }
    return s;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  var uRes = gl.getUniformLocation(prog, 'u_res');
  var uT = gl.getUniformLocation(prog, 'u_t');

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(r.width * dpr));
    canvas.height = Math.max(1, Math.floor(r.height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(resize);
  }

  var running = true;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) { running = entries[0].isIntersecting; });
    io.observe(canvas);
  }

  var startMs;
  try {
    var stored = sessionStorage.getItem('lava-start');
    if (stored) {
      startMs = parseFloat(stored);
    } else {
      startMs = Date.now();
      sessionStorage.setItem('lava-start', String(startMs));
    }
  } catch (e) {
    startMs = Date.now();
  }

  function render() {
    if (running) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uT, (Date.now() - startMs) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(render);
  }
  render();
})();
