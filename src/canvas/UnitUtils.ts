import { Dimensions } from './Dimensions';
import { UnitSize } from './WidgetRepository';

export interface WidgetStyle {
    fillColour: string;
    borderColour: string;
}

export interface UnitStyle {
    widgetStyle: {
        borderColour: string;
        fillColour: string;
    };
    dimensions: Dimensions;
    unitID: number;
}

export type UnitMapping = Record<UnitSize, UnitStyle>;
