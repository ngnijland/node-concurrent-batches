function task(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 5000 + 1));
  });
}

const list = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
];

async function executeTasksConcurrently(
  list: number[],
  concurrencyLimit: number = 10
) {
  let activeTasks: Promise<void>[] = [];

  for (const item of list) {
    if (activeTasks.length >= concurrencyLimit) {
      await Promise.race(activeTasks);
    }

    console.log(`Start task: ${item}`);
    const activeTask = task()
      .then(() => {
        activeTasks.splice(activeTasks.indexOf(activeTask), 1);
        console.log(`End task: ${item}`);
      })
      .catch(() => {
        activeTasks.splice(activeTasks.indexOf(activeTask), 1);
        console.log(`End task: ${item}`);
      });
    activeTasks.push(activeTask);
  }
}

console.log("Application start");
executeTasksConcurrently(list);
