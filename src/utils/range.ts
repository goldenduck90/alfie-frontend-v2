export function range(start: number, stop?: number, step?: number): number[] {
  if (typeof stop == "undefined") {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == "undefined") {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export function rangeByIndexAmount(range: number[], amountWanted: number) {
  const n = Math.floor(range.length / (amountWanted - 1));

  let result = [range[0]];
  let temp = range[0];

  for (let i = 1; i < amountWanted - 1; i++) {
    result.push(temp + n);

    temp += n;
  }
  result.push(range[range.length - 1]);
  return result;
}

export function makeArrayWithRange(
  start: number,
  end: number,
  amount: number = 4
) {
  let array = [];
  const step: number = (end - start) / amount;

  for (let i = 0; i < amount; i++) {
    array.push(start + step * i);
  }
  array.push(end);
  return array;
}
