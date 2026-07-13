import {
  ChevronLeftRounded,
  ChevronRightRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

import navigation from "../constants/navigation";
import type { NavigationItem } from "../types/navigation";

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 88;

interface SidebarProps {
  onNavigate?: () => void;
}

function Sidebar({ onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    core: true,
    pages: true,
    security: true,
  });
  const location = useLocation();

  const renderNavItem = (item: NavigationItem, level = 0) => {
    const Icon = item.icon;
    const hasChildren = Boolean(item.children?.length);
    const isActive = item.path ? location.pathname === item.path : false;
    const isExpanded = item.groupKey ? expandedGroups[item.groupKey] ?? true : true;

    if (hasChildren) {
      return (
        <Box key={item.label}>
          <ListItemButton
            onClick={() => {
              if (item.groupKey) {
                setExpandedGroups((current) => ({ ...current, [item.groupKey!]: !current[item.groupKey!] }));
              }
            }}
            sx={{
              mx: 1.25,
              mb: 0.8,
              borderRadius: 3,
              minHeight: 48,
              color: "text.primary",
              pl: collapsed ? 1.5 : 1.8 + level * 0.8,
              pr: collapsed ? 1.2 : 1.4,
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            {Icon && (
              <ListItemIcon sx={{ color: "inherit", minWidth: collapsed ? 0 : 38, justifyContent: "center" }}>
                <Icon />
              </ListItemIcon>
            )}
            {!collapsed && (
              <>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                {isExpanded ? <ExpandLessRounded fontSize="small" /> : <ExpandMoreRounded fontSize="small" />}
              </>
            )}
          </ListItemButton>
          {!collapsed && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 0.8 }}>
                {item.children?.map((child) => renderNavItem(child, level + 1))}
              </List>
            </Collapse>
          )}
        </Box>
      );
    }

    if (!item.path) {
      return null;
    }

    return (
      <Tooltip key={item.path} title={collapsed ? item.label : ""} placement="right">
        <ListItemButton
          component={NavLink}
          to={item.path}
          onClick={onNavigate}
          sx={{
            mx: 1.25,
            mb: 0.7,
            borderRadius: 3,
            minHeight: 46,
            color: "text.secondary",
            pl: collapsed ? 1.5 : 1.8 + level * 0.8,
            pr: collapsed ? 1.2 : 1.4,
            "&.active": {
              bgcolor: "rgba(79,93,255,0.2)",
              color: "primary.main",
              boxShadow: "inset 0 0 0 1px rgba(79,93,255,0.3)",
            },
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          {Icon && (
            <ListItemIcon sx={{ color: isActive ? "primary.main" : "inherit", minWidth: collapsed ? 0 : 38, justifyContent: "center" }}>
              <Icon />
            </ListItemIcon>
          )}
          {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} />}
        </ListItemButton>
      </Tooltip>
    );
  };

  return (
    <Box
      sx={(theme) => ({
        width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        transition: "all .25s ease",
        bgcolor: theme.palette.mode === "dark" ? "linear-gradient(180deg, rgba(16,21,28,0.96) 0%, rgba(11,15,20,0.96) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,247,255,0.96) 100%)",
        color: theme.palette.mode === "dark" ? "#E7EAF0" : "#0F172A",
        display: "flex",
        flexDirection: "column",
        borderRight: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,.08)" : "rgba(15,23,42,0.08)"}`,
        overflow: "hidden",
        boxShadow: theme.palette.mode === "dark" ? "12px 0 32px rgba(2, 6, 23, 0.28)" : "12px 0 32px rgba(15, 23, 42, 0.08)",
      })}
    >
      <Stack direction="row" alignItems="center" justifyContent={collapsed ? "center" : "space-between"} sx={{ p: 2.5 }}>
        {!collapsed && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", width: 46, height: 46, fontWeight: 700, boxShadow: "0 10px 24px rgba(79,93,255,0.24)" }}>
              NS
            </Avatar>
            <Box>
              <Typography fontWeight={700} fontSize={17}>
                Northstar Console
              </Typography>
              <Typography fontSize={12} color="text.secondary">
                Security operations hub
              </Typography>
            </Box>
          </Stack>
        )}

        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: "inherit" }}>
          {collapsed ? <ChevronRightRounded /> : <ChevronLeftRounded />}
        </IconButton>
      </Stack>

      <Divider sx={{ borderColor: "divider" }} />

      <Box sx={{ flex: 1, overflowY: "auto", py: 2 }}>
        <List>{navigation.map((item) => renderNavItem(item))}</List>
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      <Box sx={{ p: 2, textAlign: "center" }}>
        {!collapsed ? (
          <>
            <Typography fontWeight={600}>Northstar Suite</Typography>
            <Typography variant="caption" color="text.secondary">
              Version 1.0.0
            </Typography>
          </>
        ) : (
          <Typography fontWeight={700}>v1</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Sidebar;