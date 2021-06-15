export class Dimensions {
    constructor(private width: number, private height: number, private depth: number) {}

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getDepth(): number {
        return this.depth;
    }
}
