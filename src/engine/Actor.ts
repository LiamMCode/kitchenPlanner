import { Packet } from '~/engine/Packet';
import { Message, MessageId, MessageIdLookup } from '~/engine/Message';

export enum ActorId {
    Main,
    Render,
    Ui,
}

export interface Actor {
    addressBook: Map<ActorId, MessagePort>,

    receive(data: Packet): Promise<void>;

    onMessage<M extends Message<Req, Res>, Req, Res>(
        messageId: MessageIdLookup<M>,
        fn       : (message: Req) => Promise<Res>,
    ): void,

    sendMessage<M extends Message<Req, Res>, Req, Res>(
        to       : ActorId,
        messageId: MessageIdLookup<M>,
        message  : Req,
        transfer?: Transferable[],
    ): Promise<Res>;
}

const packetIdGenerator = (function * threadLocalCounter() {
    let nextPacketId = 0;

    while (true) {
        yield nextPacketId;

        nextPacketId = nextPacketId === Number.MAX_SAFE_INTEGER
            ? 0
            : nextPacketId + 1;
    }
})();

const nextPacketId = () => packetIdGenerator.next().value;

export namespace Actor {
    export function make(actorId: ActorId): Actor {
        const actorName   = ActorId[actorId];
        const messageMap  = new Map<MessageId, (message: any) => Promise<any>>();
        const promiseMap  = new Map<number, (response: any) => void>();
        const addressBook = new Map<ActorId, MessagePort>();

        const actor: Actor = {
            addressBook,

            async receive(data) {
                const { origin, packetId, messageId, address, packetData } = data as Packet;

                if (origin === actorId) {
                    promiseMap.get(packetId)?.(packetData);
                    promiseMap.delete(packetId);
                } else {
                    const response = await messageMap.get(messageId)?.(packetData);
                    const { to, from } = address;

                    const packet: Packet = {
                        origin,
                        packetId,
                        messageId,
                        address   : { to: from, from: to },
                        packetData: response,
                    };

                    // If we were able to get a message from the sender, then we should
                    // always be able to send one back.
                    addressBook.get(from)!.postMessage(packet);
                }
            },

            onMessage(messageId, fn) {
                messageMap.set(messageId, fn);
            },

            async sendMessage(to, messageId, message, transfer = []) {
                console.assert(to !== actorId, 'can\'t send a message to yourself');

                const packetId = nextPacketId();
                const packet: Packet = {
                    origin    : actorId,
                    packetId,
                    messageId,
                    address   : { to, from: actorId },
                    packetData: message,
                };

                let rejectFn : (reason: string) => void;
                let resolveFn: (response: any) => void;

                const promise = new Promise<any>((resolve, reject) => {
                    resolveFn = resolve;
                    rejectFn  = reject;
                });

                const port = addressBook.get(to);

                if (port) {
                    port.postMessage(packet, transfer);
                    promiseMap.set(packetId, resolveFn!);
                } else {
                    rejectFn!(`${actorName} has no port for ${ActorId[to]}`);
                }

                return promise;
            }
        };

        return actor;
    }
}
