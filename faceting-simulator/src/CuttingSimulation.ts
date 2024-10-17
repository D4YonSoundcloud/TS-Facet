import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { GemstoneModel } from './GemstoneModel';

export class CuttingSimulation {
    private gemstone: GemstoneModel;

    constructor(gemstone: GemstoneModel) {
        this.gemstone = gemstone;
    }

    public performCut(angle: number, rotation: number): void {
        const gemMesh = this.gemstone.getMesh();
        const cuttingPlane = this.createCuttingPlane(angle, rotation);

        const gemCSG = CSG.fromMesh(gemMesh);
        const planeCSG = CSG.fromMesh(cuttingPlane);
        const resultCSG = gemCSG.subtract(planeCSG);

        const resultMesh = CSG.toMesh(resultCSG, gemMesh.matrix);
        this.gemstone.updateGeometry(resultMesh.geometry);
    }

    private createCuttingPlane(angle: number, rotation: number): THREE.Mesh {
        const planeGeometry = new THREE.PlaneGeometry(5, 5);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);

        plane.rotation.x = THREE.MathUtils.degToRad(angle);
        plane.rotation.z = THREE.MathUtils.degToRad(rotation);

        return plane;
    }
}