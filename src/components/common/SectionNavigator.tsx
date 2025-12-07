import { useEffect, useState, useRef } from 'react';
import { Box, Tooltip, useMantineTheme } from '@mantine/core';
import { useWindowScroll, useMediaQuery } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'cta', label: 'Get Started' },
];

export default function SectionNavigator() {
  const [scroll] = useWindowScroll();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [sectionPositions, setSectionPositions] = useState<Map<string, number>>(new Map());
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Calculate section positions
  const calculatePositions = () => {
    const positions = new Map<string, number>();
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        positions.set(section.id, element.offsetTop);
      }
    });
    setSectionPositions(positions);
  };

  useEffect(() => {
    calculatePositions();

    // Recalculate on window resize
    const handleResize = () => {
      calculatePositions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use Intersection Observer to detect active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Find the entry with the highest intersection ratio
      let maxRatio = 0;
      let activeId = 'hero';

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });

      if (maxRatio > 0) {
        setActiveSection(activeId);
      }
    }, observerOptions);

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observerRef.current?.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Use requestAnimationFrame for smoother animation
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = Math.min(800, Math.abs(distance) * 0.5); // Adaptive duration
      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  // Calculate progress indicator position
  const getProgress = () => {
    if (sectionPositions.size === 0) return 0;

    const scrollPosition = scroll.y + window.innerHeight * 0.3; // 30% from top
    const positions = Array.from(sectionPositions.values()).sort((a, b) => a - b);
    const firstSection = positions[0] || 0;
    const lastSection = positions[positions.length - 1] || 0;
    const totalHeight = lastSection - firstSection;

    if (totalHeight <= 0) return 0;

    const progress = Math.min(
      100,
      Math.max(0, ((scrollPosition - firstSection) / totalHeight) * 100)
    );

    return progress;
  };

  const progress = getProgress();

  // Hide on mobile
  if (isMobile) {
    return null;
  }

  return (
    <Box
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Progress line */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: '100%',
          background: isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}
      />
      {/* Progress indicator */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: `${progress}%`,
          background: 'linear-gradient(180deg, #22d3ee 0%, #3b82f6 100%)',
          borderRadius: 2,
          transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Section markers */}
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <Tooltip
            key={section.id}
            label={section.label}
            position="left"
            withArrow
            arrowSize={6}
          >
            <Box
              onClick={() => scrollToSection(section.id)}
              style={{
                position: 'relative',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: isActive
                  ? 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)'
                  : isDark
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(0, 0, 0, 0.3)',
                border: isActive
                  ? '2px solid transparent'
                  : `2px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive
                  ? '0 0 12px rgba(34, 211, 238, 0.5)'
                  : 'none',
                transform: isActive ? 'scale(1.3)' : 'scale(1)',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.background = isDark
                    ? 'rgba(255, 255, 255, 0.5)'
                    : 'rgba(0, 0, 0, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = isDark
                    ? 'rgba(255, 255, 255, 0.3)'
                    : 'rgba(0, 0, 0, 0.3)';
                }
              }}
              aria-label={`Scroll to ${section.label}`}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
}

