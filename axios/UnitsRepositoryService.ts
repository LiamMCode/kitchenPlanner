import { Dimensions } from '../src/canvas/Dimensions';
import { UNIT_MAPPING } from '../src/canvas/UnitsMap';
import { UnitStyle } from '../src/canvas/UnitUtils';
import { WidgetStyle } from '../src/canvas/UnitUtils';
import axios from 'axios';
import { type } from 'os';

export interface IncomingUnitData {
    type: string;
    name: string;
    fillColour: string;
    borderColour?: string;
    dimensions: number[];
    // can extend to price if basket system gets implemented
    // price: Intl.NumberFormat('en-US', {
    //    style: 'currency',
    //    currency: 'GBP'
    // });
}

export interface WidgetUnitData {
    type: string;
    name: string;
    widgetStyle: WidgetStyle;
    dimensions: Dimensions;
}

type WidgetUnitDataMap = Map<string, WidgetUnitData>;

class UnitsRepositoryService {
    private BaseUnits: WidgetUnitDataMap = new Map();
    private WallUnits: WidgetUnitDataMap = new Map();
    private TowerUnits: WidgetUnitDataMap = new Map();
    private DecorUnits: WidgetUnitDataMap = new Map();
    private WorktopUnits: WidgetUnitDataMap = new Map();

    public async loadData() {
        const baseUrl = 'https://symfony-sandbox.dev.wrenkitchens.com/data';

        await this.cacheUnits(`${baseUrl}/units`, 49);
        await this.cacheUnits(`${baseUrl}/decor-end-panels`, 5);
        await this.cacheUnits(`${baseUrl}/worktops`, 5);
        await this.fallBackData();
    }

    private async cacheUnits(url: string, listLength: number) {
        await axios.get(url).then((res) => {
            const allData = res.data['hydra:member'];

            allData.splice(listLength, allData.length - listLength);

            allData.forEach((obj: IncomingUnitData) => {
                switch (obj.type) {
                    case 'wall': {
                        this.populateMaps(this.WallUnits, obj);
                        break;
                    }
                    case 'base': {
                        this.populateMaps(this.BaseUnits, obj);
                        break;
                    }
                    case 'tower': {
                        this.populateMaps(this.TowerUnits, obj);
                        break;
                    }
                    case 'decor-end-panel': {
                        this.populateMaps(this.DecorUnits, obj);
                        break;
                    }
                    case 'worktop': {
                        this.populateMaps(this.WorktopUnits, obj);
                        break;
                    }
                }
            });
        });
    }

    private populateMaps(list: Map<string, WidgetUnitData>, obj: IncomingUnitData): void {
        const dimensionsArray = obj.dimensions;

        const dimensions = new Dimensions(
            dimensionsArray[0],
            dimensionsArray[1],
            dimensionsArray[2],
        );

        list.set(obj.name, {
            type: obj.type,
            name: obj.name,
            widgetStyle: {
                fillColour: `#${obj.fillColour}`,
                borderColour: `#${obj.borderColour!}`,
            },
            dimensions,
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

    private backUpData(
        list: Map<string, WidgetUnitData>,
        type: string,
        name: string,
        unit: UnitStyle,
    ) {
        list.set(list.size.toString(), {
            type,
            name,
            widgetStyle: {
                fillColour: unit.widgetStyle.fillColour,
                borderColour: unit.widgetStyle.borderColour,
            },
            dimensions: unit.dimensions,
        });
    }

    public getList(type: string): Map<string, WidgetUnitData> {
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

    public getUnit(name: string, type: string): WidgetUnitData {
        type = this.capitalizeFirstLetter(type);
        if (type === 'Decor-end-panel') {
            type = 'Decor Units';
        } else {
            type = type.concat(' Units');
        }

        const units = this.getList(type);
        return units.get(name);
    }

    private capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export const unitsRepositoryService = new UnitsRepositoryService();
