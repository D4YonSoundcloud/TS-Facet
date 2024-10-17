import * as dat from 'dat.gui';
import { FacetingMachine } from './FacetingMachine';
import { CuttingSimulation } from './CuttingSimulation';

export class UI {
    private gui: dat.GUI;
    private facetingMachine: FacetingMachine;
    private cuttingSimulation: CuttingSimulation;

    constructor(facetingMachine: FacetingMachine, cuttingSimulation: CuttingSimulation) {
        this.facetingMachine = facetingMachine;
        this.cuttingSimulation = cuttingSimulation;
        this.gui = new dat.GUI();

        this.setupControls();
    }

    private setupControls(): void {
        const controls = {
            mastAngle: 45,
            dopRotation: 0,
            performCut: () => {
                this.cuttingSimulation.performCut(controls.mastAngle, controls.dopRotation);
            }
        };

        this.gui.add(controls, 'mastAngle', 0, 90).onChange((value: number) => {
            this.facetingMachine.setMastAngle(value);
        });

        this.gui.add(controls, 'dopRotation', 0, 360).onChange((value: number) => {
            this.facetingMachine.setDopRotation(value);
        });

        this.gui.add(controls, 'performCut');
    }
}