export const PORT = 1337;

export function log(side, ...message) {
  const date = new Date();
  const timeHHmmSSStr = date.getHours().toString()
    .padStart(2, "0")
  + ":" + date.getMinutes().toString()
    .padStart(2, "0")
  + ":" + date.getSeconds().toString()
    .padStart(2, "0");

  console.log(timeHHmmSSStr, `[${side}]`, ...message);
}