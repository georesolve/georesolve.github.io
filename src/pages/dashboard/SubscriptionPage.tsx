import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Group,
  Button,
  Stack,
  Badge,
  List,
  ThemeIcon,
  Box,
  Alert,
} from '@mantine/core';
import { IconCheck, IconX, IconRocket, IconAlertCircle } from '@tabler/icons-react';
import { useAuthStore } from '@/store/authStore';

const plans = [
  {
    name: 'Free',
    code: 'FREE',
    price: 0,
    description: 'For testing and small projects',
    requestsPerMin: 10,
    requestsPerDay: 100,
    maxApiKeys: 1,
    features: [
      { text: 'Forward geocoding', included: true },
      { text: 'Reverse geocoding', included: true },
      { text: 'Basic support', included: true },
      { text: 'API analytics', included: false },
      { text: 'Data import', included: false },
    ],
  },
  {
    name: 'Basic',
    code: 'BASIC',
    price: 9.99,
    description: 'For growing applications',
    requestsPerMin: 30,
    requestsPerDay: 5000,
    maxApiKeys: 3,
    features: [
      { text: 'Forward geocoding', included: true },
      { text: 'Reverse geocoding', included: true },
      { text: 'Email support', included: true },
      { text: 'API analytics', included: true },
      { text: 'Data import', included: false },
    ],
  },
  {
    name: 'Pro',
    code: 'PRO',
    price: 49.99,
    description: 'For professional applications',
    requestsPerMin: 100,
    requestsPerDay: 50000,
    maxApiKeys: 10,
    popular: true,
    features: [
      { text: 'Forward geocoding', included: true },
      { text: 'Reverse geocoding', included: true },
      { text: 'Priority support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Data import (5/month)', included: true },
    ],
  },
  {
    name: 'Enterprise',
    code: 'ENTERPRISE',
    price: 199.99,
    description: 'For large-scale applications',
    requestsPerMin: 500,
    requestsPerDay: -1, // Unlimited
    maxApiKeys: 50,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Unlimited requests', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom data import', included: true },
      { text: 'SLA guarantee', included: true },
    ],
  },
];

export default function SubscriptionPage() {
  const user = useAuthStore((state) => state.user);
  const currentPlan = user?.subscription?.plan?.code || 'FREE';

  return (
    <Box>
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Subscription</Title>
          <Text c="dimmed">Choose the plan that fits your needs</Text>
        </div>
        <Badge size="lg" variant="light" color="cyan" leftSection={<IconRocket size={14} />}>
          Current: {user?.subscription?.plan?.name || 'Free'}
        </Badge>
      </Group>

      {currentPlan !== 'FREE' && (
        <Alert icon={<IconAlertCircle size={16} />} color="blue" variant="light" mb="xl">
          Your current plan renews on{' '}
          <Text span fw={600}>April 1, 2024</Text>.
          Cancel anytime before the renewal date.
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
        {plans.map((plan) => {
          const isCurrent = plan.code === currentPlan;
          const isUpgrade = plans.findIndex(p => p.code === plan.code) > plans.findIndex(p => p.code === currentPlan);
          const isDowngrade = plans.findIndex(p => p.code === plan.code) < plans.findIndex(p => p.code === currentPlan);

          return (
            <Card
              key={plan.code}
              p="xl"
              radius="md"
              withBorder
              style={{
                borderColor: isCurrent
                  ? 'var(--mantine-color-cyan-6)'
                  : plan.popular
                    ? 'var(--mantine-color-blue-6)'
                    : undefined,
                borderWidth: isCurrent || plan.popular ? 2 : 1,
                position: 'relative',
              }}
            >
              {plan.popular && !isCurrent && (
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
                  Popular
                </Badge>
              )}

              {isCurrent && (
                <Badge
                  color="cyan"
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  Current Plan
                </Badge>
              )}

              <Stack gap="md">
                <div>
                  <Text fw={600} size="xl">{plan.name}</Text>
                  <Text size="sm" c="dimmed">{plan.description}</Text>
                </div>

                <Group align="baseline" gap="xs">
                  <Text size="xl" fw={800} style={{ fontSize: 36 }}>
                    ${plan.price}
                  </Text>
                  <Text size="sm" c="dimmed">/month</Text>
                </Group>

                <Box
                  p="sm"
                  style={{
                    background: 'var(--mantine-color-dark-7)',
                    borderRadius: 8,
                  }}
                >
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" c="dimmed">Requests/min</Text>
                    <Text size="sm" fw={600}>{plan.requestsPerMin}</Text>
                  </Group>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" c="dimmed">Requests/day</Text>
                    <Text size="sm" fw={600}>
                      {plan.requestsPerDay === -1 ? 'Unlimited' : plan.requestsPerDay.toLocaleString()}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">API Keys</Text>
                    <Text size="sm" fw={600}>{plan.maxApiKeys}</Text>
                  </Group>
                </Box>

                <List spacing="xs" size="sm">
                  {plan.features.map((feature, i) => (
                    <List.Item
                      key={i}
                      icon={
                        <ThemeIcon
                          size={18}
                          radius="xl"
                          variant="light"
                          color={feature.included ? 'green' : 'gray'}
                        >
                          {feature.included ? <IconCheck size={12} /> : <IconX size={12} />}
                        </ThemeIcon>
                      }
                      c={feature.included ? undefined : 'dimmed'}
                    >
                      {feature.text}
                    </List.Item>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant={isCurrent ? 'light' : isUpgrade ? 'gradient' : 'outline'}
                  gradient={isUpgrade ? { from: 'cyan', to: 'blue' } : undefined}
                  disabled={isCurrent}
                >
                  {isCurrent ? 'Current Plan' : isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Select'}
                </Button>
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

