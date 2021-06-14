import { ComponentId } from '~/actors/main/Components';
import { Dimensions } from '~/engine/maths/Dimensions';
import { EntityBuilder, World } from '~/actors/main/World';
import { Matrix } from '~/engine/maths/Matrix';
import { Point3 } from '~/engine/maths/Point3';

export function createBasicEntity(world: World, position: Point3, dimensions: Dimensions): EntityBuilder {
    const rotation = Math.random() * Math.PI;
    const modelMatrix = Matrix.transformation(position, rotation, dimensions);

    return world.createEntity()
        .with(ComponentId.Position, position)
        .with(ComponentId.Rotation, { rotation })
        .with(ComponentId.Dimensions, dimensions)
        .with(ComponentId.ModelMatrix, modelMatrix);
}
