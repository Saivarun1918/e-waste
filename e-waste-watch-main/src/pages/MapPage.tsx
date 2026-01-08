import { Layout } from "@/components/layout/Layout";
import { HotspotMap } from "@/components/map/HotspotMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockHotspots } from "@/data/mockData";
import { AlertTriangle, TrendingUp, MapPin } from "lucide-react";

export default function MapPage() {
  const activeHotspots = mockHotspots.filter(h => !h.isPredicted);
  const predictedHotspots = mockHotspots.filter(h => h.isPredicted);
  const highSeverity = mockHotspots.filter(h => h.severity === "high").length;

  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold">Hotspot Map</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time visualization of e-waste dumping hotspots and predicted risk zones
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card variant="stat" className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-muted-foreground">High Severity</span>
              </div>
              <p className="text-2xl font-bold font-display text-destructive">{highSeverity}</p>
            </CardContent>
          </Card>
          
          <Card variant="stat" className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Active Hotspots</span>
              </div>
              <p className="text-2xl font-bold font-display text-primary">{activeHotspots.length}</p>
            </CardContent>
          </Card>
          
          <Card variant="stat" className="border-accent/30 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Predicted Zones</span>
              </div>
              <p className="text-2xl font-bold font-display text-accent">{predictedHotspots.length}</p>
            </CardContent>
          </Card>
          
          <Card variant="stat" className="border-success/30 bg-success/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Total Reports</span>
              </div>
              <p className="text-2xl font-bold font-display text-success">
                {mockHotspots.reduce((acc, h) => acc + h.reportCount, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Map */}
        <div className="mb-8">
          <HotspotMap />
        </div>

        {/* Hotspot List */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Active Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockHotspots.map((hotspot) => (
                <Card 
                  key={hotspot.id}
                  variant="interactive"
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant={
                        hotspot.severity === "high" ? "hotspot" :
                        hotspot.severity === "moderate" ? "moderate" : "clean"
                      }
                    >
                      {hotspot.severity.toUpperCase()}
                    </Badge>
                    {hotspot.isPredicted && (
                      <Badge variant="accent" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Predicted
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium mb-1">
                    {hotspot.reportCount} reports
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lat: {hotspot.center.lat.toFixed(4)}, Lng: {hotspot.center.lng.toFixed(4)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last activity: {hotspot.lastReportDate.toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
