import * as THREE from 'three';

export enum GemstoneShape {
    Sphere,
    Cube,
    Octahedron,
    Dodecahedron
}

export class GemstoneModel {
    private mesh: THREE.Mesh;
    private shape: GemstoneShape;
    private size: number;
    private color: THREE.Color;

    constructor() {
        this.shape = GemstoneShape.Sphere;
        this.size = 1;
        this.color = new THREE.Color(0x00ff00);
        this.createMesh();
    }

    private createMesh(): void {
        const geometry = this.createGeometry();
        const material = this.createMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }

    private createGeometry(): THREE.BufferGeometry {
        switch (this.shape) {
            case GemstoneShape.Sphere:
                return new THREE.SphereGeometry(this.size, 32, 32);
            case GemstoneShape.Cube:
                return new THREE.BoxGeometry(this.size, this.size, this.size);
            case GemstoneShape.Octahedron:
                return new THREE.OctahedronGeometry(this.size);
            case GemstoneShape.Dodecahedron:
                return new THREE.DodecahedronGeometry(this.size);
            default:
                return new THREE.SphereGeometry(this.size, 32, 32);
        }
    }

    private createMaterial(): THREE.Material {
        return new THREE.MeshPhongMaterial({
            color: this.color,
            shininess: 100,
            specular: 0xffffff
        });
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public setShape(shape: GemstoneShape): void {
        this.shape = shape;
        this.updateGeometry();
    }

    public setSize(size: number): void {
        this.size = size;
        this.updateGeometry();
    }

    public setColor(color: THREE.Color): void {
        this.color = color;
        (this.mesh.material as THREE.MeshPhongMaterial).color = this.color;
    }

    public updateGeometry(newGeometry?: THREE.BufferGeometry): void {
        if (newGeometry) {
            this.mesh.geometry.dispose();
            this.mesh.geometry = newGeometry;
        } else {
            const geometry = this.createGeometry();
            this.mesh.geometry.dispose();
            this.mesh.geometry = geometry;
        }
    }
}