import * as THREE from 'three';
import { GemstoneModel } from './GemstoneModel';
import { CuttingSimulation } from './CuttingSimulation';

export class FacetingMachine {
    private machine: THREE.Group;
    private base: THREE.Group;
    private mast: THREE.Group;
    private heightAdjustGroup: THREE.Group;

    private lap: THREE.Mesh;
    private drainPan: THREE.Mesh;
    private waterTank: THREE.Group;
    private protractor: THREE.Group;
    private dop: THREE.Group;
    private indexGear: THREE.Group;

    private gemstone: GemstoneModel;
    private cuttingSimulation: CuttingSimulation;

    private protractorAngle: number = 99;
    private indexPosition: number = 3;
    private mastAdjust: number = 1;
    private heightAdjustValue: number = 1;
    private lapSpeed: number = 1;
    private lapSize: number = 2;
    private dopLength: number = 2;
    private waterDripSpeed: number = 1;

    constructor(gemstone: GemstoneModel) {
        this.machine = new THREE.Group();
        this.gemstone = gemstone;
        this.cuttingSimulation = new CuttingSimulation(this.gemstone);
        this.createMachine();
    }

    private createMachine(): void {
        this.createBase();
        this.createLap();
        this.createDrainPan();
        this.createWaterTank();
        this.createMast();
        this.createHeightAdjustGroup();
        this.updateMachinePosition();
    }

    private createBase(): void {
        this.base = new THREE.Group();

        const baseGeometry = new THREE.BoxGeometry(10, 0.5, 6);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
        baseMesh.position.y = -0.25;

        this.base.add(baseMesh);
        this.machine.add(this.base);
    }

