import React from 'react';
import { Header } from '../organisms/Header';
import { HeroSection } from '../organisms/HeroSection';
import { FeaturesSection } from '../organisms/FeaturesSection';
import { ToolsSection } from '../organisms/ToolsSection';
import { Footer } from '../organisms/Footer';
<<<<<<< HEAD
import { Toaster } from '../atoms/Toaster';
=======
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
<<<<<<< HEAD
      <Toaster />
=======
>>>>>>> edc90ae9d01d058319cc19df8fec8eef9c19285e
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ToolsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}; 