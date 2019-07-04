export interface GridPosition {
  value?: string;
  span?: string;
}

export function parseGridPosition(value: string): GridPosition | null {
  value = value.trim();
  if (/^[0-9]+$/.test(value)) {
    return {
      value: value,
    };
  } else if (/^span\s+([0-9])+$/.test(value)) {
    return {
      span: value.replace(/^span\s+/, ""),
    };
  } else if (/^[0-9]+\s*\/\s*[0-9]+$/.test(value)) {
    const values = value.split("/").map(x => Number(x.trim()));
    return {
      span: (values[1] - values[0]).toString(),
      value: values[0].toString(),
    };
  } else if (/^span\s+[0-9]+\s*\/\s*[0-9]+$/.test(value)) {
    const values = value
      .split("/")
      .map(x => Number(x.replace(/^span\s+/, "").trim()));
    return {
      span: values[0].toString(),
      value: (values[1] - values[0]).toString(),
    };
  } else {
    return null;
  }
}
