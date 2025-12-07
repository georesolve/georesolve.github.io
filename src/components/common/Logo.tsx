import { Group, Text, Box } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'md' as const },
    md: { icon: 28, text: 'xl' as const },
    lg: { icon: 36, text: '2xl' as const },
  };

  return (
    <Group gap="xs">
      <Box
        style={{
          background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
          borderRadius: 8,
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconMapPin size={sizes[size].icon} color="white" stroke={2} />
      </Box>
      <Text
        size={sizes[size].text}
        fw={700}
        style={{
          letterSpacing: '-0.5px',
        }}
      >
        Geo<span className="gradient-text">Resolve</span>
      </Text>
    </Group>
  );
}

