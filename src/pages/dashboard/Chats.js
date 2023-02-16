import React from "react";
import {
  Box,
  IconButton,
  Typography,
  InputBase,
  Button,
  Divider,
  Avatar,
  Badge,
} from "@mui/material";
import { Stack } from "@mui/system";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
  const theme = useTheme();

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        borderRadius: 1,
        background:
          theme?.palette?.mode === "light"
            ? "#fff"
            : theme?.palette?.background?.default,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {/* Avatar Icon */}
        <Stack direction={"row"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          {/* Message Content */}
          <Stack spacing={0.3}>
            <Typography variant={"subtitle2"}>{name}</Typography>
            <Typography variant={"caption"}>{msg}</Typography>
          </Stack>
        </Stack>

        {/* Timing and Incomming Messages */}
        <Stack spacing={2} direction={"column"} alignItems={"center"}>
          <Typography variant={"caption"} sx={{ fontWeight: 600 }}>
            {time}
          </Typography>
          <Badge color={"primary"} badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

const Chats = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: 320,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f8faff"
            : theme?.palette?.background?.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        {/* Heading and Stories */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant={"h5"}>Chats</Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>

        {/* Search Input Field */}
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Seatch..." />
          </Search>
        </Stack>

        {/* Archive button and their icon */}
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>
          {/* Divider */}
          <Divider />
        </Stack>

        {/* User's Chats */}
        <Stack
          direction={"column"}
          spacing={2}
          sx={{ flexGrow: 1, overflow: "auto", height: "100%" }}
        >
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            {/* Pinned Chats */}
            <Stack spacing={2.4}>
              <Typography variant={"subtitle2"} sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList?.filter((e) => e?.pinned).map((e) => (
                <ChatElement {...e} />
              ))}
            </Stack>

            {/* All Chats */}
            <Stack spacing={2.4}>
              <Typography variant={"subtitle2"} sx={{ color: "#676767" }}>
                All Chats
              </Typography>
              {ChatList?.filter((e) => !e?.pinned).map((e) => (
                <ChatElement {...e} />
              ))}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
