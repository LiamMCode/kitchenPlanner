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

export const canvas = document.createElement('canvas');
const camera = new Camera();

const renderingContext = new RenderingContext(canvas.getContext('2d'), camera);
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);
const polygonRepository = new PolygonRepository();

const polygonLayerPainter = new PolygonLayerPainter(polygonRepository, polygonPainter);

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

const navNewPlan = document.getElementById('NewPlan');
const navLoadPlan = document.getElementById('LoadPlan');
const navSavePlan = document.getElementById('SavePlan');

export function getMapandUnit(selectedUnitSize: UnitSize): void {
    polygonLayerPainter.setUnit(selectedUnitSize);

    const { dimensions, fillColour, borderColour } = getUnit(selectedUnitSize);
    const polygon = polygonFactory
        .createRectangle(dimensions, selectedUnitSize)
        .transform(Matrix.rotateXZ(0))
        .translate(new Vector(1500, 0, 250));

    polygonRepository.push(polygon, fillColour, borderColour, selectedUnitSize);
    polygon.getCentre();
}

function drawSelected(element: HTMLElement): void {
    getMapandUnit(element.id as UnitSize);
}

navWallUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navWallUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navBaseUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navBaseUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navTowerUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navTowerUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navDecorUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navDecorUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navDecorUnitsC.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navDecorUnitsD.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navDecorUnitsE.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);
navDecorUnitsF.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navWorktopUnitsA.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navWorktopUnitsB.addEventListener(
    'click',
    function () {
        drawSelected(this);
    },
    false,
);

navNewPlan.addEventListener(
    'click',
    () => {
        // implement functionality in PGDT-452
    },
    false,
);

navSavePlan.addEventListener(
    'click',
    () => {
        // implement functionality in PGDT-454
    },
    false,
);

navLoadPlan.addEventListener(
    'click',
    () => {
        // implement functionality in PGDT-456
    },
    false,
);

const mouseEventRouter = new MouseEventRouter(camera, polygonRepository);
mouseEventRouter.register(document);

const worldPainter = new WorldPainter(renderingContext, [gridLayerPainter, polygonLayerPainter]);

const ticksPerSecond = 10;
const msPerTick = 1000 / ticksPerSecond;

document.body.appendChild(canvas);

setInterval(() => {
    renderingContext.fitToScreen();
    worldPainter.paint();
}, msPerTick);
