import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import MessageIcon from '@mui/icons-material/Message';
import { AppProvider } from "@toolpad/core/AppProvider";
import {
  DashboardLayout,
  SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";
import {
  Account,
  AccountPreview,
  AccountPreviewProps,
} from "@toolpad/core/Account";
import type { Navigation, Router, Session } from "@toolpad/core/AppProvider";
import { dashboardTheme } from "../theme";

const NAVIGATION: Navigation = [
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
    children: [
      {
        segment: "personal",
        title: "Personal",
        icon: <PersonIcon />,
      },
      {
        segment: "language",
        title: "Language",
        icon: <LanguageIcon />,
        children: [
          {
            segment: "vn",
            title: "VN",
          },
          {
            segment: "english",
            title: "English",
          },
        ],
      },
    ],
  },
  {
    segment: "messages",
    title: "Messages",
    icon: <MessageIcon />,
  },
];

const AccountSidebarPreview = (
  props: AccountPreviewProps & { mini: boolean }
) => {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
};

const createPreviewComponent = (mini: boolean) => {
  return (props: AccountPreviewProps) => (
    <AccountSidebarPreview {...props} mini={mini} />
  );
};

const SidebarFooterAccount = ({ mini }: SidebarFooterProps) => {
  const PreviewComponent = React.useMemo(
    () => createPreviewComponent(mini),
    [mini]
  );
  return (
    <Account
      slots={{
        preview: PreviewComponent,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: "left", vertical: "bottom" },
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(0,0,0,0.32)"
                  })`,
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
};

const demoSession = {
  user: {
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
};

const DashBoardLayout = () => {
  const [pathname, setPathname] = React.useState("/dashboard");
  const navigate = useNavigate();

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path)),
        navigate(path);
      }
    };
  }, [pathname]);

  const [session, setSession] = React.useState<Session | null>(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={dashboardTheme}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
        sidebarExpandedWidth={"200px"} 
      >
        <Outlet />
        {/* {pathname} */}
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashBoardLayout;
