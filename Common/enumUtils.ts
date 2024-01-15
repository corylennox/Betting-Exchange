export function enumToString(enumValue: any) {
  const keys = Object.keys(typeof enumValue).filter((key) =>
    isNaN(Number(key))
  );
  const key = keys.find((k) => (typeof enumValue as any)[k] === enumValue);
  return key || "Unknown";
}

export function enumToNumber(enumValue: any) {
  return enumValue as number;
}
