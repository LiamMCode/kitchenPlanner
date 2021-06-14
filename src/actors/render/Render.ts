import { ActorId } from '~/engine/Actor';
import { Matrix } from '~/engine/maths/Matrix';
import { MessageId, RenderData } from '~/engine/Message';
import { Point2 } from '~/engine/maths/Point2';
import { RESOLUTION_X, RESOLUTION_Z } from '~/engine/Resolution';
import { WorkerActor } from '~/actors/WorkerActor';

const canvas  = new OffscreenCanvas(RESOLUTION_X, RESOLUTION_Z);
const context = canvas.getContext('2d');

if (!context) {
    throw new Error('Unable to create rendering context');
}

WorkerActor.make(ActorId.Render,
    (renderActor) => {
        renderActor.onMessage(MessageId.Render, async ({ entities, viewMatrix, scaleMatrix }: RenderData) => {
            for (const [polygon, modelMatrix] of entities) {
                const transformation = Matrix.multiplyAssign(Matrix.multiply(viewMatrix, modelMatrix), scaleMatrix);

                let { x, z } = Point2.transform(polygon[0], transformation);
                const path = new Path2D();

                path.moveTo(x, z);

                for (let i = 1; i < polygon.length; i += 1) {
                    ({x, z} = Point2.transform(polygon[i], transformation));
                    path.lineTo(x, z);
                }

                path.closePath();

                context.fill(path);
            }

            const bitmap = canvas.transferToImageBitmap();
            renderActor.sendMessage(ActorId.Ui, MessageId.Present, bitmap, [bitmap]);
        });
    }, (_renderActor) => {

    },
);



