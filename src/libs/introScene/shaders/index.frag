varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;

float line(vec2 p, float angle) {
  vec2 direction = vec2(cos(angle), sin(angle));
  return sin(dot(p, direction));
}


void main() {
  vec2 p = (vUv - 0.2) * 4.0;

  float brightness = 0.0;
  brightness += line(p, uTime);
  vec3 color = mix(uColor1, uColor2, abs(cos(uTime)));
  gl_FragColor = vec4(color * 1.9 * brightness, 1.0);
  gl_FragColor.a = 1.0;

}