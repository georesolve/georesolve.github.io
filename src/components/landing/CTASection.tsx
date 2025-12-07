import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Group, Box, useMantineColorScheme } from '@mantine/core';
import { IconArrowRight, IconBrandGithub } from '@tabler/icons-react';
import { useTranslation } from '@/store/languageStore';

export default function CTASection() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { t } = useTranslation();

  return (
    <Box
      id="cta"
      py={100}
      style={{
        background: isDark ? '#0f172a' : '#f8fafc',
        position: 'relative',
      }}
    >
      {/* Smooth transition from Pricing */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: isDark
            ? 'linear-gradient(180deg, #0f172a 0%, rgba(15, 23, 42, 0.95) 25%, rgba(15, 23, 42, 0.9) 50%, rgba(15, 23, 42, 0.95) 75%, #0f172a 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, rgba(248, 250, 252, 0.95) 25%, rgba(241, 245, 249, 0.9) 50%, rgba(248, 250, 252, 0.95) 75%, #f8fafc 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Main content gradient */}
      <Box
        style={{
          position: 'absolute',
          top: '200px',
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 25%, rgba(15, 23, 42, 1) 50%, rgba(15, 23, 42, 0.95) 75%, rgba(15, 23, 42, 0.9) 100%)'
            : 'linear-gradient(180deg, rgba(241, 245, 249, 0.9) 0%, rgba(241, 245, 249, 0.95) 25%, rgba(241, 245, 249, 1) 50%, rgba(241, 245, 249, 0.95) 75%, rgba(241, 245, 249, 0.9) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container size="md" style={{ position: 'relative', zIndex: 1 }}>
        <Box ta="center">
          <Title order={2} size={44} fw={700} mb="lg">
            {t.cta.title}
          </Title>
          <Text size="xl" c="dimmed" mb="xl" maw={600} mx="auto">
            {t.cta.description}
          </Text>
          <Group justify="center" gap="md">
            <Button
              size="xl"
              variant="gradient"
              gradient={{ from: 'cyan', to: 'blue' }}
              rightSection={<IconArrowRight size={20} />}
              component={Link}
              to="/register"
            >
              {t.cta.startTrial}
            </Button>
            <Button
              size="xl"
              variant="outline"
              color={isDark ? undefined : 'dark'}
              leftSection={<IconBrandGithub size={20} />}
              component="a"
              href="https://github.com/georesolve"
              target="_blank"
            >
              {t.cta.starGithub}
            </Button>
          </Group>
          <Text size="sm" c="dimmed" mt="lg">
            {t.cta.noCreditCard}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
