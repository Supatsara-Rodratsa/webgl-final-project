import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const TL = new THREE.TextureLoader();
const GL = new GLTFLoader();
const dl = new DRACOLoader();
dl.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
dl.preload();
GL.setDRACOLoader(dl);

export default class ModelSceneInit {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.ref = undefined;
    this.model = undefined;
    this.secondModel = undefined;
    this.thirdModel = undefined;
    this.fourthModel = undefined;
    this.canvasId = canvasId;
    this.stats = undefined;
    this.controls = undefined;
    this.clock = new THREE.Clock();
  }

  initialize() {
    // Init Scene
    this.scene = new THREE.Scene();
    const canvas = document.getElementById(this.canvasId);

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

    this.initModel();
    this.initEvents();
  }

  initModel() {
    // Load GLB
    GL.load("/models/statue.glb", (model) => {
      // First Model
      this.model = model.scene;
      this.model.position.set(30, -15, 0);

      // Second Model : Clone First Model and Adjusting Texture
      this.secondModel = model.scene.clone();
      this.secondModel.position.set(-25, 5, 0);

      this.secondModel.children[0].traverse((child) => {
        const texture = TL.load(
          "/textures/texture9.jpeg",
          (v) => (v.colorSpace = THREE.SRGBColorSpace),
        );
        const clone = child.material?.clone();
        child.material = new THREE.MeshBasicMaterial({
          ...clone,
          map: texture,
        });
      });

      // Third Model : Clone First Model and Adjusting Texture
      this.thirdModel = model.scene.clone();
      this.thirdModel.position.set(-18, -20, 0);

      this.thirdModel.children[0].traverse((child) => {
        const texture = TL.load(
          "/textures/texture7.jpeg",
          (v) => (v.colorSpace = THREE.SRGBColorSpace),
        );
        const clone = child.material?.clone();
        child.material = new THREE.MeshBasicMaterial({
          ...clone,
          map: texture,
        });
      });

      // Fourth Model : Clone First Model and Adjusting Texture
      this.fourthModel = model.scene.clone();
      this.fourthModel.position.set(30, 8, 0);
      this.fourthModel.scale.setScalar(0.8);

      this.fourthModel.children[0].traverse((child) => {
        const texture = TL.load(
          "/textures/texture2.jpeg",
          (v) => (v.colorSpace = THREE.SRGBColorSpace),
        );
        const clone = child.material?.clone();
        child.material = new THREE.MeshBasicMaterial({
          ...clone,
          map: texture,
        });
      });

      this.scene.add(this.model);
      this.scene.add(this.secondModel);
      this.scene.add(this.thirdModel);
      this.scene.add(this.fourthModel);
    });
  }

  pause() {
    window.cancelAnimationFrame(this.ref);
  }

  animate() {
    this.ref = window.requestAnimationFrame(this.animate.bind(this));
    this.stats.update();
    this.controls.update();
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  initEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  onScroll() {
    const currentScrollY = window.scrollY;

    // Rotate Model based on scrolling event
    if (this.model) {
      this.model.rotation.y = currentScrollY * 0.01;
      this.secondModel.rotation.y = currentScrollY * 0.01;
      this.thirdModel.rotation.y = currentScrollY * -0.01;
      this.fourthModel.rotation.y = currentScrollY * -0.01;
    }
  }

  onResize() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
