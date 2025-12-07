import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Box,
  Badge,
  Button,
  List,
  ThemeIcon,
  Group,
  Stack,
  useMantineColorScheme,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslation } from '@/store/languageStore';

type PlanKey = 'free' | 'basic' | 'pro' | 'enterprise';
type FeatureKey = keyof typeof import('@/i18n/translations/en').en.pricing.features;

interface PlanFeature {
  key: FeatureKey;
  included: boolean;
}

interface Plan {
  key: PlanKey;
  price: number;
  requestsPerMin: number;
  requestsPerDay: string;
  apiKeys: number;
  features: PlanFeature[];
  popular: boolean;
  buttonVariant: 'outline' | 'gradient';
  isEnterprise?: boolean;
}

const plans: Plan[] = [
  {
    key: 'free',
    price: 0,
    requestsPerMin: 10,
    requestsPerDay: '100',
    apiKeys: 1,
    features: [
      { key: 'forwardGeocoding', included: true },
      { key: 'reverseGeocoding', included: true },
      { key: 'basicSupport', included: true },
      { key: 'apiAnalytics', included: false },
      { key: 'dataImport', included: false },
      { key: 'prioritySupport', included: false },
    ],
    popular: false,
    buttonVariant: 'outline',
  },
  {
    key: 'basic',
    price: 9.99,
    requestsPerMin: 30,
    requestsPerDay: '5,000',
    apiKeys: 3,
    features: [
      { key: 'forwardGeocoding', included: true },
      { key: 'reverseGeocoding', included: true },
      { key: 'emailSupport', included: true },
      { key: 'apiAnalytics', included: true },
      { key: 'dataImport', included: false },
      { key: 'prioritySupport', included: false },
    ],
    popular: false,
    buttonVariant: 'outline',
  },
  {
    key: 'pro',
    price: 49.99,
    requestsPerMin: 100,
    requestsPerDay: '50,000',
    apiKeys: 10,
    features: [
      { key: 'forwardGeocoding', included: true },
      { key: 'reverseGeocoding', included: true },
      { key: 'prioritySupport', included: true },
      { key: 'advancedAnalytics', included: true },
      { key: 'dataImportLimit', included: true },
      { key: 'webhooks', included: true },
    ],
    popular: true,
    buttonVariant: 'gradient',
  },
  {
    key: 'enterprise',
    price: 199.99,
    requestsPerMin: 500,
    requestsPerDay: 'Unlimited',
    apiKeys: 50,
    features: [
      { key: 'everythingInPro', included: true },
      { key: 'unlimitedRequests', included: true },
      { key: 'dedicatedSupport', included: true },
      { key: 'customDataImport', included: true },
      { key: 'slaGuarantee', included: true },
      { key: 'onPremise', included: true },
    ],
    popular: false,
    buttonVariant: 'outline',
    isEnterprise: true,
  },
];

