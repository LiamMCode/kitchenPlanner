import type { ActorId } from '~/engine/Actor';
import type { Point2 } from '~/engine/maths/Point2';
import { Matrix } from './maths/Matrix';

// ==============================================
// Address
// ==============================================

export interface Address {
    to  : ActorId,
    from: ActorId,
}

// ==============================================
// Message Data
// ==============================================

export type Message<Request = void, Response = void> = {
    readonly request : Request,
    readonly response: Response,
};

export interface Port {
    readonly actorId: ActorId;
    readonly port   : MessagePort;
}

export interface RenderData {
    readonly entities   : [Point2[], Matrix][];
    readonly viewMatrix : Matrix;
    readonly scaleMatrix: Matrix;
}

// ==============================================
// MessageId Lookup
// ==============================================

export const enum MessageId {
    MouseDown,
    MouseMove,
    MouseUp,
    Port,
    Present,
    Ready,
    Render,
}

export type MessageIdLookup<M extends Message<any, any>>
    = M extends Message<Port>
        ? MessageId.Port
    : M extends Message<Point2>
        ? MessageId.MouseDown
        | MessageId.MouseUp
        | MessageId.MouseMove
    : M extends Message<ImageBitmap>
        ? MessageId.Present
    : M extends Message<RenderData>
        ? MessageId.Render
    : M extends Message
        ? MessageId.Ready
    : MessageId;
