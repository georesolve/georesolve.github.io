import { Box } from '@mantine/core';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import CTASection from '@/components/landing/CTASection';
import SectionNavigator from '@/components/common/SectionNavigator';

export default function HomePage() {
  return (
    <Box>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
      <SectionNavigator />
    </Box>
  );
}

