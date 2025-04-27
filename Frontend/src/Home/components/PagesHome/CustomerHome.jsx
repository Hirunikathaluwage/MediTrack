import React from 'react';
import { HeroSection } from '../customer/HeroSection';
import { FeaturesSection } from '../customer/FeaturesSection';
import { ServicesSection } from '../customer/ServicesSection';
import { TestimonialsSection } from '../customer/TestimonialsSection';
import { CTASection } from '../customer/CTASection';

export function CustomerHome() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
export default CustomerHome;