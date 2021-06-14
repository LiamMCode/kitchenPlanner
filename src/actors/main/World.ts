import { ComponentId, ComponentLookUp } from '~/actors/main/Components';
import { Query, QueryResults } from '~/actors/main/Query';
import { ResourceId, ResourceLookUp } from '~/actors/main/Resources';

export interface EntityBuilder {
    with<Id extends ComponentId>(componentId: Id, component: ComponentLookUp<Id>): this;
    finish(): number;
}

export interface World {
    createEntity(): EntityBuilder;
    destroyEntity(entityId: number): void;

    getComponent<Id extends ComponentId>(entityId: number, componentId: Id): ComponentLookUp<Id> | undefined;
    setComponent<Id extends ComponentId>(entityId: number, componentId: Id, component: ComponentLookUp<Id>): void;
    hasComponent<Id extends ComponentId>(entityId: number, componentId: Id): boolean;

    getResource<Id extends ResourceId>(resourceId: Id): ResourceLookUp<Id> | undefined;
    setResource<Id extends ResourceId>(resourceId: Id, resource: ResourceLookUp<Id>): void;

    query<Required extends readonly ComponentId[], Optional extends readonly ComponentId[]>(
        queryInfo: Query<Required, readonly ComponentId[], Optional>
    ): IterableIterator<[number, QueryResults<Required, Optional>]>;
}

export namespace World {
    export function make(): World {

        // The data in these arrays is organised in the following manner
        // [entityId] = Map<...>
        const componentsMap = new Array<Map<ComponentId, any>>();
        const queryCacheMap = new Array<Map<Query<any, any, any>, any[]>>();
        const resourcesMap = new Map<ResourceId, any>();

        let nextEntityId = 0;

        const world: World = {
            createEntity() {
                const entityId = nextEntityId;
                nextEntityId += 1;

                let components: Map<ComponentId, any> | undefined = new Map();

                const builder: EntityBuilder = {
                    with(componentId, component) {
                        components?.set(componentId, component);
                        return builder;
                    },

                    finish() {
                        componentsMap[entityId] = components!;
                        queryCacheMap[entityId] = new Map();
                        components              = undefined;

                        return entityId;
                    }
                };

                return builder;
            },

            destroyEntity(entityId) {
                componentsMap[entityId] .clear();
                queryCacheMap[entityId]?.clear();
            },

            getComponent(entityId, componentId) {
                return componentsMap[entityId].get(componentId);
            },

            setComponent(entityId, componentId, component) {
                componentsMap[entityId] .set(componentId, component);
                queryCacheMap[entityId]?.clear();
            },

            hasComponent(entityId, componentId) {
                return componentsMap[entityId].has(componentId);
            },

            getResource(resourceId) {
                return resourcesMap.get(resourceId);
            },

            setResource(resourceId, resource) {
                resourcesMap.set(resourceId, resource);
            },

            * query(queryInfo) {
                const { required, excluded, optional } = queryInfo;
// #ifdef WEIRD_BUG
// I want to use a `for of` loop, but for some reason it doesn't work here.
// From my investigations the bug is either in parceljs or in Typescript.

                // nextEntity:
                // for (const [entityId, components] of componentsMap.entries()) {
// #else
                const iterator = componentsMap.entries();
                let result = iterator.next();

                nextEntity:
                while (!result.done) {
                    const [entityId, components] = result.value;
                    result = iterator.next();
// #endif WEIRD_BUG
                    if (components.size === 0) {
                        continue;
                    }

                    const queryCache = queryCacheMap[entityId];
                    let componentData = queryCache.get(queryInfo);

                    if (!componentData) {
                        componentData = [];

                        // Check for entities that contain excluded components.
                        if (excluded) {
                            for (const id of excluded) {
                                if (components.has(id)) {
                                    continue nextEntity;
                                }
                            }
                        }

                        for (const id of required) {
                            // Since `undefined` can be a valid component value we can't just call `get` and
                            // check the result.
                            if (components.has(id)) {
                                componentData.push(components.get(id));
                            }
                        }

                        if (optional) {
                            for (const id of optional) {
                                componentData.push(components.get(id));
                            }
                        }

                        queryCache.set(queryInfo, componentData);
                    }

                    yield [entityId, componentData as any];
                }
            }
        };

        return world;
    }
}
