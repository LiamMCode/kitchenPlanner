import { Dimensions } from 'app/canvas/Dimensions';
import axios from 'axios';

interface dataStuff {
    id: number;
    unitType: string;
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
        const units = this.cacheUnits(
            'https://symfony-sandbox.dev.wrenkitchens.com/data/units'
        );
        // const b = axios.get(
        //     'https://symfony-sandbox.dev.wrenkitchens.com/data/decor-end-panels'
        // );
        // const c = 'https://symfony-sandbox.dev.wrenkitchens.com/data/worktops';
    }

    private async cacheUnits(url: string) {
        // use axios to grab data and type data so that it conforms to some interface i.e 'dataStuff'
        // we then want to populate the <this.units> via this.units.set(key, value)
        const toCache = await axios.get(url).then((res) => {
            const dataCollected: dataStuff[] = res.data['hydra:member'];

            dataCollected.splice(20, dataCollected.length - 20);
            console.log(dataCollected);
        });
    }
}

export const unitsRepositoryService = new UnitsRepositoryService();
