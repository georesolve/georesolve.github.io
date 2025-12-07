import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Group,
  Button,
  Text,
  Container,
  Burger,
  Drawer,
  Stack,
  useMantineColorScheme,
  ActionIcon,
  Menu,
  Avatar,
  Divider,
  Box,
} from '@mantine/core';
import {
  IconSun,
  IconMoon,
  IconUser,
  IconLogout,
  IconDashboard,
  IconKey,
  IconCreditCard,
  IconChartBar,
} from '@tabler/icons-react';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/store/languageStore';
import Logo from '../common/Logo';
import LanguageToggle from '../common/LanguageToggle';

export default function Header() {
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: t.nav.features, href: '/#features' },
    { label: t.nav.pricing, href: '/#pricing' },
    { label: t.nav.docs, href: '/docs' },
    { label: t.nav.api, href: '/api-playground' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLandingPage = location.pathname === '/';

  const isDark = colorScheme === 'dark';

  return (
    <Box
      component="header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isLandingPage
          ? isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)'
          : 'var(--mantine-color-body)',
        backdropFilter: 'blur(10px)',
        borderBottom: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="md">
            {navLinks.map((link) =>
              link.href.startsWith('/#') ? (
                <Text
                  key={link.href}
                  component="a"
                  href={link.href}
                  size="sm"
                  fw={500}
                  c="dimmed"
                  style={{
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mantine-color-cyan-4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {link.label}
                </Text>
              ) : (
                <Text
                  key={link.href}
                  component={Link}
                  to={link.href}
                  size="sm"
                  fw={500}
                  c="dimmed"
                  style={{
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mantine-color-cyan-4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {link.label}
                </Text>
              )
            )}
          </Group>

          <Group gap="sm" visibleFrom="md">
            <LanguageToggle />

            <ActionIcon
              variant="subtle"
              onClick={() => toggleColorScheme()}
              size="lg"
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>

            {isAuthenticated ? (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="subtle" leftSection={<Avatar size="sm" radius="xl" color="cyan">{user?.username?.[0]?.toUpperCase()}</Avatar>}>
                    {user?.username}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>{t.nav.account}</Menu.Label>
                  <Menu.Item leftSection={<IconDashboard size={14} />} component={Link} to="/dashboard">
                    {t.nav.dashboard}
                  </Menu.Item>
                  <Menu.Item leftSection={<IconKey size={14} />} component={Link} to="/dashboard/api-keys">
                    {t.nav.apiKeys}
                  </Menu.Item>
                  <Menu.Item leftSection={<IconChartBar size={14} />} component={Link} to="/dashboard/statistics">
                    {t.nav.statistics}
                  </Menu.Item>
                  <Menu.Item leftSection={<IconCreditCard size={14} />} component={Link} to="/dashboard/billing">
                    {t.nav.billing}
                  </Menu.Item>
                  <Divider />
                  <Menu.Item leftSection={<IconUser size={14} />} component={Link} to="/dashboard/profile">
                    {t.nav.profile}
                  </Menu.Item>
                  <Menu.Item leftSection={<IconLogout size={14} />} color="red" onClick={handleLogout}>
                    {t.common.logout}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Button variant="subtle" component={Link} to="/login">
                  {t.common.signIn}
                </Button>
                <Button
                  variant="gradient"
                  gradient={{ from: 'cyan', to: 'blue' }}
                  component={Link}
                  to="/register"
                >
                  {t.common.getStarted}
                </Button>
              </>
            )}
          </Group>

          {/* Mobile Menu */}
          <Group gap="xs" hiddenFrom="md">
            <LanguageToggle />
            <ActionIcon
              variant="subtle"
              onClick={() => toggleColorScheme()}
              size="lg"
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
          </Group>
        </Group>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        size="100%"
        padding="md"
        title={<Logo />}
        hiddenFrom="md"
        zIndex={1000}
      >
        <Stack gap="lg" mt="xl">
          {navLinks.map((link) =>
            link.href.startsWith('/#') ? (
              <Text
                key={link.href}
                component="a"
                href={link.href}
                size="lg"
                fw={500}
                onClick={() => setOpened(false)}
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Text>
            ) : (
              <Text
                key={link.href}
                component={Link}
                to={link.href}
                size="lg"
                fw={500}
                onClick={() => setOpened(false)}
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Text>
            )
          )}
          <Divider />
          {isAuthenticated ? (
            <>
              <Button component={Link} to="/dashboard" onClick={() => setOpened(false)} fullWidth>
                {t.nav.dashboard}
              </Button>
              <Button variant="outline" color="red" onClick={handleLogout} fullWidth>
                {t.common.logout}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" component={Link} to="/login" onClick={() => setOpened(false)} fullWidth>
                {t.common.signIn}
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'cyan', to: 'blue' }}
                component={Link}
                to="/register"
                onClick={() => setOpened(false)}
                fullWidth
              >
                {t.common.getStarted}
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
