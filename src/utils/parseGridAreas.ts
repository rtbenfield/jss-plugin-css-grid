export interface GridAreas {
  [name: string]: {
    column: number;
    columnSpan: number;
    row: number;
    rowSpan: number;
  };
}

export function parseGridAreas(value: string): GridAreas | null {
  const gridAreaRegexp = /"(.+?)"/g;
  const matches: string[] = [];
  let match = gridAreaRegexp.exec(value);
  while (match) {
    matches.push(match[1]);
    match = gridAreaRegexp.exec(value);
  }

  const gridArea = matches.reduce<GridAreas>((areas, row, rowIndex) => {
    return row.split(" ").reduce((a, areaName, columnIndex) => {
      if (areaName in a) {
        // Area has already been added. Increment columnSpan and rowSpan based on direction
        const areaValues = a[areaName];
        if (columnIndex === areaValues.column - 1) {
          areaValues.rowSpan++;
        } else if (rowIndex === areaValues.row - 1) {
          areaValues.columnSpan++;
        }
      } else {
        a[areaName] = {
          column: columnIndex + 1,
          columnSpan: 1,
          row: rowIndex + 1,
          rowSpan: 1,
        };
      }
      return a;
    }, areas);
  }, {});

  return gridArea;
}
