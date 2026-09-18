import { About } from "@/components/landing/about";
import { Contact } from "@/components/landing/contact";
import { Hero } from "@/components/landing/hero";
import { Locations } from "@/components/landing/locations";
import { Services } from "@/components/landing/services";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Testimonials } from "@/components/landing/testimonials";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Locations />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
