import { useState } from 'react';
import {
  Title,
  Text,
  Card,
  Button,
  Table,
  Badge,
  Group,
  ActionIcon,
  Menu,
  Modal,
  TextInput,
  Stack,
  CopyButton,
  Tooltip,
  Alert,
  Box,
  Code,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconPlus,
  IconDots,
  IconTrash,
  IconRefresh,
  IconCopy,
  IconCheck,
  IconAlertCircle,
  IconKey,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

// Mock data - replace with API calls
const mockApiKeys = [
  {
    id: 1,
    name: 'Production',
    keyPrefix: 'gk_prod_***',
    status: 'ACTIVE',
    createdAt: '2024-01-15',
    lastUsedAt: '2024-03-10',
    requestsToday: 1234,
    requestsThisMonth: 45678,
  },
  {
    id: 2,
    name: 'Development',
    keyPrefix: 'gk_dev_***',
    status: 'ACTIVE',
    createdAt: '2024-02-20',
    lastUsedAt: '2024-03-10',
    requestsToday: 56,
    requestsThisMonth: 890,
  },
  {
    id: 3,
    name: 'Testing',
    keyPrefix: 'gk_test_***',
    status: 'REVOKED',
    createdAt: '2024-01-01',
    lastUsedAt: '2024-02-15',
    requestsToday: 0,
    requestsThisMonth: 0,
  },
];

export default function ApiKeysPage() {
  const [apiKeys] = useState(mockApiKeys);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  const [keyOpened, { open: openKey, close: closeKey }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
    },
  });

  const handleCreateKey = form.onSubmit((values) => {
    // Mock API call - generate a fake key
    const generatedKey = `gk_${values.name.toLowerCase()}_${Math.random().toString(36).substring(2, 15)}`;
    setNewKey(generatedKey);
    closeCreate();
    openKey();
    form.reset();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'REVOKED':
        return 'red';
      case 'EXPIRED':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>API Keys</Title>
          <Text c="dimmed">Manage your API keys for authentication</Text>
        </div>
        <Button leftSection={<IconPlus size={16} />} onClick={openCreate}>
          Create New Key
        </Button>
      </Group>

      <Card withBorder radius="md" p={0}>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md" horizontalSpacing="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Key</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Created</Table.Th>
                <Table.Th>Last Used</Table.Th>
                <Table.Th>Requests Today</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {apiKeys.map((key) => (
                <Table.Tr key={key.id}>
                  <Table.Td>
                    <Group gap="xs">
                      <IconKey size={16} />
                      <Text fw={500}>{key.name}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Code>{key.keyPrefix}</Code>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(key.status)} variant="light">
                      {key.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{key.createdAt}</Table.Td>
                  <Table.Td>{key.lastUsedAt || 'Never'}</Table.Td>
                  <Table.Td>{key.requestsToday.toLocaleString()}</Table.Td>
                  <Table.Td>
                    <Menu shadow="md" width={160} position="bottom-end">
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <IconDots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item leftSection={<IconRefresh size={14} />}>
                          Regenerate
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                          Revoke
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>

      {/* Create Key Modal */}
      <Modal opened={createOpened} onClose={closeCreate} title="Create New API Key" centered>
        <form onSubmit={handleCreateKey}>
          <Stack>
            <TextInput
              label="Key Name"
              placeholder="e.g., Production, Development"
              required
              {...form.getInputProps('name')}
            />
            <Text size="sm" c="dimmed">
              Choose a descriptive name for your API key. This helps you identify it later.
            </Text>
            <Group justify="flex-end">
              <Button variant="subtle" onClick={closeCreate}>
                Cancel
              </Button>
              <Button type="submit">Create Key</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Show New Key Modal */}
      <Modal
        opened={keyOpened}
        onClose={closeKey}
        title="Your New API Key"
        centered
        closeOnClickOutside={false}
      >
        <Stack>
          <Alert icon={<IconAlertCircle size={16} />} color="orange" variant="light">
            Make sure to copy your API key now. You won't be able to see it again!
          </Alert>

          <Box
            p="md"
            style={{
              background: 'var(--mantine-color-dark-7)',
              borderRadius: 8,
              border: '1px solid var(--mantine-color-dark-4)',
            }}
          >
            <Group justify="space-between" wrap="nowrap">
              <Code
                style={{
                  background: 'transparent',
                  wordBreak: 'break-all',
                  flex: 1,
                }}
              >
                {newKey}
              </Code>
              <CopyButton value={newKey || ''}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied!' : 'Copy'}>
                    <ActionIcon variant="subtle" onClick={copy}>
                      {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Box>

          <Button onClick={closeKey} fullWidth>
            I've Saved My Key
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}

