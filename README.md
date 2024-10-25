# Faceting Simulator

This project is a 3D faceting machine simulator built with Three.js and TypeScript. It allows users to interact with a virtual faceting machine, adjust various parameters, and simulate the gem cutting process.

## Project Structure

```
faceting-simulator/
├── src/
│   ├── index.ts
│   ├── FacetingMachine.ts
│   ├── GemstoneModel.ts
│   ├── CuttingSimulation.ts
│   └── UI.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
```

### File Descriptions

- `src/index.ts`: The main entry point of the application. It sets up the Three.js scene, camera, and renderer, and initializes the faceting machine, gemstone model, cutting simulation, and UI.

- `src/FacetingMachine.ts`: Contains the `FacetingMachine` class, which models the 3D representation of the faceting machine. It handles the creation and manipulation of all machine parts (base, mast, protractor, dop, index gear, etc.).

- `src/GemstoneModel.ts`: Defines the `GemstoneModel` class, which represents the gemstone being cut. It handles the creation and modification of the gem's 3D model.

- `src/CuttingSimulation.ts`: Implements the `CuttingSimulation` class, which performs the actual cutting operations on the gemstone model based on the faceting machine's current settings.

- `src/UI.ts`: Manages the user interface using dat.GUI. It creates controls for adjusting the faceting machine parameters and initiating cuts.

- `public/index.html`: The HTML file that serves as the entry point for the web application.

- `package.json`: Defines the project dependencies and scripts.

- `tsconfig.json`: TypeScript configuration file.

- `vite.config.ts`: Configuration file for Vite, our build tool and development server.

## Setup and Installation

1. Ensure you have Node.js installed on your system.

2. Clone this repository:
   ```
   git clone <repository-url>
   cd faceting-simulator
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Project

To start the development server:

```
npm run dev
```

This will start a local development server, typically at `http://localhost:5173`. Open this URL in your web browser to view and interact with the faceting simulator.

## Building for Production

To create a production build:

```
npm run build
```

This will generate optimized files in the `dist/` directory.

## Usage

Once the application is running:

1. Use the controls on the right side of the screen to adjust various parameters of the faceting machine:
    - Protractor Angle: Adjusts the cutting angle
    - Index Position: Rotates the gemstone
    - Mast Adjust: Changes the horizontal position of the mast
    - Height Adjust: Raises or lowers the cutting assembly
    - Lap Speed and Size: Controls the rotation and size of the cutting lap
    - Dop Length: Adjusts the length of the dop arm

2. The 3D view will update in real-time as you adjust these parameters.

3. Use the "Perform Cut" button to simulate a cut on the gemstone based on the current machine settings.

4. You can rotate, pan, and zoom the 3D view using your mouse or touchpad.

## Contributing

Contributions to improve the simulator are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## License

[Specify your license here]