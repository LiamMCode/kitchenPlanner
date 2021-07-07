export class Dimensions {
    constructor(private height: number, private width: number, private depth: number) {}

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
