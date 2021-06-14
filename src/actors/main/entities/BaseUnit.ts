import { ComponentId } from '~/actors/main/Components';
import { createWidget } from '~/actors/main/entities/Widget';
import { Dimensions } from '~/engine/maths/Dimensions';
import { Point3 } from '~/engine/maths/Point3';
import { World } from '~/actors/main/World';

export function createBaseUnitWidget(world: World, position: Point3, dimensions: Dimensions): number {
    return createWidget(world, position, dimensions)
        .with(ComponentId.BaseUnit, undefined)
        .finish();
}
