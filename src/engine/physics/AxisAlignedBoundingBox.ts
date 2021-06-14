import { Point2 } from '~/engine/maths/Point2';
import { Point3 } from '~/engine/maths/Point3';

export interface AxisAlignedBoundingBox {
    centrePoint: Point3;
    halfWidth  : number;
    halfHeight : number;
    halfDepth  : number;
}

export namespace AxisAlignedBoundingBox {
    /**
     * Checks to see if two bounding boxes are intersecting one another.
     * @param box The other bounding box.
     */
    export function intersectsBoundingBox(
        lhs: Readonly<AxisAlignedBoundingBox>,
        rhs: Readonly<AxisAlignedBoundingBox>,
    ): boolean {
        // TODO:
        // Implement me.
        return false;
    }

    /**
     * Checks to see if this bounding box contains a 2D point in the XZ plane.
     * @param point The 2D point to check.
     */
    export function containsPointInXZ(
        box  : Readonly<AxisAlignedBoundingBox>,
        point: Readonly<Point2>,
    ): boolean {
        // TODO:
        // Implement me.
        return false;
    }

    /**
     * Checks to see if this bounding box contains the passed 3D point.
     * @param point The 3D point to check.
     */
    export function containsPoint(
        box  : Readonly<AxisAlignedBoundingBox>,
        point: Readonly<Point3>,
    ): boolean {
        // TODO:
        // Implement me.
        return false;
    }
}
