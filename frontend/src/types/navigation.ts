import { SvgIconComponent } from "@mui/icons-material";

export interface NavigationItem {
  label: string;
  path?: string;
  icon?: SvgIconComponent;
  groupKey?: string;
  children?: NavigationItem[];
}