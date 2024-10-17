import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FacetingMachine } from './FacetingMachine';
import { GemstoneModel } from './GemstoneModel';
import { CuttingSimulation } from './CuttingSimulation';
import { UI } from './UI';

class FacetingSimulator {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private facetingMachine: FacetingMachine;
    private gemstone: GemstoneModel;
    private cuttingSimulation: CuttingSimulation;
    private ui: UI;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.facetingMachine = new FacetingMachine();
        this.gemstone = new GemstoneModel();
        this.cuttingSimulation = new CuttingSimulation(this.gemstone);
        this.ui = new UI(this.facetingMachine, this.cuttingSimulation);

        this.scene.add(this.facetingMachine.getMesh());
        this.scene.add(this.gemstone.getMesh());

        this.addLights();

        window.addEventListener('resize', () => this.onWindowResize(), false);

        this.animate();
    }

    private addLights(): void {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
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