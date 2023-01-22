import React, { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PerosonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { useAlert, UseAlert } from "react-alert";
import "./header.css";

const UserOptions = ({ user }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function profile() {
    navigate("/profile");
  }
  function cart() {
    navigate("/cart");
  }

  function logOut() {
    dispatch(logout());
    alert.success("Logged out Successfully");
  }

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.profile_pic.url ?? "/profile.png"}
            alt="profile"
          />
        }
        direction="down"
      >
        {user.role == "admin" ? (
          <SpeedDialAction
            icon={<DashboardIcon />}
            tooltipTitle="Dashboard"
            onClick={dashboard}
          />
        ) : (
          <div></div>
        )}

        <SpeedDialAction
          icon={<ListAltIcon />}
          tooltipTitle="Orders"
          onClick={orders}
        />
        <SpeedDialAction
          icon={<PerosonIcon />}
          tooltipTitle="Profile"
          onClick={profile}
        />
        <SpeedDialAction
          icon={
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          }
          tooltipTitle={`Cart ${cartItems.length}`}
          onClick={cart}
        />
        <SpeedDialAction
          icon={<ExitToAppIcon />}
          tooltipTitle="Logout"
          onClick={logOut}
        />
      </SpeedDial>
    </>
  );
};

export default UserOptions;
