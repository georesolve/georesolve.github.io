import { useState } from 'react';
import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Group,
  Select,
  Box,
  Table,
  Badge,
} from '@mantine/core';
import { AreaChart, BarChart } from '@mantine/charts';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

// Mock data
const usageHistory = [
  { date: '03/01', search: 2400, reverse: 1398, lookup: 200 },
  { date: '03/02', search: 1398, reverse: 2800, lookup: 300 },
  { date: '03/03', search: 3800, reverse: 3908, lookup: 500 },
  { date: '03/04', search: 3908, reverse: 4800, lookup: 400 },
  { date: '03/05', search: 4800, reverse: 3800, lookup: 600 },
  { date: '03/06', search: 3800, reverse: 4300, lookup: 800 },
  { date: '03/07', search: 4300, reverse: 4100, lookup: 700 },
  { date: '03/08', search: 4100, reverse: 4500, lookup: 500 },
  { date: '03/09', search: 4500, reverse: 5200, lookup: 600 },
  { date: '03/10', search: 5200, reverse: 4800, lookup: 800 },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  requests: Math.floor(Math.random() * 500) + 100,
}));

const topEndpoints = [
  { endpoint: '/api/search', requests: 45678, avgLatency: 42 },
  { endpoint: '/api/reverse', requests: 32456, avgLatency: 38 },
  { endpoint: '/api/lookup', requests: 12345, avgLatency: 35 },
  { endpoint: '/api/status', requests: 5678, avgLatency: 8 },
];

export default function StatisticsPage() {
  const [period, setPeriod] = useState('7d');

  return (
    <Box>
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Statistics</Title>
          <Text c="dimmed">Detailed analytics for your API usage</Text>
        </div>
        <Select
          value={period}
          onChange={(value) => setPeriod(value || '7d')}
          data={[
            { value: '24h', label: 'Last 24 hours' },
            { value: '7d', label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
            { value: '90d', label: 'Last 90 days' },
          ]}
          w={160}
        />
      </Group>

      {/* Summary Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        <Card p="lg" radius="md" withBorder>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Total Requests</Text>
          <Group justify="space-between" align="flex-end" mt="sm">
            <Text size="xl" fw={700}>89,432</Text>
            <Group gap={4}>
              <IconTrendingUp size={16} color="var(--mantine-color-green-6)" />
              <Text size="sm" c="green">+12.5%</Text>
            </Group>
          </Group>
        </Card>

        <Card p="lg" radius="md" withBorder>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Avg Response Time</Text>
          <Group justify="space-between" align="flex-end" mt="sm">
            <Text size="xl" fw={700}>38ms</Text>
            <Group gap={4}>
              <IconTrendingDown size={16} color="var(--mantine-color-green-6)" />
              <Text size="sm" c="green">-5.2%</Text>
            </Group>
          </Group>
        </Card>

        <Card p="lg" radius="md" withBorder>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Success Rate</Text>
          <Group justify="space-between" align="flex-end" mt="sm">
            <Text size="xl" fw={700}>99.8%</Text>
            <Badge color="green" variant="light">Excellent</Badge>
          </Group>
        </Card>

        <Card p="lg" radius="md" withBorder>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Error Rate</Text>
          <Group justify="space-between" align="flex-end" mt="sm">
            <Text size="xl" fw={700}>0.2%</Text>
            <Badge color="green" variant="light">Low</Badge>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Charts */}
      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="lg" mb="xl">
        {/* Usage by Endpoint */}
        <Card p="lg" radius="md" withBorder>
          <Text fw={600} mb="md">Requests by Endpoint</Text>
          <AreaChart
            h={300}
            data={usageHistory}
            dataKey="date"
            series={[
              { name: 'search', color: 'cyan.6' },
              { name: 'reverse', color: 'blue.6' },
              { name: 'lookup', color: 'violet.6' },
            ]}
            curveType="natural"
            withLegend
          />
        </Card>

        {/* Hourly Distribution */}
        <Card p="lg" radius="md" withBorder>
          <Text fw={600} mb="md">Hourly Request Distribution</Text>
          <BarChart
            h={300}
            data={hourlyData}
            dataKey="hour"
            series={[{ name: 'requests', color: 'cyan.6' }]}
            tickLine="none"
          />
        </Card>
      </SimpleGrid>

      {/* Top Endpoints Table */}
      <Card p="lg" radius="md" withBorder>
        <Text fw={600} mb="md">Top Endpoints</Text>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Endpoint</Table.Th>
              <Table.Th>Requests</Table.Th>
              <Table.Th>Avg Latency</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {topEndpoints.map((endpoint, index) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <Text fw={500} ff="monospace">{endpoint.endpoint}</Text>
                </Table.Td>
                <Table.Td>{endpoint.requests.toLocaleString()}</Table.Td>
                <Table.Td>{endpoint.avgLatency}ms</Table.Td>
                <Table.Td>
                  <Badge color="green" variant="light">Healthy</Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Box>
  );
}

