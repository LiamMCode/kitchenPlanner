import { Camera } from './src/canvas/Camera';
import { GridLayerPainter } from './src/canvas/GridLayerPainter';
import { MouseEventRouter } from './src/canvas/MouseEventRouter';
import { PolygonLayerPainter } from './src/canvas/PolygonLayerPainter';
import { PolygonPainter } from './src/canvas/PolygonPainter';
import { WidgetRepository } from './src/canvas/WidgetRepository';
import { RenderingContext } from './src/canvas/RenderingContext';
import { WorldPainter } from './src/canvas/WorldPainter';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './src/canvas/App';
import { unitsRepositoryService } from './axios/UnitsRepositoryService';

window.addEventListener('load', async () => {
    await unitsRepositoryService.loadData();
});

ReactDOM.render(<App />, document.getElementById('root'));

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const camera = new Camera();

const renderingContext = new RenderingContext(
    canvas.getContext('2d') as CanvasRenderingContext2D,
    camera,
);
const gridLayerPainter = new GridLayerPainter(renderingContext);
const polygonPainter = new PolygonPainter(renderingContext);
export const widgetRepository = new WidgetRepository();

export const polygonLayerPainter = new PolygonLayerPainter(widgetRepository, polygonPainter);

export const mouseEventRouter = new MouseEventRouter(camera, widgetRepository);
mouseEventRouter.register(document);

const worldPainter = new WorldPainter(renderingContext, [gridLayerPainter, polygonLayerPainter]);

function renderLoop() {
    renderingContext.fitToScreen();
    worldPainter.paint();
    requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
