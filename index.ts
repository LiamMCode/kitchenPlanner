import { Camera } from 'app/canvas/Camera';
import { Dimensions } from 'app/canvas/Dimensions';
import { GridLayerPainter } from 'app/canvas/GridLayerPainter';
import { Matrix } from 'app/canvas/Matrix';
import { MouseEventRouter } from 'app/canvas/MouseEventRouter';
import { PolygonFactory, Units } from 'app/canvas/PolygonFactory';
import { PolygonLayerPainter } from 'app/canvas/PolygonLayerPainter';
import { PolygonPainter } from 'app/canvas/PolygonPainter';
import { PolygonRepository } from 'app/canvas/PolygonRepository';
import { RenderingContext } from 'app/canvas/RenderingContext';
import { Vector } from 'app/canvas/Vector';
import { WorldPainter } from 'app/canvas/WorldPainter';
import { pick } from 'app/canvas/UnitUtils';

const canvas = document.createElement('canvas');

const camera = new Camera();

const renderingContext = new RenderingContext(canvas.getContext('2d'), camera);
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);
const polygonRepository = new PolygonRepository();

const polygonLayerPainter = new PolygonLayerPainter(polygonRepository, polygonPainter);

const polygonFactory = new PolygonFactory();
const unit = Units.A; // user selection UPDATE to 
const { width, height, depth } = pick(unit);

const polygon = polygonFactory.createRectangle(new Dimensions(width, height, depth), unit)
    .transform(Matrix.rotateXZ(45))
    .translate(new Vector(500, 0, 250));

const unit2 = Units.B
const polygon2 = polygonFactory.createRectangle(new Dimensions(pick(unit2).width, pick(unit2).height, pick(unit2).depth), unit2)
    .transform(Matrix.rotateXZ(45))
    .translate(new Vector(1000, 0, 250));

const unit3 = Units.C
const polygon3 = polygonFactory.createRectangle(new Dimensions(pick(unit3).width, pick(unit3).height, pick(unit3).depth), unit3)
    .transform(Matrix.rotateXZ(45))
    .translate(new Vector(1500, 150, 250));

const unit4 = Units.D
const polygon4 = polygonFactory.createRectangle(new Dimensions(pick(unit4).width, pick(unit4).height, pick(unit4).depth), unit4)
    .transform(Matrix.rotateXZ(45))
    .translate(new Vector(1700, 150, 250));

polygonRepository.push(polygon);
polygon.getCentre();
polygonRepository.push(polygon2);
polygon2.getCentre();
polygonRepository.push(polygon3);
polygonRepository.push(polygon4);

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
