export function removeEmptyPropertyObject(obj: any) {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === "" ||
      obj[propName].length === 0
    ) {
      delete obj[propName];
    }
  }
  return obj;
}
