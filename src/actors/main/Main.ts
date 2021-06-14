import { Actor, ActorId } from '~/engine/Actor';
import { ComponentId } from '~/actors/main/Components';
import { createBaseUnitWidget } from '~/actors/main/entities/BaseUnit';
import { Dimensions } from '~/engine/maths/Dimensions';
import { Matrix } from '~/engine/maths/Matrix';
import { MessageId, RenderData } from '~/engine/Message';
import { Point2 } from '~/engine/maths/Point2';
import { Point3 } from '~/engine/maths/Point3';
import { Query } from '~/actors/main/Query';
import { ResourceId } from '~/actors/main/Resources';
import { Vector3 } from '~/engine/maths/Vector3';
import { WorkerActor } from '~/actors/WorkerActor';
import { World } from '~/actors/main/World';

const UPDATE_QUERY = Query.make(Query.list(
    ComponentId.ModelMatrix,
    ComponentId.Position,
    ComponentId.Rotation,
    ComponentId.Dimensions,
));

const RENDER_QUERY = Query.make(Query.list(
    ComponentId.Polygon,
    ComponentId.ModelMatrix,
));

async function updateScene(world: World, mainActor: Actor): Promise<void> {
    for (const [_, [modelMatrix, position, { rotation }, dimensions]] of world.query(UPDATE_QUERY)) {
        Matrix.copyInto(modelMatrix, Matrix.transformation(position, rotation, dimensions));
    }

    const level = world.getResource(ResourceId.CameraZoom)?.level;

    if (level) {
        world.setResource(ResourceId.ScaleMatrix, Matrix.scale(level, 1, level));
    }

    const cameraPosition = world.getResource(ResourceId.CameraPosition);
    const cameraVectors  = world.getResource(ResourceId.CameraVectors);

    if (cameraPosition && cameraVectors) {
        const {
            right,
            up,
            forward,
        } = cameraVectors;

        world.setResource(ResourceId.ViewMatrix, Matrix.view(right, up, forward, cameraPosition));
    }

    const renderData: RenderData = {
        entities   : Array.from(world.query(RENDER_QUERY), ([_, [polygon, modelMatrix]]) => [polygon, modelMatrix]),
        viewMatrix : world.getResource(ResourceId.ViewMatrix)!,
        scaleMatrix: world.getResource(ResourceId.ScaleMatrix)!,
    };

    await mainActor.sendMessage(ActorId.Render, MessageId.Render, renderData);
}

const world = World.make();

WorkerActor.make(ActorId.Main,
    (mainActor) => {
        mainActor.onMessage(MessageId.MouseDown, async (position: Point2) => {
            updateScene(world, mainActor);
        });

        mainActor.onMessage(MessageId.MouseUp, async (position: Point2) => {
            updateScene(world, mainActor);
        });

        mainActor.onMessage(MessageId.MouseMove, async (position: Point2) => {
            updateScene(world, mainActor);
        });
    },

    (mainActor) => {
        const cameraPosition = Point2.make(960, 540);
        const cameraZoom     = { level: 0.001 };
        const right          = Vector3.positiveX();
        const up             = Vector3.positiveY();
        const forward        = Vector3.negativeZ();

        world.setResource(ResourceId.CameraPosition, cameraPosition);
        world.setResource(ResourceId.CameraZoom, cameraZoom);
        world.setResource(ResourceId.CameraVectors, { right, up, forward });

        createBaseUnitWidget(world, Point3.make(-250, 0, 0), Dimensions.make(500, 500, 500)),
        createBaseUnitWidget(world, Point3.make( 150, 0, 0), Dimensions.make(300, 300, 300)),

        updateScene(world, mainActor);
    },
);
