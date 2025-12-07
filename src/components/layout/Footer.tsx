import { Link } from 'react-router-dom';
import { Container, Group, Text, Stack, Anchor, Divider, Box, SimpleGrid, useMantineColorScheme } from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter, IconBrandDiscord } from '@tabler/icons-react';
import { useTranslation } from '@/store/languageStore';
import Logo from '../common/Logo';

export default function Footer() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { t } = useTranslation();

  const footerLinks = {
    product: [
      { label: t.nav.features, href: '/#features' },
      { label: t.nav.pricing, href: '/#pricing' },
      { label: t.nav.docs, href: '/docs' },
      { label: t.footer.changelog, href: '/changelog' },
    ],
    resources: [
      { label: t.footer.documentation, href: '/docs' },
      { label: t.footer.apiReference, href: '/docs/api' },
      { label: t.footer.status, href: 'https://status.georesolve.io' },
      { label: t.footer.community, href: 'https://discord.gg/georesolve' },
    ],
    company: [
      { label: t.footer.about, href: '/about' },
      { label: t.footer.blog, href: '/blog' },
      { label: t.footer.contact, href: '/contact' },
    ],
    legal: [
      { label: t.footer.privacy, href: '/privacy' },
      { label: t.footer.terms, href: '/terms' },
    ],
  };

  return (
    <Box
      component="footer"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.5) 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(241, 245, 249, 0.8) 100%)',
        borderTop: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container size="xl" py={60}>
        <SimpleGrid cols={{ base: 2, sm: 2, md: 5 }} spacing="xl">
          {/* Brand Column */}
          <Stack gap="md" style={{ gridColumn: 'span 1' }}>
            <Logo />
            <Text size="sm" c="dimmed" maw={200}>
              {t.footer.description}
            </Text>
            <Group gap="xs">
              <Anchor href="https://github.com/georesolve" target="_blank" c="dimmed">
                <IconBrandGithub size={20} />
              </Anchor>
              <Anchor href="https://twitter.com/georesolve" target="_blank" c="dimmed">
                <IconBrandTwitter size={20} />
              </Anchor>
              <Anchor href="https://discord.gg/georesolve" target="_blank" c="dimmed">
                <IconBrandDiscord size={20} />
              </Anchor>
            </Group>
          </Stack>

          {/* Product */}
          <Stack gap="xs">
            <Text fw={600} size="sm" mb="xs">{t.footer.product}</Text>
            {footerLinks.product.map((link) =>
              link.href.startsWith('/#') ? (
                <Anchor
                  key={link.href}
                  href={link.href}
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Anchor>
              ) : link.href.startsWith('/') ? (
                <Anchor
                  key={link.href}
                  component={Link}
                  to={link.href}
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Anchor>
              ) : (
                <Anchor
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Anchor>
              )
            )}
          </Stack>

          {/* Resources */}
          <Stack gap="xs">
            <Text fw={600} size="sm" mb="xs">{t.footer.resources}</Text>
            {footerLinks.resources.map((link) =>
              link.href.startsWith('/') ? (
                <Anchor
                  key={link.href}
                  component={Link}
                  to={link.href}
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Anchor>
              ) : (
                <Anchor
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  size="sm"
                  c="dimmed"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </Anchor>
              )
            )}
          </Stack>

          {/* Company */}
          <Stack gap="xs">
            <Text fw={600} size="sm" mb="xs">{t.footer.company}</Text>
            {footerLinks.company.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                to={link.href}
                size="sm"
                c="dimmed"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Anchor>
            ))}
          </Stack>

          {/* Legal */}
          <Stack gap="xs">
            <Text fw={600} size="sm" mb="xs">Legal</Text>
            {footerLinks.legal.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                to={link.href}
                size="sm"
                c="dimmed"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </Anchor>
            ))}
          </Stack>
        </SimpleGrid>

        <Divider my="xl" color={isDark ? 'dark.5' : 'gray.3'} />

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} GeoResolve. {t.footer.allRightsReserved}
          </Text>
          <Text size="sm" c="dimmed">
            Built with ❤️ for developers
          </Text>
        </Group>
      </Container>
    </Box>
  );
}
