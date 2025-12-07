import { useEffect, useState } from 'react';
import { ActionIcon, Transition } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';

export default function ScrollToTop() {
  const [scroll] = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show button when scrolled down more than 400px
    setVisible(scroll.y > 400);
  }, [scroll.y]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Transition mounted={visible} transition="fade" duration={300} timingFunction="ease">
      {(styles) => (
        <ActionIcon
          variant="gradient"
          gradient={{ from: 'cyan', to: 'blue' }}
          size="xl"
          radius="xl"
          onClick={scrollToTop}
          style={{
            ...styles,
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(34, 211, 238, 0.4)',
          }}
          aria-label="Scroll to top"
        >
          <IconArrowUp size={20} />
        </ActionIcon>
      )}
    </Transition>
  );
}

