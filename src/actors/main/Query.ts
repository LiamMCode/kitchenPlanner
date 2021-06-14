import { ComponentId, ComponentLookUp } from '~/actors/main/Components';

// For some reason, typescript doesn't understand that Required and Optional are an array types,
// so we have to use ts-expect-error.
export type QueryResults<
    Required extends readonly ComponentId[],
    Optional extends readonly ComponentId[],
> = [
    ...{
        // @ts-expect-error
        [Id in keyof Required]: ComponentLookUp<Required[Id]>;
    },

    ...{
        // @ts-expect-error
        [Id in keyof Optional]?: ComponentLookUp<Optional[Id]>;
    },
];

export interface Query<
    Required extends readonly ComponentId[],
    Excluded extends readonly ComponentId[],
    Optional extends readonly ComponentId[],
> {
    readonly required : Required;
    readonly excluded?: Excluded;
    readonly optional?: Optional;
}

export namespace Query {
    export const make = <
        Required extends readonly ComponentId[],
        Excluded extends readonly ComponentId[],
        Optional extends readonly ComponentId[],
    >(
        required : Required,
        excluded?: Excluded,
        optional?: Optional,
    ): Query<Required, Excluded, Optional> => {
        for (const id of required) {
            if (excluded?.includes(id)) {
                throw new Error(`Tried to mark required component as excluded: ${id}`);
            }

            if (optional?.includes(id)) {
                throw new Error(`Tried to mark required component as optional: ${id}`);
            }
        }

        if (optional) {
            for (const id of optional) {
                if (excluded?.includes(id)) {
                    throw new Error(`Tried to mark optional component as excluded: ${id}`);
                }
            }
        }

        if (excluded) {
            for (const id of excluded) {
                if (optional?.includes(id)) {
                    throw new Error(`Tried to mark excluded component as optional: ${id}`);
                }
            }
        }

        return { required, excluded, optional };
    };

    export const list = <Ids extends ComponentId[]>(...ids: Ids) => ids;
}
