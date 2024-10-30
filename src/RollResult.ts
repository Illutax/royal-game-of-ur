import {Tetraeder} from "./Tetraeder.js";

export class RollResult {
    private readonly _t1: Tetraeder;
    private readonly _t2: Tetraeder;
    private readonly _t3: Tetraeder;

    constructor(t1: Tetraeder, t2: Tetraeder, t3: Tetraeder) {
        this._t1 = t1;
        this._t2 = t2;
        this._t3 = t3;
    }

    get(index: number) {
        switch (index) {
            case 0: return this.t1;
            case 1: return this.t2;
            case 2: return this.t3;
            default: throw new Error(`Unknown index: ${index}`);
        }
    }

    get t1(): Tetraeder {
        return this._t1;
    }

    get t2(): Tetraeder {
        return this._t2;
    }

    get t3(): Tetraeder {
        return this._t3;
    }

    getPoints() {
        const sum = this.t1.value + this.t2.value + this.t3.value;
        switch (sum) {
            case 0:
                return 4;
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 5;
            default:
                throw new Error(`Unknown result: ${sum}`);
        }
    }
}