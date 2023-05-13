import { SxProps } from "@mui/material";

export interface PieChartProps {
  title: string;
  value: number;
  series: Array<number>;
  colors: Array<string>;
  padding?: number;
  sx?: SxProps;
}
