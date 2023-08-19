import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { gsap } from "gsap";
import vertex from "./shaders/index.vert";
import fragment from "./shaders/index.frag";

const TL = new THREE.TextureLoader();
const GL = new GLTFLoader();
const dl = new DRACOLoader();
dl.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
dl.preload();
GL.setDRACOLoader(dl);

export default class InteractiveSceneInit {
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
    this.activeElement = undefined;
    this.points = undefined;
    this.stats = undefined;
    this.controls = undefined;
    this.mixer = undefined;
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2(-10, -10);
    this.raycaster = new THREE.Raycaster();
    this.shadowMesh = undefined;
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
    this.renderer.setSize(window.innerWidth - 80, window.innerHeight - 80);

    // Enabled Shadow
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // TODO: Somehow it is not working in ReactJS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2.2;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 20;
    this.controls.target.set(0, 0, 0);

    // Init RAYCASTER
    const origin = new THREE.Vector3(-10, 0, 0);
    const direction = new THREE.Vector3(1, 0, 0);
    direction.normalize();
    this.raycaster.set(origin, direction);

    // Init Stat
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    this.initShadow();
    this.initModel();
    this.initLights();
    this.initEvents();
  }

  initModel() {
    // Load Model
    GL.load("models/shrek_hip_hop_dance.glb", (model) => {
      this.initSnowFlex();
      this.model = model.scene;
      this.model.position.z += 10;
      this.model.scale.setScalar(1.8);
      this.model.traverse((el) => {
        if (el.isMesh) {
          // Cash Shadow
          el.castShadow = true;
          el.material.map.colorSpace = THREE.SRGBColorSpace;
          const originalMaterial = el.material;
          el.material = new THREE.MeshStandardMaterial({
            map: originalMaterial.map,
            roughness: 0.5,
            metalness: 0.8,
          });
        }
      });

      // Playing animation
      this.mixer = new THREE.AnimationMixer(model.scene);
      const action = this.mixer.clipAction(model.animations[0]);
      action.play();

      this.scene.add(this.model);
    });
  }

  initShadow() {
    // Load Floor Texture
    const texture = TL.load(
      "/textures/floor/floor_tiles_06_diff_1k.jpg",
      (v) => (v.colorSpace = THREE.SRGBColorSpace),
    );
    const normal = TL.load("/textures/floor/floor_tiles_06_nor_gl_1k.jpg");
    const rough = TL.load("/textures/floor/floor_tiles_06_rough_1k.jpg");

    // Setup Mesh
    const geo = new THREE.PlaneGeometry(1, 1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      normalMap: normal,
      roughness: rough,
      color: new THREE.Color(0x7813dc),
    });
    this.shadowMesh = new THREE.Mesh(geo, mat);
    this.shadowMesh.scale.set(10, 9, 9);
    // Receive cast shadow
    this.shadowMesh.receiveShadow = true;
    this.shadowMesh.position.z += 9;
    this.shadowMesh.rotation.x = -Math.PI * 0.5;
    this.scene.add(this.shadowMesh);
  }

  initLights() {
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.intensity = 2;
    directionalLight.castShadow = true;
    directionalLight.position.set(5, 5, 5);
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.top = 10;

    this.directionalLight = directionalLight;
    this.scene.add(this.directionalLight);

    // Light Helper
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      this.directionalLight,
    );
    this.directionalLightHelper = directionalLightHelper;
    // this.scene.add(this.directionalLightHelper);
  }

  initCastRay() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    // Scale up / down model based on mouse hover and update color
    if (this.model) {
      const result = this.raycaster.intersectObject(this.model);
      if (result && result.length) {
        const closest = result[0].object;
        this.activeElement = closest;
        if (this.activeElement?.name === "Object_8") {
          this.activeElement.material.color.set(0xea06c0);
          this.points.material.uniforms.uColor2.value = new THREE.Color(
            0xea06c0,
          );
          gsap.to(this.activeElement.parent.scale, {
            x: 1.2,
            y: 1.2,
            duration: 0.5,
          });
          this.shadowMesh.material.color.set(0xea06c0);
        }
      } else {
        if (this.activeElement) {
          if (this.activeElement?.name === "Object_8") {
            gsap.to(this.activeElement.parent.scale, {
              x: 1,
              y: 1,
              duration: 0.5,
            });
            this.shadowMesh.material.color.set(0x7813dc);
          }
          this.activeElement.material.color.set(0xffffff);
          this.points.material.uniforms.uColor2.value = new THREE.Color(
            0xffffff,
          );
        }
        this.activeElement = undefined;
      }
    }
  }

  initSnowFlex() {
    const g = new THREE.BufferGeometry();
    const posArr = [];
    const shiftArr = [];
    const scaleArr = [];

    for (let i = 0; i < 200; i++) {
      const x = THREE.MathUtils.randFloat(-10, 10);
      const y = THREE.MathUtils.randFloat(2, 10);
      const z = THREE.MathUtils.randFloat(-10, 3);

      const shift = THREE.MathUtils.randFloat(0, 10);
      const scale = THREE.MathUtils.randFloat(1, 2);

      posArr.push(x, y, z);
      shiftArr.push(shift);
      scaleArr.push(scale);
    }

    const positionAttribute = new THREE.BufferAttribute(
      new Float32Array(posArr),
      3,
    );
    const timeShiftAttribute = new THREE.BufferAttribute(
      new Float32Array(shiftArr),
      1,
    );
    const scaleAttribute = new THREE.BufferAttribute(
      new Float32Array(scaleArr),
      1,
    );

    g.setAttribute("position", positionAttribute);
    g.setAttribute("aTimeShift", timeShiftAttribute);
    g.setAttribute("aScale", scaleAttribute);

    const m = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uTxt: { value: TL.load("/textures/glow.png") },
        uColor: { value: new THREE.Color(0x810e75) },
        uColor2: { value: new THREE.Color(0x7813dc) },
        uIntensity: { value: 12 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const p = new THREE.Points(g, m);

    this.points = p;
    this.scene.add(p);
  }

  pause() {
    window.cancelAnimationFrame(this.ref);
  }

  animate() {
    this.ref = window.requestAnimationFrame(this.animate.bind(this));

    this.stats.update();

    this.initCastRay();
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }

    if (this.points) {
      this.points.material.uniforms.uTime.value = this.clock.getElapsedTime();
    }
    this.controls.update();

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  initEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("pointermove", this.onMouseMove.bind(this));
  }

  onResize() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }
}
