import * as THREE from 'three';

export class FacetingMachine {
    private mesh: THREE.Group;
    private mastAngle: number = 45;
    private dopRotation: number = 0;

    constructor() {
        this.mesh = new THREE.Group();
        this.createMachine();
    }

    private createMachine(): void {
        // Create lap (cutting surface)
        const lapGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 32);
        const lapMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
        const lap = new THREE.Mesh(lapGeometry, lapMaterial);
        this.mesh.add(lap);

        // Create mast (angle adjustment)
        const mastGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 16);
        const mastMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
        const mast = new THREE.Mesh(mastGeometry, mastMaterial);
        mast.position.set(0, 1.5, 0);
        this.mesh.add(mast);

        // Create dop (stone holder) - simplified as a small sphere
        const dopGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const dopMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        const dop = new THREE.Mesh(dopGeometry, dopMaterial);
        dop.position.set(0, 3, 0);
        this.mesh.add(dop);
    }

    public getMesh(): THREE.Group {
        return this.mesh;
    }

    public setMastAngle(angle: number): void {
        this.mastAngle = angle;
        this.updateMachinePosition();
    }

    public setDopRotation(rotation: number): void {
        this.dopRotation = rotation;
        this.updateMachinePosition();
    }

    private updateMachinePosition(): void {
        // Update the position and rotation of machine parts based on mastAngle and dopRotation
        // This is a simplified version and would need to be expanded for a real simulation
        this.mesh.rotation.x = THREE.MathUtils.degToRad(this.mastAngle);
        this.mesh.rotation.y = THREE.MathUtils.degToRad(this.dopRotation);
    }
}