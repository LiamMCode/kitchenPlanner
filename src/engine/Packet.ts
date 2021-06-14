import type { MessageId, Address } from '~/engine/Message';
import type { ActorId } from '~/engine/Actor';

export interface Packet {
    readonly origin    : ActorId;
    readonly packetId  : number;
    readonly messageId : MessageId;
    readonly address   : Address;
    readonly packetData: any;
}
