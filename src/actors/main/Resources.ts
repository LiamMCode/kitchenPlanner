import { Matrix } from '~/engine/maths/Matrix';
import { Point2 } from "~/engine/maths/Point2";
import { Vector3 } from '~/engine/maths/Vector3';

// ==============================================
// Resource Ids
// ==============================================

export const enum ResourceId {
    MousePosition,
    MouseDown,
    CameraPosition,
    CameraZoom,
    CameraVectors,
    ViewMatrix,
    ScaleMatrix,
}

// ==============================================
// Resource Data
// ==============================================

interface MouseDown {
    down: boolean;
}

interface CameraZoom {
    level: number;
}

interface CameraVectors {
    right  : Vector3;
    up     : Vector3;
    forward: Vector3;
}

// ==============================================
// Resource Lookup
// ==============================================

export type ResourceLookUp<Id extends ResourceId>
    = Id extends ResourceId.MousePosition  ? Point2
    : Id extends ResourceId.MouseDown      ? MouseDown
    : Id extends ResourceId.CameraPosition ? Point2
    : Id extends ResourceId.CameraZoom     ? CameraZoom
    : Id extends ResourceId.CameraVectors  ? CameraVectors
    : Id extends ResourceId.ViewMatrix     ? Matrix
    : Id extends ResourceId.ScaleMatrix    ? Matrix
    : never;
