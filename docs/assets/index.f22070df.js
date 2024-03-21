import { j as T, _ as u, R as p, a as R } from './vendor.fe7d7b3e.js'; const v = function () {
  const r = document.createElement('link').relList; if (r && r.supports && r.supports('modulepreload')) {
    return;
  } for (const o of document.querySelectorAll('link[rel="modulepreload"]')) {
    n(o);
  } new MutationObserver((o) => {
    for (const a of o) {
      if (a.type === 'childList') {
        for (const i of a.addedNodes) {
          i.tagName === 'LINK' && i.rel === 'modulepreload' && n(i);
        }
      }
    }
  }).observe(document, { childList: !0, subtree: !0 }); function t(o) {
    const a = {}; return o.integrity && (a.integrity = o.integrity), o.referrerpolicy && (a.referrerPolicy = o.referrerpolicy), o.crossorigin === 'use-credentials' ? a.credentials = 'include' : o.crossorigin === 'anonymous' ? a.credentials = 'omit' : a.credentials = 'same-origin', a;
  } function n(o) {
    if (o.ep) {
      return;
    } o.ep = !0; const a = t(o); fetch(o.href, a);
  }
}; v(); const A = `
attribute vec4 vertexPos;
attribute vec4 texturePos;
varying vec2 textureCoord;
void main(){
    gl_Position = vertexPos; 
    textureCoord = texturePos.xy;
}
`; const _ = `
precision highp float;
varying highp vec2 textureCoord;
uniform sampler2D ySampler;
uniform sampler2D uSampler;
uniform sampler2D vSampler;
const mat4 YUV2RGB = mat4(
    1.1643828125, 0, 1.59602734375, -.87078515625,
    1.1643828125, -.39176171875, -.81296875, .52959375,
    1.1643828125, 2.017234375, 0, -1.081390625,
    0, 0, 0, 1
);

void main(void) {
    highp float y = texture2D(ySampler,  textureCoord).r;
    highp float u = texture2D(uSampler,  textureCoord).r;
    highp float v = texture2D(vSampler,  textureCoord).r;
    gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;
}
`;function S(e) {
  const r = e.createShader(e.VERTEX_SHADER); if (!r) {
    return null;
  } e.shaderSource(r, A), e.compileShader(r), e.getShaderParameter(r, e.COMPILE_STATUS) || console.warn(`Vertex shader failed to compile: ${e.getShaderInfoLog(r)}`); const t = e.createShader(e.FRAGMENT_SHADER); if (!t) {
    return null;
  } e.shaderSource(t, _), e.compileShader(t), e.getShaderParameter(t, e.COMPILE_STATUS) || console.warn(`Fragment shader failed to compile: ${e.getShaderInfoLog(t)}`); const n = e.createProgram(); return n ? (e.attachShader(n, r), e.attachShader(n, t), e.linkProgram(n), e.getProgramParameter(n, e.LINK_STATUS) || console.warn(`Program failed to compile: ${e.getProgramInfoLog(n)}`), e.useProgram(n), n) : null;
} function x(e) {
  const r = e.createTexture(); return e.bindTexture(e.TEXTURE_2D, r), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.bindTexture(e.TEXTURE_2D, null), r;
} function U(e, r) {
  const t = x(e); const n = e.getUniformLocation(r, 'ySampler'); return e.uniform1i(n, 0), t;
} function y(e, r) {
  const t = x(e); const n = e.getUniformLocation(r, 'uSampler'); return e.uniform1i(n, 1), t;
} function b(e, r) {
  const t = x(e); const n = e.getUniformLocation(r, 'vSampler'); return e.uniform1i(n, 2), t;
} function D(e, r) {
  const t = e.createBuffer(); e.bindBuffer(e.ARRAY_BUFFER, t), e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), e.STATIC_DRAW); const n = e.getAttribLocation(r, 'vertexPos'); e.enableVertexAttribArray(n), e.vertexAttribPointer(n, 2, e.FLOAT, !1, 0, 0); const o = e.createBuffer(); e.bindBuffer(e.ARRAY_BUFFER, o), e.bufferData(e.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), e.STATIC_DRAW); const a = e.getAttribLocation(r, 'texturePos'); e.enableVertexAttribArray(a), e.vertexAttribPointer(a, 2, e.FLOAT, !1, 0, 0);
} const d = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d']; function P(e) {
  let r = null; let t = 0; for (;!r && t < d.length;) {
    const n = d[t]; try {
      r = e.getContext(n);
    }
    catch {
      r = null;
    }(!r || typeof r.getParameter !== 'function') && (r = null), ++t;
  } return r;
} class L {
  constructor(r) {
    this.width = 0, this.height = 0, this.yTexture = null, this.uTexture = null, this.vTexture = null, this.el = r; const t = P(r); if (this.webglContext = t, !t) {
      return;
    } const n = S(t); !n || (D(t, n), this.yTexture = U(t, n), this.uTexture = y(t, n), this.vTexture = b(t, n));
  }setDimension(r, t) {
    const { el: n } = this; n.width = r, n.height = t, this.width = r, this.height = t;
  }render(r) {
    const t = this.webglContext; if (!t) {
      console.warn('\u672A\u521B\u5EFA webgl'); return;
    } const { width: n, height: o } = this; t.pixelStorei(t.UNPACK_ALIGNMENT, 1), t.viewport(0, 0, n, o); const a = r; const i = n * o; const s = a.subarray(0, i); t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, this.yTexture), t.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, n, o, 0, t.LUMINANCE, t.UNSIGNED_BYTE, s); const f = n * o / 4; const m = a.subarray(i, i + f); t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, this.uTexture), t.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, n / 2, o / 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, m); const l = f; const E = a.subarray(i + f, i + f + l); t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, this.vTexture), t.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, n / 2, o / 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, E), t.drawArrays(t.TRIANGLE_STRIP, 0, 4);
  }clear() {
    const { webglContext: r } = this; r && r.clear(r.COLOR_BUFFER_BIT);
  }dispose() {
    let t; let n; let o; this.clear(); try {
      (n = (t = this.webglContext) == null ? void 0 : t.getExtension('WEBGL_lose_context')) == null || n.loseContext();
    }
    catch {} const { el: r } = this; (o = r.parentNode) == null || o.removeChild(r), this.webglContext = null, this.yTexture = null, this.uTexture = null, this.vTexture = null;
  }
} const c = T.exports.jsx; const h = T.exports.jsxs; function N(e, r) {
  const t = u.exports.useRef(null); const n = u.exports.useRef(null); const [o, a] = u.exports.useState(!1); return u.exports.useEffect(() => {
    const i = t.current; if (!i) {
      return;
    } const s = new L(i); s.setDimension(768, 320), n.current = s;
  }, []), u.exports.useImperativeHandle(r, () => ({
    start() {
      a(!0), fetch('/yuv-render/frame.json').then((i) => i.json()).then((i) => {
        let s; a(!1), (s = n.current) == null || s.render(new Uint8Array(i));
      });
    }
  })), h('div', { className: `yuv-render${o ? ' v-waiting' : ''}`, children: [c('canvas', { ref: t }), c('div', { className: 'v-loading-spinner' })] });
} const C = u.exports.forwardRef(N); function I() {
  const e = u.exports.useRef(null); return h('div', {
    className: 'viewport', children: [c(C, { ref: e }), c('button', {
      className: 'btn btn-default btn-primary', onClick: () => {
        e.current.start();
      }, children: 'Click here'
    })]
  });
}p.render(c(R.StrictMode, { children: c(I, {}) }), document.getElementById('root'));
