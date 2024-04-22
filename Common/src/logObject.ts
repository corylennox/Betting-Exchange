import { stringify } from "./stringify";

export function logObject(obj: any): void {
  console.log(stringify(obj));
}
