import * as THREE from 'three';

export class GemstoneModel {
    private mesh: THREE.Mesh;

    constructor() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            shininess: 100,
            specular: 0xffffff
        });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public updateGeometry(newGeometry: THREE.BufferGeometry): void {
        this.mesh.geometry.dispose(); // Clean up the old geometry
        this.mesh.geometry = newGeometry;
    }
}