import { GridRenderCellParams } from "@mui/x-data-grid";

interface Creator {
  userName: string;
  signature: string;
  status: number;
  roleName: string;
}

export const CreatedByCell = (props: GridRenderCellParams<Date>) => {
  const { value } = props;

  return <div>{value && (value as unknown as Creator).userName}</div>;
};
