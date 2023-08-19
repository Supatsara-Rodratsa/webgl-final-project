import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import vertex from "./shaders/index.vert";
import fragment from "./shaders/index.frag";

export default class IntroSceneInit {
  constructor(canvasId, isBox = true) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.ref = undefined;
    this.box = undefined;
    this.stats = undefined;
    this.controls = undefined;
    this.canvasId = canvasId;
    this.isBox = isBox;
    this.clock = new THREE.Clock();
  }

  initialize() {
    // Init Scene
    this.scene = new THREE.Scene();
    const canvas = document.getElementById(this.canvasId);

    // Init camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    this.camera.position.z = 48;

    // Init Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth - 80, window.innerHeight - 80);

    // TODO: Somehow it is not working in ReactJS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Init Stat
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    this.initMesh();
    this.initEvents();
  }

  initMesh() {
    let geometry;
    if (this.isBox) {
      geometry = new THREE.BoxGeometry(16, 16, 16);
    } else {
      geometry = new THREE.SphereGeometry(18);
    }

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0.0 },
        uColor1: { value: new THREE.Color(0xc8620e) },
        uColor2: { value: new THREE.Color(0x810e75) },
      },
    });
    this.box = new THREE.Mesh(geometry, material);
    this.scene.add(this.box);
  }

  pause() {
    window.cancelAnimationFrame(this.ref);
  }

  animate() {
    this.ref = window.requestAnimationFrame(this.animate.bind(this));
    const t = this.clock.getElapsedTime();

    this.stats.update();
    this.controls.update();
    this.box.rotation.y += 0.01;
    this.box.material.uniforms.uTime.value = t;
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  initEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
