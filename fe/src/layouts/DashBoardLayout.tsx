import * as React from "react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { useTranslation } from "react-i18next";
import { DashboardLayout, SidebarFooterProps } from "@toolpad/core/DashboardLayout";
import { Account, AccountPreview, AccountPreviewProps } from "@toolpad/core/Account";
import { dashboardTheme } from "../theme";
import { useUser } from "../hooks/useUser";
import { useUserContext } from "../context/UserContext";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import MessageIcon from "@mui/icons-material/Message";
import type { Navigation, Router } from "@toolpad/core/AppProvider";

const NAVIGATION: Navigation = [
  {
    segment: "messages",
    title: "Messages",
    icon: <MessageIcon />,
  },
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
            segment: "vi",
            title: "VI",
          },
          {
            segment: "en",
            title: "EN",
          },
        ],
      },
    ],
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

const DashBoardLayout = () => {
  const { t, i18n } = useTranslation();
  const [pathname, setPathname] = React.useState("/dashboard");
  const { user } = useUser();
  const { setUser: setUserContext } = useUserContext();

  useEffect(() => {
    if (user) {
      setUserContext(user);
    }
  }, [user]);

  const sessionUser = user
    ? {
        id: String(user.id),
        email: user.email,
        image: user.avatar,
        name: null,
      }
    : undefined;

  const navigate = useNavigate();

  const translateNavigation = (nav: Navigation): Navigation => {
    return nav.map((item) => {
      const newItem = {
        ...item,
        title: t((item as any).title),
      };

      if ((item as any).children) {
        (newItem as any).children = translateNavigation((item as any).children);
      }

      return newItem;
    });
  };

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path));

        if (String(path).includes("/vi")) {
          i18n.changeLanguage("vi");
        } else if (String(path).includes("/en")) {
          i18n.changeLanguage("en");
        } else {
          navigate(path);
        }
      },
    };
  }, [pathname]);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {},
      signOut: () => {
        navigate("/login");
        localStorage.removeItem("token");
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={translateNavigation(NAVIGATION)}
      router={router}
      theme={dashboardTheme}
      {...(user ? { authentication, session: { user: sessionUser } } : {})}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
        sidebarExpandedWidth={"200px"}
      >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashBoardLayout;
