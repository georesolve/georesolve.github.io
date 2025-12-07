import { useState } from 'react';
import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Group,
  Button,
  Stack,
  Badge,
  Table,
  Modal,
  NumberInput,
  Select,
  Box,
  Progress,
  Divider,
  Alert,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCoin,
  IconCreditCard,
  IconReceipt,
  IconAlertCircle,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { useAuthStore } from '@/store/authStore';

const transactions = [
  {
    id: 1,
    type: 'DEPOSIT',
    amount: 50.0,
    status: 'COMPLETED',
    description: 'Credit card deposit',
    createdAt: '2024-03-10 14:30',
    paymentMethod: 'Visa **** 4242',
  },
  {
    id: 2,
    type: 'SUBSCRIPTION',
    amount: -9.99,
    status: 'COMPLETED',
    description: 'Basic Plan - Monthly',
    createdAt: '2024-03-01 00:00',
    paymentMethod: 'Account Balance',
  },
  {
    id: 3,
    type: 'DEPOSIT',
    amount: 100.0,
    status: 'COMPLETED',
    description: 'Credit card deposit',
    createdAt: '2024-02-15 10:15',
    paymentMethod: 'Visa **** 4242',
  },
];

export default function BillingPage() {
  const user = useAuthStore((state) => state.user);
  const [depositOpened, { open: openDeposit, close: closeDeposit }] = useDisclosure(false);
  const [amount, setAmount] = useState<number | string>(50);
  const [paymentMethod, setPaymentMethod] = useState<string | null>('card');

  const handleDeposit = () => {
    // Handle deposit logic
    closeDeposit();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return 'green';
      case 'SUBSCRIPTION':
        return 'blue';
      case 'REFUND':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'green';
      case 'PENDING':
        return 'yellow';
      case 'FAILED':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Billing</Title>
          <Text c="dimmed">Manage your balance and payments</Text>
        </div>
        <Button leftSection={<IconCoin size={16} />} onClick={openDeposit}>
          Add Funds
        </Button>
      </Group>

      {/* Balance Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mb="xl">
        <Card p="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Current Balance</Text>
            <IconCoin size={20} color="var(--mantine-color-green-6)" />
          </Group>
          <Text size="xl" fw={700}>${(user?.balance || 45.0).toFixed(2)}</Text>
          <Text size="sm" c="dimmed" mt="xs">
            Next billing: April 1, 2024
          </Text>
        </Card>

        <Card p="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Current Plan</Text>
            <IconReceipt size={20} color="var(--mantine-color-blue-6)" />
          </Group>
          <Text size="xl" fw={700}>{user?.subscription?.plan?.name || 'Free'}</Text>
          <Text size="sm" c="dimmed" mt="xs">
            $9.99/month
          </Text>
        </Card>

        <Card p="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Usage This Month</Text>
            <IconArrowUpRight size={20} color="var(--mantine-color-cyan-6)" />
          </Group>
          <Progress value={68} color="cyan" size="xl" radius="xl" mb="sm" />
          <Group justify="space-between">
            <Text size="sm" c="dimmed">3,400 / 5,000 requests</Text>
            <Text size="sm" fw={600}>68%</Text>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Auto-renewal Notice */}
      <Alert icon={<IconAlertCircle size={16} />} color="blue" variant="light" mb="xl">
        Auto-renewal is enabled. Your plan will automatically renew on April 1, 2024.
        <Button variant="subtle" size="xs" ml="md">Manage</Button>
      </Alert>

      {/* Transactions */}
      <Card withBorder radius="md" p={0}>
        <Group justify="space-between" p="lg">
          <Text fw={600}>Recent Transactions</Text>
          <Button variant="subtle" size="sm">View All</Button>
        </Group>
        <Divider />
        <Table.ScrollContainer minWidth={700}>
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Type</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {transactions.map((tx) => (
                <Table.Tr key={tx.id}>
                  <Table.Td>
                    <Badge color={getTypeColor(tx.type)} variant="light">
                      {tx.type}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={2}>
                      <Text size="sm">{tx.description}</Text>
                      <Text size="xs" c="dimmed">{tx.paymentMethod}</Text>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <Text
                      fw={600}
                      c={tx.amount >= 0 ? 'green' : undefined}
                    >
                      {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(tx.status)} variant="light">
                      {tx.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{tx.createdAt}</Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      {/* Deposit Modal */}
      <Modal opened={depositOpened} onClose={closeDeposit} title="Add Funds" centered>
        <Stack>
          <NumberInput
            label="Amount"
            placeholder="Enter amount"
            prefix="$"
            min={10}
            max={1000}
            value={amount}
            onChange={setAmount}
          />

          <Select
            label="Payment Method"
            placeholder="Select payment method"
            value={paymentMethod}
            onChange={setPaymentMethod}
            data={[
              { value: 'card', label: '💳 Credit Card' },
              { value: 'paypal', label: '🅿️ PayPal' },
              { value: 'bank', label: '🏦 Bank Transfer' },
            ]}
          />

          <Group gap="xs">
            {[25, 50, 100, 200].map((val) => (
              <Button
                key={val}
                variant={amount === val ? 'filled' : 'outline'}
                size="xs"
                onClick={() => setAmount(val)}
              >
                ${val}
              </Button>
            ))}
          </Group>

          <Divider />

          <Group justify="space-between">
            <Text c="dimmed">Total</Text>
            <Text fw={700}>${amount || 0}</Text>
          </Group>

          <Button
            fullWidth
            leftSection={<IconCreditCard size={16} />}
            onClick={handleDeposit}
            disabled={!amount || Number(amount) < 10}
          >
            Pay ${amount || 0}
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}

