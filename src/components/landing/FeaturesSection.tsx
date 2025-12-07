import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Box,
  Badge,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconSearch,
  IconMapPin,
  IconDatabase,
  IconKey,
  IconChartBar,
  IconRocket,
  IconShieldCheck,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslation } from '@/store/languageStore';

const featureIcons = [
  { icon: IconSearch, color: 'cyan', key: 'forwardGeocoding' },
  { icon: IconMapPin, color: 'blue', key: 'reverseGeocoding' },
  { icon: IconDatabase, color: 'violet', key: 'osmData' },
  { icon: IconKey, color: 'orange', key: 'apiKeyManagement' },
  { icon: IconChartBar, color: 'green', key: 'usageAnalytics' },
  { icon: IconRocket, color: 'red', key: 'highPerformance' },
  { icon: IconShieldCheck, color: 'teal', key: 'rateLimiting' },
  { icon: IconWorld, color: 'indigo', key: 'globalCoverage' },
] as const;

export default function FeaturesSection() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { t } = useTranslation();

  return (
    <Box
      id="features"
      py={100}
      style={{
        background: isDark ? '#0f172a' : '#f8fafc',
        position: 'relative',
      }}
    >
      {/* Smooth transition from Hero */}
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
      {/* Smooth transition to Pricing */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: isDark
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.95) 25%, rgba(15, 23, 42, 0.9) 50%, rgba(15, 23, 42, 0.85) 75%, #0f172a 100%)'
            : 'linear-gradient(180deg, rgba(241, 245, 249, 0.9) 0%, rgba(241, 245, 249, 0.95) 25%, rgba(241, 245, 249, 0.9) 50%, rgba(248, 250, 252, 0.85) 75%, #f8fafc 100%)',
          pointerEvents: 'none',
        }}
      />
      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Box ta="center" mb={60}>
          <Badge variant="light" color="cyan" size="lg" mb="md">
            {t.features.badge}
          </Badge>
          <Title order={2} size={40} fw={700} mb="md">
            {t.features.title}{' '}
            <span className="gradient-text">{t.features.titleHighlight}</span>
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            {t.features.description}
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
          {featureIcons.map((feature, index) => {
            const featureData = t.features.items[feature.key];
            return (
              <Card
                key={index}
                p="xl"
                radius="lg"
                style={{
                  background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)';
                  e.currentTarget.style.boxShadow = isDark
                    ? '0 8px 30px rgba(34, 211, 238, 0.15)'
                    : '0 8px 30px rgba(34, 211, 238, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.boxShadow = isDark
                    ? 'none'
                    : '0 4px 20px rgba(0, 0, 0, 0.06)';
                }}
              >
                <ThemeIcon
                  size={50}
                  radius="lg"
                  variant="light"
                  color={feature.color}
                  mb="md"
                >
                  <feature.icon size={26} />
                </ThemeIcon>
                <Text fw={600} size="lg" mb="xs">
                  {featureData.title}
                </Text>
                <Text size="sm" c="dimmed" lh={1.6}>
                  {featureData.description}
                </Text>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
