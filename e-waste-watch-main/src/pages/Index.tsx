import { Layout } from "@/components/layout/Layout";
import { ReportForm } from "@/components/report/ReportForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Recycle, MapPin, Shield, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Recycle,
    title: "AI-Powered Verification",
    description: "Our CNN model instantly classifies e-waste with 95% accuracy",
  },
  {
    icon: MapPin,
    title: "GPS Auto-Tagging",
    description: "Automatic location capture for precise hotspot mapping",
  },
  {
    icon: Shield,
    title: "Fraud Prevention",
    description: "Low-confidence reports are filtered to maintain data quality",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "ML-driven risk zone prediction for proactive cleanup",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
        </div>

        <div className="container relative z-10 px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 animate-fade-in">
                <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/50">
                  <Zap className="h-3 w-3 mr-1 text-primary" />
                  AI-Powered Detection
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Report E-Waste.
                <br />
                <span className="text-gradient-primary">Protect Our Planet.</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Join the fight against illegal e-waste dumping. Our AI instantly verifies 
                reports and maps hotspots in real-time, helping authorities take action faster.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link to="/map">
                  <Button variant="outline" size="lg" className="gap-2">
                    <MapPin className="h-4 w-4" />
                    View Hotspot Map
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="ghost" size="lg" className="gap-2">
                    Admin Dashboard
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div>
                  <p className="text-3xl font-bold font-display text-primary">156+</p>
                  <p className="text-sm text-muted-foreground">Reports Filed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-display text-success">95%</p>
                  <p className="text-sm text-muted-foreground">AI Accuracy</p>
                </div>
                <div>
                  <p className="text-3xl font-bold font-display text-accent">5</p>
                  <p className="text-sm text-muted-foreground">Active Hotspots</p>
                </div>
              </div>
            </div>

            {/* Right side - Report Form */}
            <div className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
              <ReportForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Smart E-Waste Monitoring
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines AI image verification with real-time mapping 
              to create an effective e-waste tracking system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                variant="interactive"
                className="p-6 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card variant="glass" className="p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Every report helps create a cleaner environment. Start by uploading 
                a photo of e-waste you've spotted in your area.
              </p>
              <Button variant="hero" size="xl" className="gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Recycle className="h-5 w-5" />
                Report Now
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
