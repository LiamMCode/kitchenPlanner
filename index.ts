import { Camera } from './src/canvas/Camera';
import { GridLayerPainter } from './src/canvas/GridLayerPainter';
import { Matrix } from './src/canvas/Matrix';
import { MouseEventRouter } from './src/canvas/MouseEventRouter';
import { PolygonFactory, UnitSize } from './src/canvas/PolygonFactory';
import { PolygonLayerPainter } from './src/canvas/PolygonLayerPainter';
import { PolygonPainter } from './src/canvas/PolygonPainter';
import { PolygonRepository } from './src/canvas/PolygonRepository';
import { RenderingContext } from './src/canvas/RenderingContext';
import { Vector } from './src/canvas/Vector';
import { WorldPainter } from './src/canvas/WorldPainter';
import { getUnit } from './src/canvas/UnitsMap';

const canvas = document.createElement('canvas');

const camera = new Camera();

const renderingContext = new RenderingContext(canvas.getContext('2d'), camera);
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);
const polygonRepository = new PolygonRepository();

const polygonLayerPainter = new PolygonLayerPainter(
    polygonRepository,
    polygonPainter
);
// const wallUnitPainter = new PolygonLayerPainter(
//     polygonRepository,
//     polygonPainter
// );

const polygonFactory = new PolygonFactory();

const navWallUnitsA = document.getElementById('WallSizeA');
const navWallUnitsB = document.getElementById('WallSizeB');

const navBaseUnitsA = document.getElementById('BaseSizeA');
const navBaseUnitsB = document.getElementById('BaseSizeB');

const navTowerUnitsA = document.getElementById('TowerSizeA');
const navTowerUnitsB = document.getElementById('TowerSizeB');

const navDecorUnitsA = document.getElementById('DecorSizeA');
const navDecorUnitsB = document.getElementById('DecorSizeB');
const navDecorUnitsC = document.getElementById('DecorSizeC');
const navDecorUnitsD = document.getElementById('DecorSizeD');
const navDecorUnitsE = document.getElementById('DecorSizeE');
const navDecorUnitsF = document.getElementById('DecorSizeF');

const navWorktopUnitsA = document.getElementById('WorktopSizeA');
const navWorktopUnitsB = document.getElementById('WorktopSizeB');

function drawSelected(element: HTMLElement): void {
    getMapandUnit(element.id as UnitSize);
}

navWallUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navWallUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navBaseUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navBaseUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navTowerUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navTowerUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navDecorUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navDecorUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navDecorUnitsC.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navDecorUnitsD.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navDecorUnitsE.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);
navDecorUnitsF.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navWorktopUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

navWorktopUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false
);

export function getMapandUnit(selectedUnitSize: UnitSize): void {
    polygonLayerPainter.setUnit(selectedUnitSize);
    console.log('clicked ' + selectedUnitSize);

    const { dimensions } = getUnit(selectedUnitSize);
    const polygon = polygonFactory
        .createRectangle(dimensions, selectedUnitSize)
        .transform(Matrix.rotateXZ(45))
        .translate(new Vector(1500, 0, 250));

    polygonRepository.push(polygon);
    polygon.getCentre();
}

const mouseEventRouter = new MouseEventRouter(camera);

mouseEventRouter.register(document);

const worldPainter = new WorldPainter(renderingContext, [
    gridLayerPainter,
    polygonLayerPainter,
    // wallUnitPainter,
]);

const ticksPerSecond = 30;
const msPerTick = 1000 / ticksPerSecond;

document.body.appendChild(canvas);

setInterval(() => {
    renderingContext.fitToScreen();
    worldPainter.paint();
}, msPerTick);
