export interface Dimensions {
    width : number;
    height: number;
    depth : number;
}

export namespace Dimensions {
    export const make = (width: number, height: number, depth: number): Dimensions => ({ width, height, depth });

    export function half(dimensions: Readonly<Dimensions>): Dimensions {
        return scaleAssign({ ...dimensions }, 0.5, 0.5, 0.5);
    }

    export function halfAssign(dimensions: Dimensions): Dimensions {
        return scaleAssign(dimensions, 0.5, 0.5, 0.5);
    }

    export function double(dimensions: Readonly<Dimensions>): Dimensions {
        return scaleAssign({ ...dimensions }, 2, 2, 2);
    }

    export function doubleAssign(dimensions: Dimensions): Dimensions {
        return scaleAssign(dimensions, 2, 2, 2);
    }

    export function scale(dimensions: Readonly<Dimensions>, width: number, height: number, depth: number): Dimensions {
        return scaleAssign({ ...dimensions }, width, height, depth);
    }

    export function scaleAssign(dimensions: Dimensions, width: number, height: number, depth: number): Dimensions {
        dimensions.width  *= width;
        dimensions.height *= height;
        dimensions.depth  *= depth;

        return dimensions;
    }
}
