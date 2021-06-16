import { pick } from "./UnitUtils";
import { UnitSize } from 'app/canvas/PolygonFactory';

export class Dimensions {
    constructor(private width: number, private height: number, private depth: number) {}

    public getWidth(unitDimensions: UnitSize): number {
        this.width = pick(unitDimensions).width;
        return this.width;
    }

    public getHeight(unitDimensions: UnitSize): number {
        this.height = pick(unitDimensions).height;
        return this.height;
    }

    public getDepth(unitDimensions: UnitSize): number {
        this.depth = pick(unitDimensions).depth;
        return this.depth;
    }
}
