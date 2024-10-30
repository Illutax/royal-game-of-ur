export class Tetraeder {
    private readonly _i: number;

    public static readonly i1 = new Tetraeder(0);
    public static readonly i2 = new Tetraeder(0);
    public static readonly i3 = new Tetraeder(1);
    public static readonly i4 = new Tetraeder(1);

    public static readonly ALL = [Tetraeder.i1, Tetraeder.i2, Tetraeder.i3, Tetraeder.i4];

    private constructor(i: number) {
        this._i = i;
    }


    get value(): number {
        return this._i;
    }
}