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
import { getUnit, WIDGET_MAP } from './src/canvas/UnitsMap';

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
const polygonFactory = new PolygonFactory();

function getMapandUnit(selected: string) {
    let unit;
    console.log(selected);
    switch (selected) {
        case 'A':
            unit = UnitSize.A;
            break;
        case 'B':
            unit = UnitSize.B;
            break;
        case 'C':
            unit = UnitSize.C;
            break;
        case 'D':
            unit = UnitSize.D;
            break;
        case 'E':
            unit = UnitSize.E;
    }

    console.log('clicked ' + selected);

    const map = WIDGET_MAP;
    const { dimensions } = getUnit(unit);
    console.log(dimensions);
    const polygon = polygonFactory
        .createRectangle(dimensions, unit)
        .transform(Matrix.rotateXZ(45))
        .translate(new Vector(500, 0, 250));

    polygonRepository.push(polygon);
    polygon.getCentre();
}

const navWallUnits =
    document.body.children[0].children[1].children[0].children[0]; // gets navBar

const navWallUnitsChild = navWallUnits.children[1];
console.log(navWallUnitsChild);
const userSelection =
    navWallUnitsChild.getElementsByClassName('nav-link')[1].innerHTML;
navWallUnitsChild.addEventListener(
    'click',
    function () {
        getMapandUnit(userSelection);
    },
    false
);

const mouseEventRouter = new MouseEventRouter(camera);

mouseEventRouter.register(document);

const worldPainter = new WorldPainter(renderingContext, [
    gridLayerPainter,
    polygonLayerPainter,
]);

const ticksPerSecond = 30;
const msPerTick = 1000 / ticksPerSecond;

document.body.appendChild(canvas);

setInterval(() => {
    renderingContext.fitToScreen();
    worldPainter.paint();
}, msPerTick);
