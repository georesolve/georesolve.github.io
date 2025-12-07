import {
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Stack,
  ThemeIcon,
  Box,
  RingProgress,
  Badge,
} from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import {
  IconApi,
  IconKey,
  IconCoin,
  IconTrendingUp,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import { useAuthStore } from '@/store/authStore';

// Mock data - replace with API call
const usageData = [
  { date: 'Mon', requests: 1200 },
  { date: 'Tue', requests: 1800 },
  { date: 'Wed', requests: 1400 },
  { date: 'Thu', requests: 2200 },
  { date: 'Fri', requests: 1900 },
  { date: 'Sat', requests: 800 },
  { date: 'Sun', requests: 600 },
];

const stats = [
  {
    title: 'Total Requests',
    value: '12,456',
    change: '+12.5%',
    changeType: 'positive',
    icon: IconApi,
    color: 'cyan',
  },
  {
    title: 'Active API Keys',
    value: '3',
    change: '0',
    changeType: 'neutral',
    icon: IconKey,
    color: 'blue',
  },
  {
    title: 'Current Balance',
    value: '$45.00',
    change: '-$9.99',
    changeType: 'negative',
    icon: IconCoin,
    color: 'green',
  },
  {
    title: 'Plan Usage',
    value: '68%',
    change: '+5%',
    changeType: 'positive',
    icon: IconTrendingUp,
    color: 'orange',
  },
];

export default function DashboardOverview() {
  const user = useAuthStore((state) => state.user);

  return (
    <Box>
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Dashboard</Title>
          <Text c="dimmed">Welcome back, {user?.username}!</Text>
        </div>
        <Badge size="lg" variant="light" color="cyan">
          {user?.subscription?.plan?.name || 'Free'} Plan
        </Badge>
      </Group>

      {/* Stats Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        {stats.map((stat, index) => (
          <Card key={index} p="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  {stat.title}
                </Text>
                <Text size="xl" fw={700} mt="xs">
                  {stat.value}
                </Text>
                <Group gap="xs" mt="xs">
                  {stat.changeType === 'positive' ? (
                    <IconArrowUpRight size={14} color="var(--mantine-color-green-6)" />
                  ) : stat.changeType === 'negative' ? (
                    <IconArrowDownRight size={14} color="var(--mantine-color-red-6)" />
                  ) : null}
                  <Text
                    size="xs"
                    c={
                      stat.changeType === 'positive'
                        ? 'green'
                        : stat.changeType === 'negative'
                          ? 'red'
                          : 'dimmed'
                    }
                  >
                    {stat.change}
                  </Text>
                </Group>
              </div>
              <ThemeIcon size={50} radius="md" variant="light" color={stat.color}>
                <stat.icon size={26} />
              </ThemeIcon>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      {/* Charts Row */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg">
        {/* Usage Chart */}
        <Card p="lg" radius="md" withBorder>
          <Text fw={600} mb="md">API Usage (Last 7 Days)</Text>
          <AreaChart
            h={250}
            data={usageData}
            dataKey="date"
            series={[{ name: 'requests', color: 'cyan.6' }]}
            curveType="natural"
            gridAxis="xy"
            withLegend={false}
          />
        </Card>

        {/* Usage Breakdown */}
        <Card p="lg" radius="md" withBorder>
          <Text fw={600} mb="md">Request Distribution</Text>
          <Group justify="center" mt="xl">
            <RingProgress
              size={200}
              thickness={20}
              sections={[
                { value: 55, color: 'cyan' },
                { value: 30, color: 'blue' },
                { value: 15, color: 'violet' },
              ]}
              label={
                <Text ta="center" size="xl" fw={700}>
                  12.4K
                  <Text size="sm" c="dimmed">requests</Text>
                </Text>
              }
            />
          </Group>
          <Stack gap="xs" mt="lg">
            <Group justify="space-between">
              <Group gap="xs">
                <Box w={12} h={12} style={{ borderRadius: 4, background: 'var(--mantine-color-cyan-6)' }} />
                <Text size="sm">Search requests</Text>
              </Group>
              <Text size="sm" fw={600}>55%</Text>
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box w={12} h={12} style={{ borderRadius: 4, background: 'var(--mantine-color-blue-6)' }} />
                <Text size="sm">Reverse geocoding</Text>
              </Group>
              <Text size="sm" fw={600}>30%</Text>
            </Group>
            <Group justify="space-between">
              <Group gap="xs">
                <Box w={12} h={12} style={{ borderRadius: 4, background: 'var(--mantine-color-violet-6)' }} />
                <Text size="sm">Lookup requests</Text>
              </Group>
              <Text size="sm" fw={600}>15%</Text>
            </Group>
          </Stack>
        </Card>
      </SimpleGrid>
    </Box>
  );
}

