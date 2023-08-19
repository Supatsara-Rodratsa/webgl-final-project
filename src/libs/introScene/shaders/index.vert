varying float z;
uniform float uTime;
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z + position.z, 1.0);
}