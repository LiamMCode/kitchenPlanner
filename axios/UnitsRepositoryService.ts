import axios from 'axios';
import { Dimensions } from '../src/canvas/Dimensions';
import { UNIT_MAPPING } from '../src/canvas/UnitsMap';
import { UnitStyle, WidgetStyle } from '../src/canvas/UnitUtils';

export interface IncomingUnitData {
    type: string;
    name: string;
    fillColour: string;
    borderColour?: string;
    dimensions: number[];
    price: number;
}

export interface WidgetUnitData {
    type: string;
    name: string;
    widgetStyle: WidgetStyle;
    dimensions: Dimensions;
    price: number;
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

        await this.cacheUnits(`${baseUrl}/units`, 'units');
        await this.cacheUnits(`${baseUrl}/decor-end-panels`, 'decor');
        await this.cacheUnits(`${baseUrl}/worktops`, 'worktops');
    }

    private async cacheUnits(url: string, listsFilling: string, listLength?: number) {
        await axios.get(url).then(
            (res) => {
                const allData = res.data['hydra:member'];

                if (listLength) {
                    allData.splice(listLength, allData.length - listLength);
                }

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
                        default: {
                            console.log(obj.type);
                        }
                    }
                });
            },
            (error) => {
                console.log(error);
                this.fallBackData(listsFilling);
            },
        );
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
            price: obj.price,
        });
    }

    private async fallBackData(list: string) {
        if (list === 'units') {
            if (!this.BaseUnits.size) {
                this.backUpData(this.BaseUnits, 'base', 'BaseSizeA', UNIT_MAPPING.BaseSizeA);
                this.backUpData(this.BaseUnits, 'base', 'BaseSizeB', UNIT_MAPPING.BaseSizeB);
            }
            if (!this.WallUnits.size) {
                this.backUpData(this.WallUnits, 'wall', 'WallSizeA', UNIT_MAPPING.WallSizeA);
                this.backUpData(this.WallUnits, 'wall', 'WallSizeB', UNIT_MAPPING.WallSizeB);
            }
            if (!this.TowerUnits.size) {
                this.backUpData(this.TowerUnits, 'tower', 'TowerSizeA', UNIT_MAPPING.TowerSizeA);
                this.backUpData(this.TowerUnits, 'tower', 'TowerSizeB', UNIT_MAPPING.TowerSizeB);
            }
        } else if (list === 'decor') {
            if (!this.DecorUnits.size) {
                this.backUpData(this.DecorUnits, 'decor', 'DecorSizeA', UNIT_MAPPING.DecorSizeA);
                this.backUpData(this.DecorUnits, 'decor', 'DecorSizeB', UNIT_MAPPING.DecorSizeB);
            }
        } else if (list === 'worktops') {
            if (!this.WorktopUnits.size) {
                this.backUpData(
                    this.WorktopUnits,
                    'worktop',
                    'WorktopSizeA',
                    UNIT_MAPPING.WorktopSizeA,
                );
                this.backUpData(
                    this.WorktopUnits,
                    'worktop',
                    'WorktopSizeB',
                    UNIT_MAPPING.WorktopSizeB,
                );
            }
        }
    }

    private backUpData(
        list: Map<string, WidgetUnitData>,
        type: string,
        name: string,
        unit: UnitStyle,
    ): Map<string, WidgetUnitData> {
        list.set(name, {
            type,
            name,
            widgetStyle: {
                fillColour: unit.widgetStyle.fillColour,
                borderColour: unit.widgetStyle.borderColour,
            },
            dimensions: unit.dimensions,
            price: unit.price,
        });
        return list;
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
            default: {
                console.log(type);
            }
        }
    }

    public getUnit(name: string, type: string): WidgetUnitData {
        let widgetType = this.capitalizeFirstLetter(type);

        if (widgetType === 'Decor-end-panel') {
            widgetType = 'Decor Units';
        } else {
            widgetType = widgetType.concat(' Units');
        }

        const units = this.getList(widgetType);

        return units.get(name);
    }

    private capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export const unitsRepositoryService = new UnitsRepositoryService();
