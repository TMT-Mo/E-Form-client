import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
  styled as muiStyled,
  Stack,
  Container,
  TooltipProps,
} from "@mui/material";
import logo from "assets/logo-dark.svg";
import logoShort from "assets/logo-short.svg";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Account } from "pages/system/account";
import { CreateAccount } from "pages/system/account/create-account";
import ChangePassword from "pages/change-password";
import AwaitSigning from "pages/Document/await-signing";
import PersonalDoc from "pages/Document/personal";
import SharedDoc from "pages/Document/shared";
import { MyAccount } from "pages/my-account";
import NewTemplates from "pages/Template/new-templates";
import TemplateHistory from "pages/Template/template-history";
import { clearDocuments } from "slices/document";
import { clearFilter } from "slices/filter";
import { setLocation } from "slices/location";
import { clearUserList } from "slices/system";
import { clearTemplates } from "slices/template";
import { helpers } from "utils";
import { LocationIndex, Permissions } from "utils/constants";
import { useDispatch, useSelector } from "hooks";
import History from "pages/Document/history";
import Template from "pages/Template/template";
import { System } from "pages/system";
import { RequiredPermission } from "components/RequiredPermission";
import { useTranslation } from "react-i18next";
import Avatar from "@mui/material/Avatar/Avatar";
import Fade from "@mui/material/Fade";
import {
  Pending,
  RecentActorsOutlined,
  ListAltOutlined,
  FolderSharedOutlined,
  AssignmentOutlined,
  HistoryEduOutlined,
  UploadFileOutlined,
  ManageAccountsOutlined,
  ManageHistoryOutlined,
  AccountCircleOutlined,
  DashboardOutlined,
  LineAxisOutlined,
  AccountBoxOutlined,
  HelpOutline,
} from "@mui/icons-material";
import TopBar from "./TopBar";
import { SignalR } from "signalR/signalR";
import AlertPopup from "components/AlertPopup";
import { AnalyticsDashboard } from "pages/analytics/dashboard";
import { AnalyticsActivities } from "pages/analytics/activities";
import Typography from "@mui/material/Typography";

const {
  TEMPLATE,
  ACCOUNT,
  AWAIT_SIGNING,
  SYSTEM,
  PERSONAL,
  NEW_TEMPLATE,
  SHARED,
  CHANGE_PASSWORD,
  DOCUMENT_HISTORY,
  TEMPLATE_HISTORY,
  ADD_ACCOUNT,
  MY_ACCOUNT,
  ACTIVITIES,
  DASHBOARD,
} = LocationIndex;

const {
  VIEW_AWAIT_SIGNING_DOCUMENT,
  VIEW_DOCUMENT_HISTORY,
  VIEW_NEW_TEMPLATE,
  VIEW_PERSONAL_DOCUMENT,
  VIEW_SHARED_DOCUMENT,
  VIEW_TEMPLATE_HISTORY,
  VIEW_TEMPLATE_MANAGEMENT,
  ANALYTICS_ACTIVITIES_MANAGEMENT,
  ANALYTICS_DASHBOARD_MANAGEMENT,
  SYSTEM_MANAGEMENT,
} = Permissions;

const drawerWidth = 300;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(13)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(14)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 10,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#EBF1F9",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    background: "#000",
    position: "relative",
    padding: "10px 20px",
    "::-webkit-scrollbar": {
      width: "3px",
    },
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DividerStyled = styled(Divider)({
  margin: "30px 0",
  background: "#fff",
});

