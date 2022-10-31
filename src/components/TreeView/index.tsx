import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SvgIconProps } from "@mui/material/SvgIcon";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";

declare module "react" {
  interface CSSProperties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps> | null;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderRadius: theme.spacing(1),
    // paddingRight: theme.spacing(0),j
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: "#404952",
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "#fff",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: "10px"}}>
          {LabelIcon && (
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          )}
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          {/* <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography> */}
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
        marginBottom: '10px'
      }}
      {...other}
    />
  );
}

export default function EFormTreeView() {
  const [selectedNode, setSelectedNode] = useState('1')
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon sx={{ color: "#fff" }} />}
      defaultExpandIcon={<ArrowRightIcon sx={{ color: "#fff" }} />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 264, flexGrow: 1, minWidth: 200, overflowY: "auto" }}
      selected={selectedNode}
      onNodeSelect={(event: React.SyntheticEvent, nodeIds: string)=> setSelectedNode(nodeIds)}
    >
      <StyledTreeItem
        nodeId="1"
        labelText="Account"
        labelIcon={ManageAccountsOutlinedIcon}
        bgColor="#404952"
      >
        <StyledTreeItem
          nodeId="2"
          labelText="Department"
          labelInfo="2,294"
          labelIcon={null}
          color="#e3742f"
          bgColor="#404952"
        />
        <StyledTreeItem
          nodeId="3"
          labelText="Staff position"
          labelInfo="2,294"
          labelIcon={null}
          color="#e3742f"
          bgColor="#404952"
        />
        <StyledTreeItem
          nodeId="4"
          labelText="Account list"
          labelInfo="2,294"
          labelIcon={null}
          color="#e3742f"
          bgColor="#404952"
        />
      </StyledTreeItem>
      <StyledTreeItem
        nodeId="5"
        labelText="Template"
        labelIcon={BackupTableOutlinedIcon}
        bgColor="#404952"
      />
      <StyledTreeItem
        nodeId="6"
        labelText="Document"
        labelIcon={DescriptionOutlinedIcon}
        bgColor="#404952"
      >
        <StyledTreeItem
          nodeId="7"
          labelText="Await signing"
          labelInfo="2,294"
          labelIcon={null}
          color="#e3742f"
          bgColor="#404952"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Personal doc"
          labelInfo="2,294"
          labelIcon={null}
          color="#e3742f"
          bgColor="#404952"
        />
        <StyledTreeItem
          nodeId="9"
          labelText="Shared doc"
          labelInfo="2,294"
          labelIcon={null}
          color="#e3742f"
          bgColor="#404952"
        />
        <StyledTreeItem
          nodeId="10"
          labelText="History"
          labelInfo="2,294"
          labelIcon={null}
          color="#e3742f"
          bgColor="#404952"
        />
      </StyledTreeItem>
    </TreeView>
  );
}
