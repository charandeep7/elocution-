import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Logo from "../../assets/Images/logo.ico";
import { Stack } from "@mui/system";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";

const Sidebar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      p={2}
      sx={{
        background: theme?.palette?.background?.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        height: "100vh",
        width: 100,
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        spacing={3}
        sx={{ width: "100%", height: "100%" }}
      >
        {/* Logo */}
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              background: theme?.palette?.primary?.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={Logo} alt={"Logo"} />
          </Box>

          {/* Nav_Links */}
          <Stack
            direction={"column"}
            spacing={3}
            alignItems={"center"}
            sx={{ width: "max-content" }}
          >
            {Nav_Buttons.map((e) =>
              e.index === selected ? (
                <Box
                  p={1}
                  sx={{
                    background: theme?.palette?.primary?.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    key={e.index}
                    sx={{ width: "max-content", color: "#fff" }}
                  >
                    {e.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={e.index}
                  sx={{
                    width: "max-content",
                    color:
                      theme?.palette?.mode === "Light"
                        ? "#000"
                        : theme?.palette?.text?.primary,
                  }}
                  onClick={() => setSelected(e.index)}
                >
                  {e.icon}
                </IconButton>
              )
            )}

            {/* Divider */}
            <Divider orientation={"horizontal"} width={48} />

            {/* Setting Icon */}
            {selected === 3 ? (
              <Box
                p={1}
                sx={{
                  background: theme?.palette?.primary?.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                sx={{
                  width: "max-content",
                  color:
                    theme?.palette?.mode === "Light"
                      ? "#000"
                      : theme?.palette?.text?.primary,
                }}
                onClick={() => setSelected(3)}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>

        {/* Switches && Avatar Icon */}
        <Stack spacing={4}>
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            onChange={() => onToggleMode()}
          />
          <Avatar
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            src={faker.image.avatar()}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((e) => (
                <MenuItem onClick={() => {}}>
                  <Stack
                    sx={{ width: 100 }}
                    direction={"row"}
                    alignItem={"center"}
                    justifyContent={"space-between"}
                  >
                    <span>{e.title}</span>
                    {e.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
