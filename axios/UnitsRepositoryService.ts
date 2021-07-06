import { Dimensions } from 'app/canvas/Dimensions';
import axios from 'axios';

interface dataStuff {
    type: string;
    name: string;
    fillColour: string;
    borderColour: string;
    dimensions: Dimensions;
    // can extend to price if basket system gets implemented
}

class UnitsRepositoryService {
    private baseUnits: Map<string, dataStuff> = new Map();
    private wallUnits: Map<string, dataStuff> = new Map();
    private towerUnits: Map<string, dataStuff> = new Map();
    private decorUnits: Map<string, dataStuff> = new Map();
    private worktopUnits: Map<string, dataStuff> = new Map();

    public async loadData() {
        const unitsBWT = this.cacheUnits(
            'https://symfony-sandbox.dev.wrenkitchens.com/data/units'
        );
        // const unitsDecor = this.cacheUnits(
        //     'https://symfony-sandbox.dev.wrenkitchens.com/data/decor-end-panels'
        // );
        // const unitsWorktop = this.cacheUnits(
        //     'https://symfony-sandbox.dev.wrenkitchens.com/data/worktops'
        // );
    }

    private async cacheUnits(url: string) {
        const toCache = await axios.get(url).then((res) => {
            const allData = res.data['hydra:member'];
            allData.splice(20, allData.length - 20);

            if (!allData) {
                //fall back to hard coded stuff in UnitsMap.ts
            } else {
                allData.forEach((obj: dataStuff) => {
                    let id: number = allData.indexOf(obj);
                    let type: string = obj.type;
                    let name: string = obj.name;
                    let fillColour: string = obj.fillColour;
                    let borderColour: string = obj?.borderColour;
                    let dimensions: Dimensions = obj.dimensions;

                    switch (type) {
                        case 'wall': {
                            let list = this.wallUnits;
                            this.populateMaps(
                                list,
                                id,
                                type,
                                name,
                                fillColour,
                                dimensions,
                                borderColour
                            );
                            break;
                        }
                        case 'base': {
                            let list = this.baseUnits;
                            this.populateMaps(
                                list,
                                id,
                                type,
                                name,
                                fillColour,
                                dimensions,
                                borderColour
                            );
                            break;
                        }
                        case 'tower': {
                            let list = this.towerUnits;
                            this.populateMaps(
                                list,
                                id,
                                type,
                                name,
                                fillColour,
                                dimensions,
                                borderColour
                            );
                            break;
                        }
                        case 'decor': {
                            let list = this.decorUnits;
                            this.populateMaps(
                                list,
                                id,
                                type,
                                name,
                                fillColour,
                                dimensions
                            );
                            break;
                        }
                        case 'worktops': {
                            let list = this.worktopUnits;
                            this.populateMaps(
                                list,
                                id,
                                type,
                                name,
                                fillColour,
                                dimensions,
                                borderColour
                            );
                            break;
                        }
                    }
                });
            }
            console.log(
                'Wall Units ',
                this.wallUnits,
                'Base Units ',
                this.baseUnits,
                'Tower Units ',
                this.towerUnits
            );
        });
    }

    public populateMaps(
        list: Map<string, dataStuff>,
        id: number,
        unitType: string,
        unitName: string,
        fillColour: string,
        dimensions: Dimensions,
        borderColour?: string
    ) {
        list.set(id.toString(), {
            type: unitType,
            name: unitName,
            fillColour: fillColour,
            borderColour: borderColour,
            dimensions: dimensions,
        });
    }
}

export const unitsRepositoryService = new UnitsRepositoryService();
