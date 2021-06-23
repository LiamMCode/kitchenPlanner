export default class Dimensions {
    constructor(
        private width: number,
        private height: number,
        private depth: number
    ) {}

    public getWidth(unitDimensions: Dimensions): number {
        this.width = unitDimensions.width;
        return this.width;
    }

    public getHeight(unitDimensions: Dimensions): number {
        this.height = unitDimensions.height;
        return this.height;
    }

    public getDepth(unitDimensions: Dimensions): number {
        this.depth = unitDimensions.depth;
        return this.depth;
    }
}
