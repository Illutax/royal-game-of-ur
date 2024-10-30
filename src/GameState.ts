import {RollResult} from "./RollResult.js";

export class GameState {
    private _rolling = false;
    private results = [] as Array<RollResult>
    private _currentResult: RollResult | null = null;

    get currentResult(): RollResult | null {
        return this._currentResult;
    }

    get rolling(): boolean {
        return this._rolling;
    }

    set rolling(value: boolean) {
        this._rolling = value;
    }

    addResult(rollResult: RollResult) {
        this.results.unshift(rollResult)
        this._currentResult = rollResult;
    }

    resetCurrentResult() {
        this._currentResult = null;
    }
}