    private createLap(): void {
        const lapGeometry = new THREE.CylinderGeometry(this.lapSize, this.lapSize, 0.1, 64);
        const lapMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        this.lap = new THREE.Mesh(lapGeometry, lapMaterial);
        this.lap.position.set(-2.5, 0.3, 0);
        this.lap.rotation.y = Math.PI / 2;
        this.base.add(this.lap);

        const spindleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 16);
        const spindleMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
        const spindle = new THREE.Mesh(spindleGeometry, spindleMaterial);
        spindle.position.y = 0.15;
        this.lap.add(spindle);
    }

    private createDrainPan(): void {
        const panGeometry = new THREE.TorusGeometry(2.2, 0.2, 16, 100);
        const panMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
        this.drainPan = new THREE.Mesh(panGeometry, panMaterial);
        this.drainPan.rotation.x = Math.PI / 2;
        this.drainPan.position.set(-2.5, 0.2, 0);
        this.base.add(this.drainPan);

        const bottomGeometry = new THREE.CircleGeometry(2.2, 32);
        const bottomMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, side: THREE.DoubleSide });
        const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
        bottom.rotation.z = -Math.PI / 2;
        bottom.position.y = -0.1;
        this.drainPan.add(bottom);
    }

    private createWaterTank(): void {
        this.waterTank = new THREE.Group();
        const tankGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
        const tankMaterial = new THREE.MeshStandardMaterial({
            color: 0xADD8E6,
            transparent: true,
            opacity: 0.7
        });
        const tank = new THREE.Mesh(tankGeometry, tankMaterial);
        tank.position.y = 0.75;
        this.waterTank.add(tank);

        const spoutGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);
        const spoutMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
        const spout = new THREE.Mesh(spoutGeometry, spoutMaterial);
        spout.rotation.x = Math.PI;
        spout.position.set(0.3, -0.15, 0.1);
        this.waterTank.add(spout);

        this.waterTank.position.set(-4.5, 1.5, 0);
        this.base.add(this.waterTank);
    }

    private createMast(): void {
        this.mast = new THREE.Group();
        const mastGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 16);
        const mastMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
        const mastMesh = new THREE.Mesh(mastGeometry, mastMaterial);
        mastMesh.position.y = 2;
        this.mast.add(mastMesh);

        const baseGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
        const mastBase = new THREE.Mesh(baseGeometry, baseMaterial);
        mastBase.position.y = 0.25;
        this.mast.add(mastBase);

        this.mast.position.set(2.5, 0, 0);
        this.mast.rotation.y = Math.PI;
        this.base.add(this.mast);
    }

    private createHeightAdjustGroup(): void {
        this.heightAdjustGroup = new THREE.Group();
        this.mast.add(this.heightAdjustGroup);

        this.indexGear = new THREE.Group();
        this.protractor = new THREE.Group();
        this.dop = new THREE.Group();


        this.createProtractor();
        this.createDop();
        this.createIndexGear();
        this.createHeightAdjust();
        // this.createGemMaterial(); // Placeholder for the gem

        this.heightAdjustGroup.position.z = -0.3
        this.heightAdjustGroup.position.x = 0.4
        // this.heightAdjustGroup.rotation.y = Math.PI / 2
    }

    private createProtractor(): void {
        const arcGeometry = new THREE.TorusGeometry(1, 0.05, 16, 100, Math.PI / 2);
        const arcMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 });
        const arc = new THREE.Mesh(arcGeometry, arcMaterial);

        arc.rotation.z = Math.PI / 2

        this.protractor.add(arc);

        // Add degree markings
        for (let i = 0; i <= 18; i++) {
            const angle = (i * 10 * Math.PI) / 360;
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(Math.cos(angle) * 0.90, Math.sin(angle) * 0.90, 0),
                new THREE.Vector3(Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0)
            ]);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            line.rotation.z = Math.PI / 2
            line.position.z = -0.06
            this.protractor.add(line);
        }

        // this.protractor.rotation.z = Math.PI / 2;
        this.heightAdjustGroup.add(this.protractor);
    }

    private createDop(): void {
        const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, this.dopLength, 16);
        const armMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
        const arm = new THREE.Mesh(armGeometry, armMaterial);
        arm.rotation.z = Math.PI / 2;
        arm.position.x = this.dopLength / 2;
        this.dop.add(arm);

        const holderGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const holderMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
        const holder = new THREE.Mesh(holderGeometry, holderMaterial);
        holder.position.x = this.dopLength;
        this.dop.add(holder);

        // Add the gemstone to the dop
        const gemstoneMesh = this.gemstone.getMesh();
        gemstoneMesh.position.set(this.dopLength, 0, 0);
        this.dop.add(gemstoneMesh);

        this.indexGear.add(this.dop);
    }


    private createIndexGear(): void {

        const gearGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
        const gearMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
        const gear = new THREE.Mesh(gearGeometry, gearMaterial);
        gear.rotation.z = Math.PI / 2;

        this.indexGear.add(gear);

        // Add teeth
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            const toothGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.05);
            const tooth = new THREE.Mesh(toothGeometry, gearMaterial);
            tooth.position.set( 0, Math.sin(angle) * 0.35, Math.cos(angle) * 0.35);
            tooth.rotation.y = angle;
            this.indexGear.add(tooth);
        }


        this.protractor.add(this.indexGear)
    }

    private createHeightAdjust(): void {
        const geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0x4169E1 });
        const heightAdjust = new THREE.Mesh(geometry, material);
        heightAdjust.position.set(0, 4, 0);
        this.mast.add(heightAdjust);
    }

    public performCut(): void {
        this.cuttingSimulation.performCut(
            this.protractorAngle,
            this.indexPosition,
            this.mastAdjust
        );
    }

    public getMesh(): THREE.Group {
        return this.machine;
    }

    public setMastAdjust(adjust: number): void {
        this.mastAdjust = adjust;
        this.updateMachinePosition();
    }

    public setHeightAdjust(height: number): void {
        this.heightAdjustValue = height;
        this.updateMachinePosition();
    }

    public setLapSpeed(speed: number): void {
        this.lapSpeed = speed;
    }

    public setLapSize(size: number): void {
        this.lapSize = size;
        this.updateLapSize();
    }

    public setDopLength(length: number): void {
        this.dopLength = length;
        this.updateDopLength();
    }

    public setWaterDripSpeed(speed: number): void {
        this.waterDripSpeed = speed;
    }

    public setProtractorAngle(angle: number): void {
        this.protractorAngle = angle;
        this.updateMachinePosition();
    }

    public setIndexPosition(position: number): void {
        this.indexPosition = position;
        this.updateMachinePosition();
    }

    private updateMachinePosition(): void {
        // Update mast adjustment (horizontal rotation of the entire mast)
        this.mast.position.x = this.mastAdjust

        // Update height adjust group position
        this.heightAdjustGroup.position.y = this.heightAdjustValue;

        // Update protractor angle
        this.protractor.rotation.z = Math.PI / 2 - THREE.MathUtils.degToRad(this.protractorAngle);

        // Update dop angle to match protractor
        // this.dop.rotation.z = -THREE.MathUtils.degToRad(this.protractorAngle);

        // Update index gear rotation (which determines the dop's rotation around its axis)
        const indexAngle = (this.indexPosition / 16) * Math.PI * 2;
        this.indexGear.rotation.x = indexAngle;

        // Rotate the dop around its own axis based on the index position
        // We need to apply this rotation in the dop's local space
        this.dop.rotation.x = indexAngle;

    }

    private updateLapSize(): void {
        const newLapGeometry = new THREE.CylinderGeometry(this.lapSize, this.lapSize, 0.1, 64);
        this.lap.geometry.dispose();
        this.lap.geometry = newLapGeometry;
    }

    private updateDopLength(): void {
        const arm = this.dop.children[0] as THREE.Mesh;
        const holder = this.dop.children[1];
        const newArmGeometry = new THREE.CylinderGeometry(0.05, 0.05, this.dopLength, 16);
        arm.geometry.dispose();
        arm.geometry = newArmGeometry;
        arm.position.x = this.dopLength / 2;
        holder.position.x = this.dopLength;

        const gemstoneMesh = this.gemstone.getMesh();
        gemstoneMesh.position.set(this.dopLength, 0, 0);
    }

    public update(delta: number): void {
        // Rotate lap based on speed
        this.lap.rotation.z += this.lapSpeed * delta;

        // Here you would update water drip particles if implemented
    }
}