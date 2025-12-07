import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppShell,
  NavLink,
  Group,
  Text,
  Avatar,
  Menu,
  ActionIcon,
  useMantineColorScheme,
  Box,
  Divider,
  Badge,
} from '@mantine/core';
import {
  IconDashboard,
  IconKey,
  IconChartBar,
  IconCreditCard,
  IconUser,
  IconSettings,
  IconLogout,
  IconSun,
  IconMoon,
  IconChevronRight,
  IconReceipt,
  IconRocket,
} from '@tabler/icons-react';
import { useAuthStore } from '@/store/authStore';
import Logo from '../common/Logo';

const navItems = [
  { icon: IconDashboard, label: 'Overview', path: '/dashboard' },
  { icon: IconKey, label: 'API Keys', path: '/dashboard/api-keys' },
  { icon: IconChartBar, label: 'Statistics', path: '/dashboard/statistics' },
  { icon: IconCreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: IconReceipt, label: 'Transactions', path: '/dashboard/transactions' },
  { icon: IconRocket, label: 'Subscription', path: '/dashboard/subscription' },
  { icon: IconUser, label: 'Profile', path: '/dashboard/profile' },
  { icon: IconSettings, label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppShell
      navbar={{
        width: collapsed ? 80 : 260,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <AppShell.Navbar p="md" style={{ transition: 'width 0.2s ease' }}>
        <AppShell.Section>
          <Group justify="space-between" mb="xl">
            {!collapsed && (
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo size="sm" />
              </Link>
            )}
            <ActionIcon
              variant="subtle"
              onClick={() => setCollapsed((c) => !c)}
              size="lg"
            >
              <IconChevronRight
                size={18}
                style={{
                  transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s',
                }}
              />
            </ActionIcon>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              component={Link}
              to={item.path}
              label={!collapsed && item.label}
              leftSection={<item.icon size={20} />}
              active={location.pathname === item.path}
              style={{ borderRadius: 8, marginBottom: 4 }}
            />
          ))}
        </AppShell.Section>

        <AppShell.Section>
          <Divider my="sm" />

          {/* Plan Badge */}
          {!collapsed && (
            <Box
              p="md"
              mb="sm"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                borderRadius: 8,
                border: '1px solid rgba(34, 211, 238, 0.2)',
              }}
            >
              <Group justify="space-between" mb="xs">
                <Text size="xs" c="dimmed">Current Plan</Text>
                <Badge size="xs" color="cyan">
                  {user?.subscription?.plan?.name || 'Free'}
                </Badge>
              </Group>
              <Text size="sm" fw={500}>
                ${user?.balance?.toFixed(2) || '0.00'} balance
              </Text>
            </Box>
          )}

          {/* User Menu */}
          <Menu shadow="md" width={200} position="top-start">
            <Menu.Target>
              <NavLink
                label={!collapsed && user?.username}
                description={!collapsed && user?.email}
                leftSection={
                  <Avatar size="sm" radius="xl" color="cyan">
                    {user?.username?.[0]?.toUpperCase()}
                  </Avatar>
                }
                style={{ borderRadius: 8 }}
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={colorScheme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
                onClick={() => toggleColorScheme()}
              >
                {colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
              </Menu.Item>
              <Menu.Item leftSection={<IconUser size={14} />} component={Link} to="/dashboard/profile">
                Profile
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings size={14} />} component={Link} to="/dashboard/settings">
                Settings
              </Menu.Item>
              <Divider />
              <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

