import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  Group,
  Divider,
  Box,
  Alert,
  Stack,
  Checkbox,
  Progress,
  useMantineColorScheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandGithub, IconBrandGoogle, IconAlertCircle } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/store/languageStore';
import Logo from '@/components/common/Logo';

function getPasswordStrength(password: string) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validate: {
      username: (value) => (value.length < 3 ? t.auth.register.usernameError : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t.auth.register.emailError),
      password: (value) => (value.length < 8 ? t.auth.register.passwordError : null),
      confirmPassword: (value, values) =>
        value !== values.password ? t.auth.register.passwordMismatch : null,
      terms: (value) => (!value ? t.auth.register.termsError : null),
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      if (response.success && response.data) {
        setAuth(response.data.user, response.data.accessToken, response.data.refreshToken);
        navigate('/dashboard');
      } else {
        setError(response.error || t.auth.register.registerFailed);
      }
    },
    onError: (err: Error) => {
      setError(err.message || t.auth.register.registerError);
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    setError(null);
    registerMutation.mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  });

  const passwordStrength = getPasswordStrength(form.values.password);
  const strengthColors = ['red', 'orange', 'yellow', 'lime', 'green'];

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 40,
        background: isDark ? '#0f172a' : '#f8fafc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Base gradient overlay for smooth color transition */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(135deg, #0f172a 0%, #131a28 12.5%, #172030 25%, #1a2332 37.5%, #1e293b 50%, #1a2332 62.5%, #172030 75%, #131a28 87.5%, #0f172a 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #f5f7fa 12.5%, #f1f5f9 25%, #eef2f6 37.5%, #e2e8f0 50%, #eef2f6 62.5%, #f1f5f9 75%, #f5f7fa 87.5%, #f8fafc 100%)',
          opacity: 0.95,
        }}
      />

      {/* Background decorations - Simplified for cleaner look */}
      <Box
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          background: isDark
            ? 'radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.03) 30%, transparent 70%)'
            : 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.04) 30%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.6,
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          background: isDark
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.03) 30%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 30%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.6,
        }}
      />

      <Container
        size="sm"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '480px',
        }}
      >
        <Box ta="center" mb="xl">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="lg" />
          </Link>
        </Box>

        <Paper
          radius="lg"
          p={{ base: 'lg', sm: 'xl' }}
          withBorder
          shadow="md"
          style={{
            background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Title order={2} ta="center" mb="xs" size="h2">
            {t.auth.register.title}
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb="lg">
            {t.auth.register.haveAccount}{' '}
            <Anchor component={Link} to="/login" size="sm">
              {t.auth.register.signIn}
            </Anchor>
          </Text>

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label={t.auth.register.username}
                placeholder={t.auth.register.usernamePlaceholder}
                required
                {...form.getInputProps('username')}
              />

              <TextInput
                label={t.auth.register.email}
                placeholder={t.auth.register.emailPlaceholder}
                required
                {...form.getInputProps('email')}
              />

              <div>
                <PasswordInput
                  label={t.auth.register.password}
                  placeholder={t.auth.register.passwordPlaceholder}
                  required
                  {...form.getInputProps('password')}
                />
                {form.values.password && (
                  <Progress
                    value={(passwordStrength / 5) * 100}
                    color={strengthColors[passwordStrength - 1] || 'gray'}
                    size="xs"
                    mt="xs"
                  />
                )}
              </div>

              <PasswordInput
                label={t.auth.register.confirmPassword}
                placeholder={t.auth.register.confirmPasswordPlaceholder}
                required
                {...form.getInputProps('confirmPassword')}
              />

              <Checkbox
                label={
                  <Text size="sm">
                    {t.auth.register.agreeTerms}
                  </Text>
                }
                {...form.getInputProps('terms', { type: 'checkbox' })}
              />

              <Button
                fullWidth
                type="submit"
                variant="gradient"
                gradient={{ from: 'cyan', to: 'blue' }}
                loading={registerMutation.isPending}
                size="md"
              >
                {t.auth.register.createAccount}
              </Button>
            </Stack>
          </form>

          <Divider label={t.auth.register.orContinueWith} labelPosition="center" my="lg" />

          <Group grow>
            <Button variant="default" leftSection={<IconBrandGoogle size={16} />}>
              Google
            </Button>
            <Button variant="default" leftSection={<IconBrandGithub size={16} />}>
              GitHub
            </Button>
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}
