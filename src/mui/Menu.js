import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import VideocamIcon from "@mui/icons-material/Videocam";
import PanoramaIcon from "@mui/icons-material/Panorama";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import LayersIcon from "@mui/icons-material/Layers";
import StorefrontIcon from "@mui/icons-material/Storefront";

const MenuComponent = () => {
  const menu = [
    {
      label: "Training Models",
      url: "#",
    },
    {
      label: "Dataset",
      url: "plot",
      icon: <ListAltIcon />,
    },
    {
      label: "House Prices",
      url: "remodel",
      icon: <HomeIcon />,
    },
    {},
    {
      label: "Computer Vision",
      url: "#",
    },
    {
      label: "Smart Camera",
      url: "camera",
      icon: <VideocamIcon />,
    },
    {
      label: "Read Images",
      url: "image",
      icon: <PanoramaIcon />,
    },
    {},
    {
      label: "Language NPL",
      url: "#",
    },
    {
      label: "Toxicity",
      url: "toxic",
      icon: <PanoramaIcon />,
    },
    {},
    {
      label: "Tensors",
      url: "#",
    },
    {
      label: "Multi-Layer",
      url: "multilayer",
      icon: <LayersIcon />,
    },
    {
      label: "2D Tensor",
      url: "tensor2d",
      icon: <LinearScaleIcon />,
    },
    {},
    {
      label: "Brain.js",
      url: "#",
    },
    {
      label: "Store Predict",
      url: "brainStore",
      icon: <StorefrontIcon />,
    },
  ];

  return (
    <>
      <List>
        {menu.map((row, index) => {
          return !row.url ? (
            <Divider key={index} />
          ) : (
            <Link
              key={index}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/ai/${row.url}`}
            >
              <ListItem button>
                {row.icon ? <ListItemIcon>{row.icon}</ListItemIcon> : ""}
                <ListItemText primary={row.label} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </>
  );
};
export default MenuComponent;
