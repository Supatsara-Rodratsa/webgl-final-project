uniform sampler2D uTxt;
uniform vec3 uColor;
uniform vec3 uColor2;

varying vec2 vUv;
varying float vIntensity;

void main(){
  vec2 uv = gl_PointCoord.xy;
  vec4 txt = texture2D(uTxt, uv);


  vec3 finalColor = mix(uColor, uColor2, vIntensity);

  float a = txt.r * (1.0- vIntensity);
  
  gl_FragColor = vec4(finalColor, a);
}