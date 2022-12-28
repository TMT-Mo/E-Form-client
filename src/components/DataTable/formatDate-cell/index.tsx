import { GridRenderCellParams } from "@mui/x-data-grid";

export const DateCell = (props: GridRenderCellParams<Date>) => {
    const { value } = props;
    
    const formatDate = new Date(value!).toLocaleDateString()
  
    return (
      <div>
        {formatDate}
      </div>
    );
  };