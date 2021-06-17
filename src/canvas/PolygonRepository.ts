import { Polygon } from './Polygon';

export class PolygonRepository {
    private polygons: Polygon[] = [];

    public findAll(): Polygon[] {
        return this.polygons;
    }

    public push(polygon: Polygon): void {
        this.polygons.push(polygon);
    }
}
