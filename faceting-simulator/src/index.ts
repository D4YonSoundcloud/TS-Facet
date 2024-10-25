import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FacetingMachine } from './FacetingMachine';
import { GemstoneModel } from './GemstoneModel';
import { UI } from './UI';

class FacetingSimulator {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private facetingMachine: FacetingMachine;
    private gemstone: GemstoneModel;
    private ui: UI;

    constructor() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLights();
        this.setupHelpers();

        this.gemstone = new GemstoneModel();
        this.facetingMachine = new FacetingMachine(this.gemstone);
        this.ui = new UI(this.facetingMachine, this.gemstone);

        this.scene.add(this.facetingMachine.getMesh());

        window.addEventListener('resize', () => this.onWindowResize(), false);

        this.animate();
    }

    private setupScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111111);
    }

    private setupCamera(): void {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);
    }

    private setupRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    private setupControls(): void {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    private setupLights(): void {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, 5, -5);
        this.scene.add(pointLight);
    }

    private setupHelpers(): void {
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        const gridHelper = new THREE.GridHelper(10, 10);
        this.scene.add(gridHelper);
    }

    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate(): void {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the application
new FacetingSimulator();