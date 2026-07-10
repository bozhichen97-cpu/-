import{a as e}from"./rolldown-runtime-CNC7AqOf.js";import{i as t,n}from"./index-nyAwI4i5.js";import{Ct as r,Ft as i,It as a,Tt as o,et as s,ft as c,m as l,r as u,ut as d,wt as f}from"./three.module-B2a_aRUy.js";var p=e(t(),1),m=n(),h=8,g=`
#define MAX_COLORS ${h}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`,_=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;function v({className:e=``,style:t,rotation:n=90,speed:v=.2,colors:y=[],transparent:b=!0,autoRotate:x=0,scale:S=1,frequency:C=1,warpStrength:w=1,mouseInfluence:T=1,parallax:E=.5,noise:D=.15,iterations:O=1,intensity:k=1.5,bandWidth:A=6}){let j=(0,p.useRef)(null),M=(0,p.useRef)(null),N=(0,p.useRef)(null),P=(0,p.useRef)(null),F=(0,p.useRef)(null),I=(0,p.useRef)(n),L=(0,p.useRef)(x),R=(0,p.useRef)(new i(0,0)),z=(0,p.useRef)(new i(0,0));return(0,p.useEffect)(()=>{let e=j.current,t=new f,n=new d(-1,1,1,-1,0,1),p=new c(2,2),m=Array.from({length:h},()=>new a),y=new o({vertexShader:_,fragmentShader:g,uniforms:{uCanvas:{value:new i(1,1)},uTime:{value:0},uSpeed:{value:v},uRot:{value:new i(1,0)},uColorCount:{value:0},uColors:{value:m},uTransparent:{value:+!!b},uScale:{value:S},uFrequency:{value:C},uWarpStrength:{value:w},uPointer:{value:new i},uMouseInfluence:{value:T},uParallax:{value:E},uNoise:{value:D},uIterations:{value:O},uIntensity:{value:k},uBandWidth:{value:A}},premultipliedAlpha:!0,transparent:!0});P.current=y,t.add(new s(p,y));let x=new u({antialias:!1,powerPreference:`high-performance`,alpha:!0});M.current=x,x.outputColorSpace=r;let B=window.matchMedia(`(max-width: 760px)`).matches;x.setPixelRatio(Math.min(window.devicePixelRatio||1,B?1:1.35)),x.setClearColor(0,+!b),x.domElement.style.width=`100%`,x.domElement.style.height=`100%`,x.domElement.style.display=`block`,e.appendChild(x.domElement);let V=new l,H=()=>{let t=e.clientWidth||1,n=e.clientHeight||1;x.setSize(t,n,!1),y.uniforms.uCanvas.value.set(t,n)};if(H(),`ResizeObserver`in window){let t=new ResizeObserver(H);t.observe(e),F.current=t}else window.addEventListener(`resize`,H);let U=!0,W=()=>{if(N.current=null,!U||document.hidden)return;let e=V.getDelta(),r=V.elapsedTime;y.uniforms.uTime.value=r;let i=(I.current%360+L.current*r)*Math.PI/180;y.uniforms.uRot.value.set(Math.cos(i),Math.sin(i)),z.current.lerp(R.current,Math.min(1,e*8)),y.uniforms.uPointer.value.copy(z.current),x.render(t,n),N.current=requestAnimationFrame(W)},G=()=>{N.current===null&&U&&!document.hidden&&(V.getDelta(),N.current=requestAnimationFrame(W))},K=()=>{N.current!==null&&cancelAnimationFrame(N.current),N.current=null},q=new IntersectionObserver(([e])=>{U=e.isIntersecting,U?G():K()},{rootMargin:`120px 0px`}),J=()=>{document.hidden?K():G()};return q.observe(e),document.addEventListener(`visibilitychange`,J),G(),()=>{K(),q.disconnect(),document.removeEventListener(`visibilitychange`,J),F.current?F.current.disconnect():window.removeEventListener(`resize`,H),p.dispose(),y.dispose(),x.dispose(),x.forceContextLoss(),x.domElement.parentElement===e&&e.removeChild(x.domElement)}},[A,C,k,O,T,D,E,S,v,b,w]),(0,p.useEffect)(()=>{let e=P.current,t=M.current;if(!e)return;I.current=n,L.current=x,e.uniforms.uSpeed.value=v,e.uniforms.uScale.value=S,e.uniforms.uFrequency.value=C,e.uniforms.uWarpStrength.value=w,e.uniforms.uMouseInfluence.value=T,e.uniforms.uParallax.value=E,e.uniforms.uNoise.value=D,e.uniforms.uIterations.value=O,e.uniforms.uIntensity.value=k,e.uniforms.uBandWidth.value=A;let r=y.filter(Boolean).slice(0,h).map(e=>{let t=e.replace(`#`,``).trim(),n=t.length===3?[parseInt(t[0]+t[0],16),parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16)]:[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)];return new a(n[0]/255,n[1]/255,n[2]/255)});for(let t=0;t<h;t+=1){let n=e.uniforms.uColors.value[t];t<r.length?n.copy(r[t]):n.set(0,0,0)}e.uniforms.uColorCount.value=r.length,e.uniforms.uTransparent.value=+!!b,t&&t.setClearColor(0,+!b)},[n,x,v,S,C,w,T,E,D,O,k,A,y,b]),(0,p.useEffect)(()=>{let e=j.current;if(!e)return;let t=t=>{let n=e.getBoundingClientRect();if(t.clientY<n.top||t.clientY>n.bottom)return;let r=(t.clientX-n.left)/(n.width||1)*2-1,i=-((t.clientY-n.top)/(n.height||1)*2-1);R.current.set(r,i)};return window.addEventListener(`pointermove`,t,{passive:!0}),()=>window.removeEventListener(`pointermove`,t)},[]),(0,m.jsx)(`div`,{ref:j,className:`color-bends-container ${e}`,style:t,"aria-hidden":`true`})}export{v as default};