export function convertInchesToFeetInches(inches: number) {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return feet + "ft " + remainingInches + "in";
}