export default function PricingSection() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { t } = useTranslation();

  // Theme-aware styles
  const getCardStyle = (isPopular: boolean) => {
    if (isPopular) {
      return {
        background: isDark
          ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
        border: '2px solid rgba(34, 211, 238, 0.6)',
        boxShadow: isDark
          ? '0 8px 32px rgba(34, 211, 238, 0.15)'
          : '0 8px 32px rgba(34, 211, 238, 0.2)',
      };
    }
    return {
      background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.12)',
      boxShadow: isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.08)',
    };
  };

  const getStatBoxStyle = () => ({
    background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.04)',
    borderRadius: 8,
    border: isDark ? 'none' : '1px solid rgba(0, 0, 0, 0.06)',
  });

  return (
    <Box
      id="pricing"
      py={100}
      style={{
        background: isDark ? '#0f172a' : '#f8fafc',
        position: 'relative',
      }}
    >
      {/* Smooth transition from Features */}
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
      {/* Smooth transition to CTA */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: isDark
            ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.85) 25%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0.75) 75%, #0f172a 100%)'
            : 'linear-gradient(180deg, rgba(241, 245, 249, 0.9) 0%, rgba(248, 250, 252, 0.85) 25%, rgba(248, 250, 252, 0.8) 50%, rgba(248, 250, 252, 0.75) 75%, #f8fafc 100%)',
          pointerEvents: 'none',
        }}
      />
      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Box ta="center" mb={60}>
          <Badge variant="light" color="cyan" size="lg" mb="md">
            {t.pricing.badge}
          </Badge>
          <Title order={2} size={40} fw={700} mb="md">
            {t.pricing.title}{' '}
            <span className="gradient-text">{t.pricing.titleHighlight}</span>
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            {t.pricing.description}
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {plans.map((plan, index) => {
            const planData = t.pricing.plans[plan.key];
            return (
              <Card
                key={index}
                p="xl"
                radius="lg"
                style={{
                  ...getCardStyle(plan.popular),
                  position: 'relative',
                  overflow: 'visible',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  if (plan.popular) {
                    e.currentTarget.style.boxShadow = isDark
                      ? '0 12px 40px rgba(34, 211, 238, 0.25)'
                      : '0 12px 40px rgba(34, 211, 238, 0.3)';
                  } else {
                    e.currentTarget.style.boxShadow = isDark
                      ? '0 8px 30px rgba(0, 0, 0, 0.3)'
                      : '0 8px 30px rgba(0, 0, 0, 0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const style = getCardStyle(plan.popular);
                  e.currentTarget.style.boxShadow = style.boxShadow;
                }}
              >
                {plan.popular && (
                  <Badge
                    variant="gradient"
                    gradient={{ from: 'cyan', to: 'blue' }}
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {t.pricing.mostPopular}
                  </Badge>
                )}

                <Stack
                  gap="md"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box>
                    <Text fw={600} size="xl" mb="xs">{planData.name}</Text>
                    <Text size="sm" c="dimmed">{planData.description}</Text>
                  </Box>

                  <Group align="baseline" gap="xs">
                    <Text size="xl" fw={800} style={{ fontSize: 42 }}>
                      ${plan.price}
                    </Text>
                    <Text size="sm" c="dimmed">{t.common.perMonth}</Text>
                  </Group>

                  <Box p="md" style={getStatBoxStyle()}>
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" c="dimmed">{t.pricing.requestsPerMin}</Text>
                      <Text size="sm" fw={600}>{plan.requestsPerMin}</Text>
                    </Group>
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" c="dimmed">{t.pricing.requestsPerDay}</Text>
                      <Text size="sm" fw={600}>{plan.requestsPerDay}</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">{t.pricing.apiKeys}</Text>
                      <Text size="sm" fw={600}>{plan.apiKeys}</Text>
                    </Group>
                  </Box>

                  <List spacing="sm" size="sm" center style={{ flex: 1 }}>
                    {plan.features.map((feature, i) => (
                      <List.Item
                        key={i}
                        icon={
                          <ThemeIcon
                            size={20}
                            radius="xl"
                            variant="light"
                            color={feature.included ? 'green' : 'gray'}
                          >
                            {feature.included ? <IconCheck size={12} /> : <IconX size={12} />}
                          </ThemeIcon>
                        }
                        c={feature.included ? undefined : 'dimmed'}
                      >
                        {t.pricing.features[feature.key]}
                      </List.Item>
                    ))}
                  </List>

                  <Button
                    fullWidth
                    size="md"
                    variant={plan.buttonVariant}
                    gradient={plan.popular ? { from: 'cyan', to: 'blue' } : undefined}
                    color={!plan.popular ? 'cyan' : undefined}
                    component={Link}
                    to={plan.isEnterprise ? '/contact' : '/register'}
                    style={{ marginTop: 'auto' }}
                  >
                    {plan.isEnterprise ? t.pricing.contactSales : (plan.key === 'free' ? t.common.getStarted : t.pricing.subscribe)}
                  </Button>
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
