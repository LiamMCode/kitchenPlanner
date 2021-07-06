import { Dimensions } from './Dimensions';
import { Point } from './Point';
import { Polygon } from './Polygon';
import { UnitSize } from './PolygonFactory';
import { UnitStyle } from './UnitUtils';
import { sendData } from '../../axios/APIDataHandler';

export class PolygonRepository {
    private polygons: Polygon[] = [];

    private polygonFillColours: string[] = [];

    private polygonBorderColours: string[] = [];

    private unitsCreated: UnitSize[] = [];

    public findAll(): Polygon[] {
        return this.polygons;
    }

    public findFillColours(): string[] {
        return this.polygonFillColours;
    }

    public findBorderColours(): string[] {
        return this.polygonBorderColours;
    }

    public findUnitsCreated(): UnitSize[] {
        return this.unitsCreated;
    }

    public findUnitByPolygon(polygon: Polygon): UnitSize {
        const index = this.polygons.indexOf(polygon);

        return this.unitsCreated[index];
    }

    public push(polygon: Polygon, unit: UnitStyle, unitName: UnitSize): void {
        this.polygons.push(polygon);
        this.polygonFillColours.push(unit.fillColour);
        this.polygonBorderColours.push(unit.borderColour);
        this.unitsCreated.push(unitName);
    }

    public deletePolygon(polygonMoved: Polygon): void {
        const movedIndex = this.polygons.indexOf(polygonMoved);
        this.polygons.splice(movedIndex, 1);
        this.polygonFillColours.splice(movedIndex, 1);
        this.polygonBorderColours.splice(movedIndex, 1);
        this.unitsCreated.splice(movedIndex, 1);
    }

    public getSelectedPolygon(): Polygon {
        return this.polygons.find((polygon) => polygon.isSelected());
    }

    public deleteAll(): void {
        this.polygons = [];
        this.polygonFillColours = [];
        this.polygonBorderColours = [];
        this.unitsCreated = [];
    }

    public saveAndSerialise(name: string, email: string): void {
        let planPolygons: {
            polygonDimensions: Dimensions;
            polygonFill: string;
            polygonBorder: string;
            polygonPosition: Point[];
            unitID: string;
        }[] = [];

        this.polygons.forEach((polygon) => {
            const dimensions = polygon.getDimensions();
            const position = polygon.getPoints();

            const index = this.polygons.indexOf(polygon);
            const fillColour = this.polygonFillColours[index];
            const borderColour = this.polygonBorderColours[index];
            const IDUnit = this.unitsCreated[index];

            const polygonMap = {
                polygonDimensions: dimensions,
                polygonFill: fillColour,
                polygonBorder: borderColour,
                polygonPosition: position,
                unitID: IDUnit,
            };
            planPolygons.push(polygonMap);
        });
        const jsonSavedPlan: string = JSON.stringify(planPolygons);
        const jsonEmail: string = JSON.stringify(email);
        const jsonPlanName: string = JSON.stringify(name);

        const fileName: string = jsonPlanName + '.json';
        const contents: string = jsonEmail + '\n' + jsonSavedPlan;
        const url: string = 'http://SomeURLHERE';
        sendData(fileName, contents, url);
    }
}
