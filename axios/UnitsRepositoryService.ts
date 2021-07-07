import { Dimensions } from 'app/canvas/Dimensions';
import { UNIT_MAPPING } from 'app/canvas/UnitsMap';
import { UnitStyle } from 'app/canvas/UnitUtils';
import axios from 'axios';

export interface dataStuff {
    type: string;
    name: string;
    fillColour: string;
    borderColour?: string;
    dimensions: Dimensions;
    // can extend to price if basket system gets implemented
    // price: Intl.NumberFormat('en-US', {
    //    style: 'currency',
    //    currency: 'GBP'
    // });
}

class UnitsRepositoryService {
    private BaseUnits: Map<string, dataStuff> = new Map();

    private WallUnits: Map<string, dataStuff> = new Map();

    private TowerUnits: Map<string, dataStuff> = new Map();

    private DecorUnits: Map<string, dataStuff> = new Map();

    private WorktopUnits: Map<string, dataStuff> = new Map();

    public async loadData() {
        await this.cacheUnits('https://symfony-sandbox.dev.wrenkitchens.com/data/units', 18);

        await this.cacheUnits(
            'https://symfony-sandbox.dev.wrenkitchens.com/data/decor-end-panels',
            5
        );

        await this.cacheUnits('https://symfony-sandbox.dev.wrenkitchens.com/data/worktops', 5);

        await this.fallBackData();
    }

    private async cacheUnits(url: string, listLength: number) {
        await axios.get(url).then((res) => {
            const allData = res.data['hydra:member'];

            allData.splice(listLength, allData.length - listLength);

            allData.forEach((obj: dataStuff) => {
                const id: number = allData.indexOf(obj);
                let list;
                switch (obj.type) {
                    case 'wall': {
                        list = this.WallUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'base': {
                        list = this.BaseUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'tower': {
                        list = this.TowerUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'decor-end-panel': {
                        list = this.DecorUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                    case 'worktop': {
                        list = this.WorktopUnits;
                        this.populateMaps(list, obj, id);
                        break;
                    }
                }
            });
        });
    }

    private populateMaps(list: Map<string, dataStuff>, obj: dataStuff, id: number) {
        list.set(id.toString(), {
            type: obj.type,
            name: obj.name,
            fillColour: obj.fillColour,
            borderColour: obj?.borderColour,
            dimensions: obj.dimensions,
        });
    }

    private async fallBackData() {
        if (!this.BaseUnits.size) {
            this.backUpData(this.BaseUnits, 'base', 'unit1', UNIT_MAPPING.BaseSizeA);
            this.backUpData(this.BaseUnits, 'base', 'unit2', UNIT_MAPPING.BaseSizeB);
        }
        if (!this.WallUnits.size) {
            this.backUpData(this.WallUnits, 'wall', 'unit1', UNIT_MAPPING.WallSizeA);
            this.backUpData(this.WallUnits, 'wall', 'unit2', UNIT_MAPPING.WallSizeB);
        }
        if (!this.TowerUnits.size) {
            this.backUpData(this.TowerUnits, 'tower', 'unit1', UNIT_MAPPING.TowerSizeA);
            this.backUpData(this.TowerUnits, 'tower', 'unit2', UNIT_MAPPING.TowerSizeB);
        }
        if (!this.DecorUnits.size) {
            this.backUpData(this.DecorUnits, 'decor', 'unit1', UNIT_MAPPING.DecorSizeA);
            this.backUpData(this.DecorUnits, 'decor', 'unit2', UNIT_MAPPING.DecorSizeB);
        }
        if (!this.WorktopUnits.size) {
            this.backUpData(this.WorktopUnits, 'worktops', 'unit1', UNIT_MAPPING.WorktopSizeA);
            this.backUpData(this.WorktopUnits, 'worktops', 'unit2', UNIT_MAPPING.WorktopSizeB);
        }
    }

    private backUpData(list: Map<string, dataStuff>, type: string, name: string, unit: UnitStyle) {
        list.set(list.size.toString(), {
            type,
            name,
            fillColour: unit.fillColour,
            borderColour: unit.borderColour,
            dimensions: unit.dimensions,
        });
    }

    public getList(type: string): Map<string, dataStuff> {
        switch (type) {
            case 'Base Units': {
                return this.BaseUnits;
            }
            case 'Wall Units': {
                return this.WallUnits;
            }
            case 'Tower Units': {
                return this.TowerUnits;
            }
            case 'Decor Units': {
                return this.DecorUnits;
            }
            case 'Worktop Units': {
                return this.WorktopUnits;
            }
        }
    }

    public getUnit(name: string, type: string): dataStuff {
        let unitData: dataStuff;

        type = this.capitalizeFirstLetter(type);
        if (type === 'Decor-end-panel') {
            type = 'Decor Units';
        } else {
            type = type.concat(' Units');
        }

        const listOfUnit = Array.from(this.getList(type));
        listOfUnit.map((unit) => {
            const [id, data] = unit;
            if (data.name === name) {
                unitData = data;
            }
        });
        return unitData;
    }

    private capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export const unitsRepositoryService = new UnitsRepositoryService();
