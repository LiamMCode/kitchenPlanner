import { ActorId, Actor } from '~/engine/Actor';
import { MessageId } from '~/engine/Message';
import { Point2 } from '~/engine/maths/Point2';
import { RESOLUTION_X, RESOLUTION_Z } from '~/engine/Resolution';

async function createAnInitialiseActors(): Promise<Actor> {
    const workers = [
        [ActorId.Main  , new Worker('~/actors/main/Main.ts')],
        [ActorId.Render, new Worker('~/actors/render/Render.ts')],
    ] as const;

    const uiActor = Actor.make(ActorId.Ui);
    const workerCount = workers.length;
    const addresBookSize = workerCount;

    // Set up the message channels for the actors to speak with the ui actor
    for (let i = 0; i < workerCount; i += 1) {
        const [actorId, worker] = workers[i];
        const { port1, port2 } = new MessageChannel();

        uiActor.addressBook.set(actorId, port1);
        port1.onmessage = ({ data }) => uiActor.receive(data);

        worker.postMessage(addresBookSize);
        worker.postMessage({ actorId: ActorId.Ui, port: port2 }, [port2]);
    }

    // Set up the message channels for the other actors to speak to eachother
    for (let a = 0; a < workerCount; a += 1) {
        const [actorIdA, workerA] = workers[a];

        for (let b = a + 1; b < workerCount; b += 1) {
            const [actorIdB, workerB] = workers[b];

            const { port1, port2 } = new MessageChannel();

            workerA.postMessage({ actorId: actorIdB, port: port1 }, [port1]);
            workerB.postMessage({ actorId: actorIdA, port: port2 }, [port2]);
        }
    }

    return new Promise((resolve) => {
        let readyCount = 0;

        uiActor.onMessage(MessageId.Ready, async () => {
            readyCount += 1;

            if (readyCount === workerCount) {
                for (let i = 0; i < workerCount; i += 1) {
                    const [actorId] = workers[i];
                    uiActor.sendMessage(actorId, MessageId.Ready, undefined);
                }

                resolve(uiActor);
            }
        });
    });
}

/**
 * Creates the canvas element and initialises the event listeners for user input.
 */
function createAndInitialiseCanvas(uiActor: Actor): HTMLCanvasElement {
    const canvas = document.getElementById('main_view') as HTMLCanvasElement;

    canvas.width  = RESOLUTION_X;
    canvas.height = RESOLUTION_Z;

    const mousePosition = Point2.splat(0);

    canvas.addEventListener('mousedown', (mouseEvent) => {
        const rect = canvas.getBoundingClientRect();

        mousePosition.x = mouseEvent.clientX - rect.left;
        mousePosition.z = mouseEvent.clientY - rect.top;

        uiActor.sendMessage(ActorId.Main, MessageId.MouseDown, mousePosition);
    });

    canvas.addEventListener('mouseup', (mouseEvent) => {
        const rect = canvas.getBoundingClientRect();

        mousePosition.x = mouseEvent.clientX - rect.left;
        mousePosition.z = mouseEvent.clientY - rect.top;

        uiActor.sendMessage(ActorId.Main, MessageId.MouseUp, mousePosition);
    });

    canvas.addEventListener('mousemove', (mouseEvent) => {
        const rect = canvas.getBoundingClientRect();

        mousePosition.x = mouseEvent.clientX - rect.left;
        mousePosition.z = mouseEvent.clientY - rect.top;

        uiActor.sendMessage(ActorId.Main, MessageId.MouseMove, mousePosition);
    });

    return canvas;
}

export async function main(): Promise<void> {
    document.body.style.margin = '0';

    const uiActor = await createAnInitialiseActors();
    const canvas  = createAndInitialiseCanvas(uiActor);
    const context = canvas.getContext('bitmaprenderer');

    if (context) {
        uiActor.onMessage(MessageId.Present, async (bitmap: ImageBitmap) => {
            context.transferFromImageBitmap(bitmap);
        });
    }
}
