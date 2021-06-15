import { pick } from "./UnitUtils";
import { Units } from 'app/canvas/PolygonFactory';

export class Dimensions {
    constructor(private width: number, private height: number, private depth: number) {}

    public getWidth(unitType: Units): number {
        this.width = pick(unitType).width;
        return this.width;
    }

    public getHeight(unitType: Units): number {
        this.height = pick(unitType).height;
        return this.height;
    }

    public getDepth(unitType: Units): number {
        this.depth = pick(unitType).depth;
        return this.depth;
    }
}
