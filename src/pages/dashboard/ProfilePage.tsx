import {
  Title,
  Text,
  Card,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Avatar,
  Stack,
  Box,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [saved, setSaved] = useState(false);

  const profileForm = useForm({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
    validate: {
      username: (value) => (value.length < 3 ? 'Username must be at least 3 characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const passwordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: (value) => (value.length < 6 ? 'Password required' : null),
      newPassword: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.newPassword ? 'Passwords do not match' : null,
    },
  });

  const handleProfileSubmit = profileForm.onSubmit(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  });

  const handlePasswordSubmit = passwordForm.onSubmit(() => {
    // Handle password change
    passwordForm.reset();
  });

  return (
    <Box>
      <Title order={2} mb="xl">Profile Settings</Title>

      {saved && (
        <Alert icon={<IconCheck size={16} />} color="green" variant="light" mb="xl">
          Profile updated successfully!
        </Alert>
      )}

      <Card withBorder radius="md" p="xl" mb="xl">
        <Group align="flex-start" wrap="nowrap" gap="xl">
          <Avatar
            size={100}
            radius="xl"
            color="cyan"
            style={{ fontSize: 36 }}
          >
            {user?.username?.[0]?.toUpperCase()}
          </Avatar>

          <div style={{ flex: 1 }}>
            <Text fw={600} size="xl" mb="xs">{user?.username}</Text>
            <Text c="dimmed" mb="md">{user?.email}</Text>
            <Group gap="xs">
              <Button variant="light" size="sm">
                Change Avatar
              </Button>
              <Button variant="subtle" size="sm" color="red">
                Remove
              </Button>
            </Group>
          </div>
        </Group>
      </Card>

      <Card withBorder radius="md" p="xl" mb="xl">
        <Group mb="lg">
          <IconUser size={20} />
          <Text fw={600}>Profile Information</Text>
        </Group>

        <form onSubmit={handleProfileSubmit}>
          <Stack gap="md">
            <TextInput
              label="Username"
              placeholder="Your username"
              {...profileForm.getInputProps('username')}
            />
            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...profileForm.getInputProps('email')}
            />
            <Group justify="flex-end">
              <Button type="submit">Save Changes</Button>
            </Group>
          </Stack>
        </form>
      </Card>

      <Card withBorder radius="md" p="xl" mb="xl">
        <Group mb="lg">
          <IconAlertCircle size={20} />
          <Text fw={600}>Change Password</Text>
        </Group>

        <form onSubmit={handlePasswordSubmit}>
          <Stack gap="md">
            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
              {...passwordForm.getInputProps('currentPassword')}
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              {...passwordForm.getInputProps('newPassword')}
            />
            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              {...passwordForm.getInputProps('confirmPassword')}
            />
            <Group justify="flex-end">
              <Button type="submit">Update Password</Button>
            </Group>
          </Stack>
        </form>
      </Card>

      <Card withBorder radius="md" p="xl" style={{ borderColor: 'var(--mantine-color-red-6)' }}>
        <Group mb="lg">
          <Text fw={600} c="red">Danger Zone</Text>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text fw={500}>Delete Account</Text>
              <Text size="sm" c="dimmed">
                Permanently delete your account and all associated data
              </Text>
            </div>
            <Button color="red" variant="outline">
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Card>
    </Box>
  );
}

