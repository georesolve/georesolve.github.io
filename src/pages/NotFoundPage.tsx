import { Container, Title, Text, Button, Group, Box } from '@mantine/core';
import { IconHome, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Container size="md" py={100}>
        <Box ta="center">
          <Title
            order={1}
            size={120}
            fw={900}
            c="cyan"
            style={{
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            404
          </Title>
          <Title order={2} size={32} mb="md">
            Trang không tìm thấy
          </Title>
          <Text c="dimmed" size="lg" mb="xl" maw={500} mx="auto">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại. Có thể địa chỉ URL đã bị thay đổi hoặc trang đã bị xóa.
          </Text>
          <Group justify="center" gap="md">
            <Button
              size="lg"
              variant="filled"
              leftSection={<IconHome size={20} />}
              onClick={() => navigate('/')}
            >
              Về trang chủ
            </Button>
            <Button
              size="lg"
              variant="outline"
              leftSection={<IconArrowLeft size={20} />}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </Group>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

