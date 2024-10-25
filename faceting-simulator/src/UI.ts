import * as dat from 'dat.gui';
import * as THREE from 'three';
import { FacetingMachine } from './FacetingMachine';
import { GemstoneModel, GemstoneShape } from './GemstoneModel';

export class UI {
    private gui: dat.GUI;
    private facetingMachine: FacetingMachine;
    private gemstone: GemstoneModel;

    constructor(facetingMachine: FacetingMachine, gemstone: GemstoneModel) {
        this.facetingMachine = facetingMachine;
        this.gemstone = gemstone;
        this.gui = new dat.GUI();

        this.setupControls();
    }

    private setupControls(): void {
        const machineFolder = this.gui.addFolder('Faceting Machine');
        const gemstoneFolder = this.gui.addFolder('Gemstone');
        const cutFolder = this.gui.addFolder('Cutting');

        const controls = {
            protractorAngle: 99,
            mastAdjust: 1,
            heightAdjust: 1,
            lapSpeed: 1,
            lapSize: 2,
            dopLength: 3,
            waterDripSpeed: 1,
            indexPosition: 3,
            gemstoneShape: GemstoneShape.Sphere,
            gemstoneSize: 1,
            gemstoneColor: '#00ff00',
            performCut: () => {
                this.facetingMachine.performCut();
            }
        };

        machineFolder.add(controls, 'protractorAngle', 0, 120).onChange((value: number) => {
            this.facetingMachine.setProtractorAngle(value);
        });

        machineFolder.add(controls, 'mastAdjust', 1, 3).onChange((value: number) => {
            this.facetingMachine.setMastAdjust(value);
        });

        machineFolder.add(controls, 'heightAdjust', 1, 3).onChange((value: number) => {
            this.facetingMachine.setHeightAdjust(value);
        });

        machineFolder.add(controls, 'lapSpeed', 0, 5).onChange((value: number) => {
            this.facetingMachine.setLapSpeed(value);
        });

        machineFolder.add(controls, 'lapSize', 1, 3).onChange((value: number) => {
            this.facetingMachine.setLapSize(value);
        });

        machineFolder.add(controls, 'dopLength', 2, 4).onChange((value: number) => {
            this.facetingMachine.setDopLength(value);
        });

        machineFolder.add(controls, 'waterDripSpeed', 0, 5).onChange((value: number) => {
            this.facetingMachine.setWaterDripSpeed(value);
        });

        machineFolder.add(controls, 'indexPosition', 0, 15).onChange((value: number) => {
            this.facetingMachine.setIndexPosition(value);
        });

        gemstoneFolder.add(controls, 'gemstoneShape', {
            Sphere: GemstoneShape.Sphere,
            Cube: GemstoneShape.Cube,
            Octahedron: GemstoneShape.Octahedron,
            Dodecahedron: GemstoneShape.Dodecahedron
        }).onChange((value: GemstoneShape) => {
            this.gemstone.setShape(value);
        });

        gemstoneFolder.add(controls, 'gemstoneSize', 0.5, 2).onChange((value: number) => {
            this.gemstone.setSize(value);
        });

        gemstoneFolder.addColor(controls, 'gemstoneColor').onChange((value: string) => {
            this.gemstone.setColor(new THREE.Color(value));
        });

        cutFolder.add(controls, 'performCut');

        machineFolder.open();
        gemstoneFolder.open();
        cutFolder.open();
    }
}