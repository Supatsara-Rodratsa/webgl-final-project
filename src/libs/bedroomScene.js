import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const TL = new THREE.TextureLoader();
const GL = new GLTFLoader();
const dl = new DRACOLoader();
const rgbeLoader = new RGBELoader();
dl.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
dl.preload();
GL.setDRACOLoader(dl);

export default class BedroomSceneInit {
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

    // Init camera
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
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
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Enabled Shadow
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // TODO: Somehow it is not working in ReactJS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Init Stat
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    this.initEnvMap();
    this.initModel();
    this.initEvents();
  }

  initEnvMap() {
    rgbeLoader.load("/envMaps/envMap.hdr", (t) => {
      t.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = t;
    });
  }

  initModel() {
    GL.load("/models/modern_bedroom.glb", (model) => {
      this.model = model.scene;

      this.initLampPointLight();

      this.model.position.set(-1, -6, 0);
      this.model.scale.setScalar(4.5);
      this.model.rotation.y = 2;

      this.model.traverse((child) => {
        if (child.isMesh) {
          const envMap = this.scene.environment;
          child.material.envMap = envMap;
          child.material.envMapIntensity = 1.0;

          // Loading Texture
          if (child.name.includes("Duvet")) {
            const texture = TL.load(
              "/textures/fabric/fabric_pattern_05_col_01_1k.jpg",
              (v) => (v.colorSpace = THREE.SRGBColorSpace),
            );
            const normal = TL.load(
              "/textures/fabric/fabric_pattern_05_nor_gl_1k.jpg",
            );
            const rough = TL.load(
              "/textures/fabric/fabric_pattern_05_rough_1k.jpg",
            );
            child.material.color.set(0x810e75);
            child.material.normalMap = normal;
            child.material.map = texture;
            child.material.roughnessMap = rough;
            child.material.roughness = 0.9;
          }
        }
      });
      this.scene.add(this.model);
    });
  }

  initLampPointLight() {
    const lightPositions = [
      new THREE.Vector3(2.3, 0.6, 2.5),
      new THREE.Vector3(-2.3, 0.6, 2.5),
    ];

    for (let i = 0; i < lightPositions.length; i++) {
      const pointLight = new THREE.PointLight(0xd37a4a, 1.0);
      pointLight.position.copy(lightPositions[i]);
      pointLight.intensity = 100;
      pointLight.scale.setScalar(0.3);
      pointLight.castShadow = true;
      pointLight.visible = true;
      this.scene.add(pointLight);

      // Create a helper for the point light
      const pointLightHelper = new THREE.PointLightHelper(pointLight);
      this.model.add(pointLightHelper);
    }
  }

  pause() {
    window.cancelAnimationFrame(this.ref);
  }

  animate() {
    this.ref = window.requestAnimationFrame(this.animate.bind(this));
    if (this.model) {
      this.model.rotation.y += 0.00075;
    }
    this.stats.update();
    this.controls.update();
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
