import { Dimensions } from '~/engine/maths/Dimensions';
import { Matrix } from '~/engine/maths/Matrix';
import { Point2 } from '~/engine/maths/Point2';
import { Point3 } from "~/engine/maths/Point3";

// ==============================================
// Component Ids
// ==============================================

export const enum ComponentId {
    Position,
    Rotation,
    Dimensions,
    Unit,
    BaseUnit,
    Polygon,
    ModelMatrix,
}

// ==============================================
// Component Data
// ==============================================

interface Rotation {
    rotation: number;
}

// ==============================================
// Component Lookup
// ==============================================

export type ComponentLookUp<Id extends ComponentId>
    = Id extends ComponentId.Position    ? Point3
    : Id extends ComponentId.Rotation    ? Rotation
    : Id extends ComponentId.Dimensions  ? Dimensions
    : Id extends ComponentId.Unit        ? undefined
    : Id extends ComponentId.BaseUnit    ? undefined
    : Id extends ComponentId.Polygon     ? Point2[]
    : Id extends ComponentId.ModelMatrix ? Matrix
    : never;
