import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useUser from "../Core/CustomHooks/useUser";

const options = ["Change Avatar", "Logout"];

export default function Dots() {
  const { handleSelectOption } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    handleSelectOption(e);
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
