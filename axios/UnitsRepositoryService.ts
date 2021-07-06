import { Dimensions } from 'app/canvas/Dimensions';
import { UNIT_MAPPING } from 'app/canvas/UnitsMap';
import { UnitStyle } from 'app/canvas/UnitUtils';
import axios from 'axios';

interface dataStuff {
    type: string;
    name: string;
    fillColour: string;
    borderColour?: string;
    dimensions: Dimensions;
    // can extend to price if basket system gets implemented
    // price: Intl.NumberFormat('en-US', {
    //    style: 'currency',
    //    currency: 'GBP'
    //});
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
            18
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
                const id: number = allData.indexOf(obj);
                let list;
                switch (obj.type) {
                    case 'wall': {
                        list = this.wallUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'base': {
                        list = this.baseUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'tower': {
                        list = this.towerUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'decor-end-panel': {
                        list = this.decorUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'worktop': {
                        list = this.worktopUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                }
            });
        });
    }

    private populateMaps(
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

    private fallBackData() {
        if (!this.baseUnits.size) {
            this.backUpData(
                this.baseUnits,
                'base',
                'unit1',
                UNIT_MAPPING.BaseSizeA
            );
            this.backUpData(
                this.baseUnits,
                'base',
                'unit2',
                UNIT_MAPPING.BaseSizeB
            );
        }
        if (!this.wallUnits.size) {
            this.backUpData(
                this.wallUnits,
                'wall',
                'unit1',
                UNIT_MAPPING.WallSizeA
            );
            this.backUpData(
                this.wallUnits,
                'wall',
                'unit2',
                UNIT_MAPPING.WallSizeB
            );
        }
        if (!this.towerUnits.size) {
            this.backUpData(
                this.towerUnits,
                'tower',
                'unit1',
                UNIT_MAPPING.TowerSizeA
            );
            this.backUpData(
                this.towerUnits,
                'tower',
                'unit2',
                UNIT_MAPPING.TowerSizeB
            );
        }
        if (!this.decorUnits.size) {
            this.backUpData(
                this.decorUnits,
                'decor',
                'unit1',
                UNIT_MAPPING.DecorSizeA
            );
            this.backUpData(
                this.decorUnits,
                'decor',
                'unit2',
                UNIT_MAPPING.DecorSizeB
            );
        }
        if (!this.worktopUnits.size) {
            this.backUpData(
                this.worktopUnits,
                'worktops',
                'unit1',
                UNIT_MAPPING.WorktopSizeA
            );
            this.backUpData(
                this.worktopUnits,
                'worktops',
                'unit2',
                UNIT_MAPPING.WorktopSizeB
            );
        }
    }
    // list, type, name, unitStyle
    private backUpData(
        list: Map<string, dataStuff>,
        type: string,
        name: string,
        unit: UnitStyle
    ) {
        list.set(list.size.toString(), {
            type,
            name,
            fillColour: unit.fillColour,
            borderColour: unit.borderColour,
            dimensions: unit.dimensions,
        });
    }
}
export const unitsRepositoryService = new UnitsRepositoryService();
