import { Camera } from 'app/canvas/Camera';
import { Dimensions } from 'app/canvas/Dimensions';
import { GridLayerPainter } from 'app/canvas/GridLayerPainter';
import { Matrix } from 'app/canvas/Matrix';
import { MouseEventRouter } from 'app/canvas/MouseEventRouter';
import { PolygonFactory } from 'app/canvas/PolygonFactory';
import { PolygonLayerPainter } from 'app/canvas/PolygonLayerPainter';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { RenderingContext } from 'app/canvas/RenderingContext';
import { Vector } from 'app/canvas/Vector';
import { WorldPainter } from 'app/canvas/WorldPainter';

const canvas = document.createElement('canvas');

const camera = new Camera();

const renderingContext = new RenderingContext(canvas.getContext('2d'), camera);
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);
const polygonRepository = new PolygonRepository();

const polygonLayerPainter = new PolygonLayerPainter(polygonRepository, polygonPainter);

const polygonFactory = new PolygonFactory();
const polygon = polygonFactory.createRectangle(new Dimensions(200, 100, 100))
    .transform(Matrix.rotateXZ(45))
    .translate(new Vector(500, 0, 250));

polygonRepository.push(polygon);

const mouseEventRouter = new MouseEventRouter(camera);

mouseEventRouter.register(document);

const worldPainter = new WorldPainter(renderingContext, [
    gridLayerPainter,
    polygonLayerPainter,
]);

const ticksPerSecond = 60;
const msPerTick = 1000 / ticksPerSecond;

document.body.appendChild(canvas);

setInterval(() => {
    renderingContext.fitToScreen();
    worldPainter.paint();
}, msPerTick);
