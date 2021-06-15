import { LayerPainter } from 'app/canvas/LayerPainter';
import { RenderingContext } from 'app/canvas/RenderingContext';

export class WorldPainter {
    constructor(private context: RenderingContext, private layerPainters: LayerPainter[]) {}

    public paint(): void {
        this.context.clear();

        for (const painter of this.layerPainters) {
            painter.paint();
        }
    }
}
