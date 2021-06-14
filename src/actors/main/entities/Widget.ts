import { ComponentId } from '~/actors/main/Components';
import { createBasicEntity } from '~/actors/main/entities/BasicEntity';
import { Dimensions } from '~/engine/maths/Dimensions';
import { EntityBuilder, World } from '~/actors/main/World';
import { Point2 } from '~/engine/maths/Point2';
import { Point3 } from '~/engine/maths/Point3';

export function createWidget(world: World, position: Point3, dimensions: Dimensions): EntityBuilder {
    const {
        width,
        depth,
    } = Dimensions.half(dimensions);

    const polygon = [
        Point2.make(-width, -depth),
        Point2.make(+width, -depth),
        Point2.make(+width, +depth),
        Point2.make(-width, +depth),
    ];

    return createBasicEntity(world, position, dimensions)
        .with(ComponentId.Unit, undefined)
        .with(ComponentId.Polygon, polygon);
}
