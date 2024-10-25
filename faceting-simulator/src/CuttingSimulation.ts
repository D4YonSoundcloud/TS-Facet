import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { GemstoneModel } from './GemstoneModel';

export class CuttingSimulation {
    private gemstone: GemstoneModel;

    constructor(gemstone: GemstoneModel) {
        this.gemstone = gemstone;
    }

    public performCut(mastAngle: number, dopRotation: number, indexPosition: number): void {
        const gemMesh = this.gemstone.getMesh();
        const cuttingPlane = this.createCuttingPlane(mastAngle, dopRotation, indexPosition);

        const gemCSG = CSG.fromMesh(gemMesh);
        const planeCSG = CSG.fromMesh(cuttingPlane);
        const resultCSG = gemCSG.subtract(planeCSG);

        const resultMesh = CSG.toMesh(resultCSG, gemMesh.matrix);
        this.gemstone.updateGeometry(resultMesh.geometry);
    }

    private createCuttingPlane(mastAngle: number, dopRotation: number, indexPosition: number): THREE.Mesh {
        const planeGeometry = new THREE.PlaneGeometry(5, 5);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // Calculate the normal vector for the cutting plane
        const mastRad = THREE.MathUtils.degToRad(mastAngle);
        const dopRad = THREE.MathUtils.degToRad(dopRotation);
        const indexRad = (indexPosition / 16) * Math.PI * 2;

        const normal = new THREE.Vector3(
            Math.sin(mastRad) * Math.cos(indexRad),
            Math.cos(mastRad),
            Math.sin(mastRad) * Math.sin(indexRad)
        );

        normal.applyAxisAngle(new THREE.Vector3(0, 1, 0), dopRad);

        // Set the plane's rotation to match the calculated normal
        plane.lookAt(normal);

        // Position the plane slightly away from the center in the direction of its normal
        plane.position.copy(normal.multiplyScalar(0.5));

        return plane;
    }
}