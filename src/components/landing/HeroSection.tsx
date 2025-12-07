import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Stack,
  Code,
  CopyButton,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { IconCopy, IconCheck, IconArrowRight, IconBrandGithub } from '@tabler/icons-react';
import { useTranslation } from '@/store/languageStore';

const codeExample = `curl "https://api.georesolve.io/search?q=Paris,France"

{
  "place_id": 123456,
  "lat": "48.8566",
  "lon": "2.3522",
  "display_name": "Paris, Île-de-France, France",
  "address": {
    "city": "Paris",
    "state": "Île-de-France",
    "country": "France"
  }
}`;

export default function HeroSection() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { t } = useTranslation();

  return (
    <Box
      id="hero"
      className="hero-pattern"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 80,
        position: 'relative',
        overflow: 'hidden',
        background: isDark ? '#0f172a' : '#f8fafc',
      }}
    >
      {/* Base gradient overlay for smooth color transition */}
      {!isDark && (
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #f8fafc 0%, #f5f7fa 20%, #f1f5f9 40%, #fff 60%, #f1f5f9 80%, #f8fafc 100%)',
            opacity: 0.9,
          }}
        />
      )}

      {/* Background decoration - Multiple layers for smooth blending */}
      <Box
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 800,
          height: 800,
          background: isDark
            ? 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, rgba(34, 211, 238, 0.06) 20%, rgba(34, 211, 238, 0.03) 40%, rgba(34, 211, 238, 0.01) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.09) 20%, rgba(34, 211, 238, 0.05) 40%, rgba(34, 211, 238, 0.02) 60%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.8,
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: 800,
          height: 800,
          background: isDark
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.06) 20%, rgba(59, 130, 246, 0.03) 40%, rgba(59, 130, 246, 0.01) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.09) 20%, rgba(59, 130, 246, 0.05) 40%, rgba(59, 130, 246, 0.02) 60%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.8,
        }}
      />
      {/* Additional subtle layers for smoother transition */}
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1400,
          height: 1400,
          background: isDark
            ? 'radial-gradient(circle, rgba(167, 139, 250, 0.03) 0%, rgba(167, 139, 250, 0.015) 25%, rgba(167, 139, 250, 0.008) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(167, 139, 250, 0.05) 0%, rgba(167, 139, 250, 0.025) 25%, rgba(167, 139, 250, 0.012) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(140px)',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: 700,
          height: 700,
          background: isDark
            ? 'radial-gradient(circle, rgba(34, 211, 238, 0.03) 0%, rgba(34, 211, 238, 0.015) 30%, transparent 60%)'
            : 'radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.025) 30%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(110px)',
          opacity: 0.6,
        }}
      />
      {/* Smooth transition to Features section */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.3) 25%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.8) 75%, #0f172a 100%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(248, 250, 252, 0.3) 25%, rgba(241, 245, 249, 0.6) 50%, rgba(241, 245, 249, 0.8) 75%, #f8fafc 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
            gap: 'clamp(40px, 5vw, 80px)',
            maxWidth: '1400px',
            margin: '0 auto',
            alignItems: 'start',
          }}
        >
          {/* Left side - Text content */}
          <Stack
            gap="xl"
            style={{
              maxWidth: '600px',
            }}
          >
            <Box>
              <Text
                size="sm"
                fw={600}
                c="cyan"
                tt="uppercase"
                mb="sm"
                style={{ letterSpacing: '2px' }}
              >
                {t.hero.badge}
              </Text>
              <Title
                order={1}
                size={56}
                fw={800}
                lh={1.1}
                mb="lg"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                }}
              >
                {t.hero.title}{' '}
                <span className="gradient-text">{t.hero.titleHighlight}</span>
                {' '}{t.hero.titleEnd}
              </Title>
              <Text
                size="xl"
                c="dimmed"
                lh={1.6}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                }}
              >
                {t.hero.description}
              </Text>
            </Box>

            <Group gap="md" wrap="wrap">
              <Button
                size="lg"
                variant="gradient"
                gradient={{ from: 'cyan', to: 'blue' }}
                rightSection={<IconArrowRight size={18} />}
                component={Link}
                to="/register"
              >
                {t.hero.startTrial}
              </Button>
              <Button
                size="lg"
                variant="outline"
                color={isDark ? undefined : 'dark'}
                leftSection={<IconBrandGithub size={18} />}
                component="a"
                href="https://github.com/georesolve"
                target="_blank"
              >
                {t.hero.viewGithub}
              </Button>
            </Group>

            <Group gap="xl" mt="md" wrap="wrap">
              <Box>
                <Text size="xl" fw={700}>1M+</Text>
                <Text size="sm" c="dimmed">{t.hero.stats.requests}</Text>
              </Box>
              <Box>
                <Text size="xl" fw={700}>99.9%</Text>
                <Text size="sm" c="dimmed">{t.hero.stats.uptime}</Text>
              </Box>
              <Box>
                <Text size="xl" fw={700}>&lt;50ms</Text>
                <Text size="sm" c="dimmed">{t.hero.stats.response}</Text>
              </Box>
            </Group>
          </Stack>

          {/* Right side - Code example */}
          <Box
            style={{
              maxWidth: '600px',
              background: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.95)',
              borderRadius: 16,
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              boxShadow: isDark
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Code header */}
            <Group
              justify="space-between"
              px="md"
              py="sm"
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(0, 0, 0, 0.2)',
              }}
            >
              <Group gap="xs">
                <Box w={12} h={12} style={{ borderRadius: '50%', background: '#ef4444' }} />
                <Box w={12} h={12} style={{ borderRadius: '50%', background: '#fbbf24' }} />
                <Box w={12} h={12} style={{ borderRadius: '50%', background: '#22c55e' }} />
              </Group>
              <CopyButton value={codeExample}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? t.common.copied : t.common.copy}>
                    <ActionIcon variant="subtle" size="sm" onClick={copy} color="gray">
                      {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>

            {/* Code content */}
            <Code
              block
              p="lg"
              style={{
                background: 'transparent',
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                color: '#e2e8f0',
              }}
            >
              {codeExample}
            </Code>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
