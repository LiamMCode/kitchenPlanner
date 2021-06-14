import { Actor, ActorId } from '~/engine/Actor';
import { MessageId, Port } from '~/engine/Message';



export namespace WorkerActor {
    export function make(
        actorId: ActorId,
        subscribeFn: (actor: Actor) => void,
        startFn: (actor: Actor) => void,
    ): void {
        const actor = Actor.make(actorId);

        let targetAddressBookSize: number | undefined;

        // The initial messages will be sent via the standard message system used by workers.
        // This is to get the initial data for synchronising communications.
        self.onmessage = ({ data }) => {
            if (typeof data === 'number') {
                targetAddressBookSize = data;
            } else {
                const { actorId, port } = data as Port;

                actor.addressBook.set(actorId, port);
                port.onmessage = ({ data }) => actor.receive(data);

                if (actor.addressBook.size === targetAddressBookSize) {
                    actor.sendMessage(ActorId.Ui, MessageId.Ready, undefined);
                    self.onmessage = null;
                }
            }
        };

        subscribeFn(actor);

        actor.onMessage(MessageId.Ready, async () => startFn(actor));
    }
}
