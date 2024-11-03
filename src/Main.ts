import {GameState} from "./GameState.js";
import {Vec2} from "./Vec2.js";
import {Tetraeder} from "./Tetraeder.js";
import {RollResult} from "./RollResult.js";

export class Main {
    private gameState: GameState;
    private canvas: HTMLCanvasElement;
    private rollBtn: HTMLButtonElement;
    private resultSpan: HTMLSpanElement;
    private allResults: HTMLDivElement;

    constructor() {
        const roll = document.getElementById('roll') as HTMLButtonElement;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.resultSpan = document.getElementById("result") as HTMLSpanElement;
        this.allResults = document.getElementById("allResults") as HTMLDivElement;
        this.canvas.tabIndex = 0; // make canvas focus-able
        this.gameState = new GameState();
        this.rollBtn = roll;
        this.render();
        roll.onclick = () => {
            this.roll();
        };
    }

    roll() {
        if (this.gameState.rolling) {
            return;
        }
        this.rollBtn.disabled = true;
        this.gameState.rolling = true;
        this.addLastResult();
        this.gameState.resetCurrentResult();
        this.render();
        setTimeout(() => this.reset(), 500);
    }

    reset() {
        let rollResult = new RollResult(this.getRandomTetraeder(), this.getRandomTetraeder(), this.getRandomTetraeder());
        console.log("Roll...", rollResult.getPoints());
        this.resultSpan.innerText = `${rollResult.getPoints()}`;
        this.gameState.addResult(rollResult);
        this.render();
        this.rollBtn.disabled = false;
        this.gameState.rolling = false;
    }

    addLastResult() {
        if (this.gameState.currentResult == null) return;

        const nextResult = document.createElement('li');
        nextResult.classList.add(this.gameState.odd ? "odd" : "even")
        nextResult.innerText = `${this.gameState.currentResult?.getPoints() ?? ""}`;
        this.allResults.prepend(nextResult);
    }

    getRandomTetraeder() {
        return Tetraeder.ALL[Math.floor(Math.random() * 4)];
    }

    render(): void {
        const ctx = this.canvas.getContext("2d", {alpha: false})!;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const rollResult = this.gameState.currentResult;

        const size = Vec2.of(75, 40);
        this.drawTriangle(ctx, 0, size, rollResult);
        this.drawTriangle(ctx, 1, size, rollResult);
        this.drawTriangle(ctx, 2, size, rollResult);
    }

    private drawTriangle(ctx: CanvasRenderingContext2D, number: number, size: Vec2, rollResult: RollResult | null = null) {
        const xOffset = Vec2.of(125, 0).mult(number);
        const offset = Vec2.of(125, 50).plus(xOffset);
        ctx.fillStyle = "#CCC";

        ctx.beginPath();
        ctx.moveTo(offset.x, offset.y - size.y / 2);
        ctx.lineTo(offset.x + size.x / 2, offset.y + size.y / 2);
        ctx.lineTo(offset.x - size.x / 2, offset.y + size.y / 2);
        ctx.fill();

        if (rollResult != null) {
            const tetraeder = rollResult.get(number);

            // up
            if (tetraeder === Tetraeder.i1 || tetraeder === Tetraeder.i2) {
                ctx.fillStyle = "#F00";
                ctx.beginPath();
                ctx.moveTo(offset.x, offset.y - size.y / 2);
                ctx.lineTo(offset.x + 15, offset.y - size.y / 2 + 15);
                ctx.lineTo(offset.x - 15, offset.y - size.y / 2 + 15);
                ctx.fill();
            }
            // right
            if (tetraeder === Tetraeder.i2 || tetraeder === Tetraeder.i3) {
                ctx.fillStyle = "#F00";
                ctx.beginPath();
                ctx.lineTo(offset.x + size.x / 2 - 15, offset.y + size.y / 2 - 15);
                ctx.lineTo(offset.x + size.x / 2, offset.y + size.y / 2);
                ctx.lineTo(offset.x + size.x / 2 - 22, offset.y + size.y / 2);
                ctx.fill();
            }
            // left
            if (tetraeder === Tetraeder.i3 || tetraeder === Tetraeder.i4) {
                ctx.fillStyle = "#F00";
                ctx.beginPath();
                ctx.lineTo(offset.x - size.x / 2 + 15, offset.y + size.y / 2 - 15);
                ctx.lineTo(offset.x - size.x / 2, offset.y + size.y / 2);
                ctx.lineTo(offset.x - size.x / 2 + 22, offset.y + size.y / 2);
                ctx.fill();
            }
        }
    }
}

new Main();