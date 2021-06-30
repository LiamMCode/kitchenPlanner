import { Polygon } from './Polygon';
import { UnitSize } from './PolygonFactory';

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

    public push(polygon: Polygon, fillColour: string, borderColour: string, unit: UnitSize): void {
        this.polygons.push(polygon);
        this.polygonFillColours.push(fillColour);
        this.polygonBorderColours.push(borderColour);
        this.unitsCreated.push(unit);
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
}
