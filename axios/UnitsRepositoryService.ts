import { Dimensions } from 'app/canvas/Dimensions';
import { UNIT_MAPPING } from 'app/canvas/UnitsMap';
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
            'https://symfony-sandbox.dev.wrenkitchens.com/data/units',
            20
        );
        const unitsDecor = this.cacheUnits(
            'https://symfony-sandbox.dev.wrenkitchens.com/data/decor-end-panels',
            5
        );
        const unitsWorktop = this.cacheUnits(
            'https://symfony-sandbox.dev.wrenkitchens.com/data/worktops',
            5
        );
        this.fallBackData();

        console.log(
            'Wall',
            this.wallUnits,
            '\n',
            'Base',
            this.baseUnits,
            '\n',
            'Tower',
            this.towerUnits,
            '\n',
            'decor',
            this.decorUnits,
            '\n',
            'worktops',
            this.worktopUnits
        );
    }

    private async cacheUnits(url: string, listLength: number) {
        const toCache = await axios.get(url).then((res) => {
            const allData = res.data['hydra:member'];
            allData.splice(listLength, allData.length - listLength);

            allData.forEach((obj: dataStuff) => {
                switch (obj.type) {
                    case 'wall': {
                        const list = this.wallUnits;
                        const id: number = allData.indexOf(obj);
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'base': {
                        const list = this.baseUnits;
                        const id: number = allData.indexOf(obj);
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'tower': {
                        const list = this.towerUnits;
                        const id: number = allData.indexOf(obj);
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'decor-end-panel': {
                        const list = this.decorUnits;
                        const id: number = allData.indexOf(obj);
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'worktop': {
                        const list = this.worktopUnits;
                        const id: number = allData.indexOf(obj);
                        this.populateMaps(list, obj, id);
                        break;
                    }
                }
            });
        });
    }

    public populateMaps(
        list: Map<string, dataStuff>,
        obj: dataStuff,
        id: number
    ) {
        let unitType: string = obj.type;
        let unitName: string = obj.name;
        let fillColour: string = obj.fillColour;
        let borderColour: string = obj?.borderColour;
        let dimensions: Dimensions = obj.dimensions;

        list.set(id.toString(), {
            type: unitType,
            name: unitName,
            fillColour: fillColour,
            borderColour: borderColour,
            dimensions: dimensions,
        });
    }

    public fallBackData() {
        if (!this.baseUnits.size) {
            this.baseUnits.set(this.baseUnits.size.toString(), {
                type: 'base',
                name: 'unit1',
                fillColour: UNIT_MAPPING.BaseSizeA.fillColour,
                borderColour: UNIT_MAPPING.BaseSizeA.borderColour,
                dimensions: UNIT_MAPPING.BaseSizeA.dimensions,
            });
            this.baseUnits.set(this.baseUnits.size.toString(), {
                type: 'base',
                name: 'unit2',
                fillColour: UNIT_MAPPING.BaseSizeB.fillColour,
                borderColour: UNIT_MAPPING.BaseSizeB.borderColour,
                dimensions: UNIT_MAPPING.BaseSizeB.dimensions,
            });
        }
        if (!this.wallUnits.size) {
            this.wallUnits.set(this.wallUnits.size.toString(), {
                type: 'wall',
                name: 'unit1',
                fillColour: UNIT_MAPPING.WallSizeA.fillColour,
                borderColour: UNIT_MAPPING.WallSizeA.borderColour,
                dimensions: UNIT_MAPPING.WallSizeA.dimensions,
            });
            this.wallUnits.set(this.wallUnits.size.toString(), {
                type: 'wall',
                name: 'unit2',
                fillColour: UNIT_MAPPING.WallSizeB.fillColour,
                borderColour: UNIT_MAPPING.WallSizeB.borderColour,
                dimensions: UNIT_MAPPING.WallSizeB.dimensions,
            });
        }
        if (!this.towerUnits.size) {
            this.towerUnits.set(this.towerUnits.size.toString(), {
                type: 'tower',
                name: 'unit1',
                fillColour: UNIT_MAPPING.TowerSizeA.fillColour,
                borderColour: UNIT_MAPPING.TowerSizeA.borderColour,
                dimensions: UNIT_MAPPING.TowerSizeA.dimensions,
            });
            this.towerUnits.set(this.towerUnits.size.toString(), {
                type: 'tower',
                name: 'unit2',
                fillColour: UNIT_MAPPING.TowerSizeB.fillColour,
                borderColour: UNIT_MAPPING.TowerSizeB.borderColour,
                dimensions: UNIT_MAPPING.TowerSizeB.dimensions,
            });
        }
        if (!this.decorUnits.size) {
            this.decorUnits.set(this.decorUnits.size.toString(), {
                type: 'decor',
                name: 'unit1',
                fillColour: UNIT_MAPPING.DecorSizeA.fillColour,
                borderColour: UNIT_MAPPING.DecorSizeA.borderColour,
                dimensions: UNIT_MAPPING.DecorSizeA.dimensions,
            });
            this.decorUnits.set(this.decorUnits.size.toString(), {
                type: 'decor',
                name: 'unit2',
                fillColour: UNIT_MAPPING.DecorSizeB.fillColour,
                borderColour: UNIT_MAPPING.DecorSizeB.borderColour,
                dimensions: UNIT_MAPPING.DecorSizeB.dimensions,
            });
        }
        if (!this.worktopUnits.size) {
            this.worktopUnits.set(this.worktopUnits.size.toString(), {
                type: 'worktops',
                name: 'unit1',
                fillColour: UNIT_MAPPING.WorktopSizeA.fillColour,
                borderColour: UNIT_MAPPING.WorktopSizeA.borderColour,
                dimensions: UNIT_MAPPING.WorktopSizeA.dimensions,
            });
            this.worktopUnits.set(this.worktopUnits.size.toString(), {
                type: 'worktops',
                name: 'unit2',
                fillColour: UNIT_MAPPING.WorktopSizeB.fillColour,
                borderColour: UNIT_MAPPING.WorktopSizeB.borderColour,
                dimensions: UNIT_MAPPING.WorktopSizeB.dimensions,
            });
        }
    }
}

export const unitsRepositoryService = new UnitsRepositoryService();
