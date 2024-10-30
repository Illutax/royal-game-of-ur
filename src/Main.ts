import {GameState} from "./GameState.js";
import {Vec2} from "./Vec2.js";
import {Tetraeder} from "./Tetraeder.js";
import {RollResult} from "./RollResult.js";

export class Main {
    private gameState: GameState;
    private canvas: HTMLCanvasElement;
    private rollBtn: HTMLButtonElement;
    private resultSpan: HTMLSpanElement;

    constructor() {
        const roll = document.getElementById('roll') as HTMLButtonElement;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.resultSpan = document.getElementById("result") as HTMLSpanElement;
        this.canvas.tabIndex = 0; // make canvas focus-able
        this.gameState = new GameState();
        this.render();
        roll.onclick = () => {
            this.roll();
        };
        this.rollBtn = roll;
    }

    roll() {
        if (this.gameState.rolling) {
            return;
        }
        this.rollBtn.disabled = true;
        this.gameState.rolling = true;
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

        if (rollResult == null) {
            ctx.fillStyle = "#CCC";
        } else {
            let tetraeder = rollResult.get(number);
            ctx.fillStyle = tetraeder.value === 1 ? "#0F0" : "#F00";
        }

        ctx.beginPath();
        ctx.moveTo(offset.x, offset.y - size.y / 2);
        ctx.lineTo(offset.x + size.x / 2, offset.y + size.y / 2);
        ctx.lineTo(offset.x - size.x / 2, offset.y + size.y / 2);
        ctx.fill();
    }
}

new Main();