export default function AfterLogin() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { locationIndex } = useSelector((state) => state.location);
  const location = helpers.getLocation();
  const { userInfo } = useSelector((state) => state.auth);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: `${!open ? "none" : "flex"} `,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 0.5),
    height: "fit-content",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const ListTextStyled = styled(ListItemText)({
    display: open ? "block" : "none",
    whiteSpace: "nowrap",
    fontSize: "16px !important",
  });

  const ListItemIconStyled = styled(ListItemIcon)({
    display: "flex",
    justifyContent: open ? "flex-start" : "center",
  });

  const StyledTooltip = muiStyled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))`
    & .MuiTooltip-tooltip {
      padding: 10px;
      font-size: 14px;
      background: #fff;
      color: #000;
      display: ${open && "none"};
      translate: 5px;
      filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    }
    & .MuiTooltip-tooltip:hover {
      background: #387AFF;
      color: #fff;
      cursor: pointer;
    }
  `;

  const StyledListBtn = styled(ListItemButton)({
    borderRadius: "15px",
    height: "48px",
    display: "flex",
    // justifyContent: "center",
    minHeight: 48,
    maxWidth: !open ? "50px" : "100%",
    justifyContent: "center",
    fontSize: "13px",
    px: 2.5,
    color: "#fff",
    "&.Mui-selected": {
      // backgroundColor: "#e6eeff",
      // color: "#578AFF",
      // backgroundColor: "#535c68",
      backgroundColor: "#2f3542",
    },
    ":hover": {
      backgroundColor: "#57606f",
    },
  });

  const StyledList = styled(List)({
    alignItems: "center",
    display: !open ? "flex" : "initial",
    flexDirection: "column",
    width: "100%",
  });

  const switchTab = () => {
    switch (locationIndex) {
      case SYSTEM:
        return <System />;
      case NEW_TEMPLATE:
        return <NewTemplates />;
      case ACCOUNT:
        return <Account />;
      case ADD_ACCOUNT:
        return <CreateAccount />;
      case TEMPLATE:
        return <Template />;
      case TEMPLATE_HISTORY:
        return <TemplateHistory />;
      case AWAIT_SIGNING:
        return <AwaitSigning />;
      case PERSONAL:
        return <PersonalDoc />;
      case SHARED:
        return <SharedDoc />;
      case CHANGE_PASSWORD:
        return <ChangePassword />;
      case DOCUMENT_HISTORY:
        return <History />;
      case MY_ACCOUNT:
        return <MyAccount />;
      case DASHBOARD:
        return <AnalyticsDashboard />;
      case ACTIVITIES:
        return <AnalyticsActivities />;
      default:
        return <></>;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    dispatch(
      setLocation({
        locationIndex: index,
      })
    );
    // innerWidth <= DeviceWidth.IPAD_WIDTH && dispatch(toggleSideBar());
    if (locationIndex !== index) {
      dispatch(clearTemplates());
      dispatch(clearDocuments());
      dispatch(clearFilter());
      dispatch(clearUserList());
    }
  };

  React.useEffect(() => {
    dispatch(
      setLocation({
        locationIndex:
          location !== undefined ? location : LocationIndex.TEMPLATE,
      })
    );
  }, [dispatch, location]);

  React.useEffect(() => {
    return () => {
      dispatch(clearDocuments());
      dispatch(clearTemplates());
      dispatch(clearUserList());
      dispatch(clearFilter());
    };
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0}>
        <TopBar handleDrawerOpen={handleDrawerOpen} isOpen={open} />
      </AppBar>
      <Drawer variant="permanent" open={open} elevation={3}>
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              ...(!open && { display: "none" }),
              height: "fit-content",
            }}
          >
            <ChevronLeftIcon className="fill-white" />
          </IconButton>
        </DrawerHeader>
        <Stack spacing={3} alignItems="center" padding="20px 0">
          <img src={open ? logo : logoShort} alt="" />
          <Avatar
            sx={{
              width: 50,
              height: 50,
            }}
            alt="Cindy Baker"
            src={userInfo?.avatar}
          />
          {open && (
            <Stack spacing={1} textAlign='center'>
              <Typography maxWidth='200px' color='#fff' whiteSpace='normal' fontWeight='bold'>{userInfo?.userName}</Typography>
              <Typography maxWidth='200px' color='#fff' whiteSpace='normal' fontWeight='bold'>
                {userInfo?.roleName!} {t('from')} {userInfo?.departmentName!}
              </Typography>
            </Stack>
          )}
        </Stack>
        <DividerStyled />
        <StyledList aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">{t("Account")}</h5>

          <Stack spacing={0.5}>
            <StyledListBtn
              selected={locationIndex === MY_ACCOUNT}
              onClick={(event) => handleListItemClick(event, MY_ACCOUNT)}
            >
              <StyledTooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title={t("My Profile")}
                placement="right"
              >
                <ListItemIconStyled>
                  <AccountBoxOutlined className="fill-white" />
                </ListItemIconStyled>
              </StyledTooltip>
              <ListTextStyled primary={t("My Profile")} />
            </StyledListBtn>
          </Stack>
        </StyledList>
            <RequiredPermission permission={ANALYTICS_DASHBOARD_MANAGEMENT}>
        <StyledList aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">{t("Analytics")}</h5>

          <Stack spacing={0.5}>
              <StyledListBtn
                selected={locationIndex === DASHBOARD}
                onClick={(event) => handleListItemClick(event, DASHBOARD)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("Dashboard")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <DashboardOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("Dashboard")} />
              </StyledListBtn>
            
            {/* <RequiredPermission permission={ANALYTICS_ACTIVITIES_MANAGEMENT}>
              <StyledListBtn
                selected={locationIndex === ACTIVITIES}
                onClick={(event) => handleListItemClick(event, ACTIVITIES)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("Activities")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <LineAxisOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("Activities")} />
              </StyledListBtn>
            </RequiredPermission> */}
          </Stack>
        </StyledList>
        </RequiredPermission>
        <RequiredPermission permission={SYSTEM_MANAGEMENT}>
          <StyledList aria-label="main mailbox folders">
            <h5 className="pb-3 text-blue-config">{t("System")}</h5>

            <Stack spacing={0.5}>
              <StyledListBtn
                selected={locationIndex === SYSTEM}
                onClick={(event) => handleListItemClick(event, SYSTEM)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("System")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <RecentActorsOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("System")} />
              </StyledListBtn>
            </Stack>
          </StyledList>
        </RequiredPermission>
        <StyledList aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">{t("Template")}</h5>

          <Stack spacing={0.5}>
            <RequiredPermission permission={VIEW_NEW_TEMPLATE}>
              <StyledListBtn
                selected={locationIndex === NEW_TEMPLATE}
                onClick={(event) => handleListItemClick(event, NEW_TEMPLATE)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("Unapproved")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <Pending className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("Unapproved")} />
              </StyledListBtn>
            </RequiredPermission>

            <RequiredPermission permission={VIEW_TEMPLATE_MANAGEMENT}>
              <StyledListBtn
                selected={locationIndex === TEMPLATE}
                onClick={(event) => handleListItemClick(event, TEMPLATE)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("Template")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <UploadFileOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("Template")} />
              </StyledListBtn>
            </RequiredPermission>

            <RequiredPermission permission={VIEW_TEMPLATE_HISTORY}>
              <StyledListBtn
                selected={locationIndex === TEMPLATE_HISTORY}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("History")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <ManageHistoryOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("History")} />
              </StyledListBtn>
            </RequiredPermission>
          </Stack>
        </StyledList>
        <StyledList aria-label="main mailbox folders">
          <h5 className="pb-3 text-blue-config">{t("Document")}</h5>

          <Stack spacing={0.5}>
            <RequiredPermission permission={VIEW_AWAIT_SIGNING_DOCUMENT}>
              <StyledListBtn
                selected={locationIndex === AWAIT_SIGNING}
                onClick={(event) => handleListItemClick(event, AWAIT_SIGNING)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("Await Signing")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <AssignmentOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("Await Signing")} />
              </StyledListBtn>
            </RequiredPermission>
            <RequiredPermission permission={VIEW_PERSONAL_DOCUMENT}>
              <StyledListBtn
                selected={locationIndex === PERSONAL}
                onClick={(event) => handleListItemClick(event, PERSONAL)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("Personal")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <ListAltOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("Personal")} />
              </StyledListBtn>
            </RequiredPermission>
            <RequiredPermission permission={VIEW_SHARED_DOCUMENT}>
              <StyledListBtn
                selected={locationIndex === SHARED}
                onClick={(event) => handleListItemClick(event, SHARED)}
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("Shared")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <FolderSharedOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("Shared")} />
              </StyledListBtn>
            </RequiredPermission>
            <RequiredPermission permission={VIEW_DOCUMENT_HISTORY}>
              <StyledListBtn
                selected={locationIndex === DOCUMENT_HISTORY}
                onClick={(event) =>
                  handleListItemClick(event, DOCUMENT_HISTORY)
                }
              >
                <StyledTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  title={t("History")}
                  placement="right"
                >
                  <ListItemIconStyled>
                    <HistoryEduOutlined className="fill-white" />
                  </ListItemIconStyled>
                </StyledTooltip>
                <ListTextStyled primary={t("History")} />
              </StyledListBtn>
            </RequiredPermission>
          </Stack>
        </StyledList>
        <DividerStyled />

        <Stack direction="row" alignItems="center" justifyContent="center">
          {open && <Typography sx={{ color: "#fff" }}>{t('Help')}</Typography>}
          <IconButton type="button">
            <a href="https://vanlangunivn.sharepoint.com/:w:/s/CapstoneProjectK25_CAP/ETZmXz713bJNgLkka9waUfoB9yLewvZ6_tilGfe2rTz7BQ?e=6qwgLX" rel="noreferrer" target="_blank"><HelpOutline className="fill-white" /></a>
          </IconButton>
        </Stack>

        {/* <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-slate-800 to-stone-500"></div> */}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#EBF1F9",
          // height: 100,
          mt: 5,
          minHeight: "100vh",
          display: "flex",
          zIndex: 0,
        }}
      >
        <DrawerHeader />
        <Container maxWidth="xl">{switchTab()}</Container>
      </Box>
      <AlertPopup
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
      />
      <SignalR />
    </Box>
  );
}
