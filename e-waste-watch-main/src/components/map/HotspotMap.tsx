import { Hotspot } from "@/types/ewaste";
import { mockHotspots } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HotspotMapProps {
  hotspots?: Hotspot[];
  onHotspotClick?: (hotspot: Hotspot) => void;
}

export function HotspotMap({ hotspots = mockHotspots, onHotspotClick }: HotspotMapProps) {
  const getSeverityColor = (severity: Hotspot["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-destructive";
      case "moderate":
        return "bg-warning";
      case "low":
        return "bg-success";
    }
  };

  const getSeverityBadge = (severity: Hotspot["severity"]) => {
    switch (severity) {
      case "high":
        return "hotspot";
      case "moderate":
        return "moderate";
      case "low":
        return "clean";
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-card rounded-xl border border-border overflow-hidden">
      {/* Map Background - Simulated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Hotspot Markers */}
      <div className="absolute inset-0">
        {hotspots.map((hotspot) => {
          // Convert lat/lng to percentage positions (simplified)
          const x = ((hotspot.center.lng - 76.5) / 1.5) * 100;
          const y = ((29 - hotspot.center.lat) / 1) * 100;
          
          return (
            <div
              key={hotspot.id}
              className={cn(
                "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              )}
              style={{ left: `${Math.max(10, Math.min(90, x))}%`, top: `${Math.max(10, Math.min(90, y))}%` }}
              onClick={() => onHotspotClick?.(hotspot)}
            >
              {/* Pulse ring effect */}
              <div className={cn(
                "absolute inset-0 rounded-full animate-pulse-ring",
                getSeverityColor(hotspot.severity),
                "opacity-40"
              )} />
              
              {/* Main marker */}
              <div className={cn(
                "relative w-8 h-8 rounded-full flex items-center justify-center",
                getSeverityColor(hotspot.severity),
                "shadow-lg transition-transform duration-300 group-hover:scale-125",
                hotspot.isPredicted && "border-2 border-dashed border-foreground/50"
              )}>
                {hotspot.isPredicted ? (
                  <TrendingUp className="h-4 w-4 text-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-foreground" />
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <Card variant="glass" className="p-3 min-w-[180px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getSeverityBadge(hotspot.severity) as any}>
                      {hotspot.severity.toUpperCase()}
                    </Badge>
                    {hotspot.isPredicted && (
                      <Badge variant="accent" className="text-xs">
                        Predicted
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium">
                    {hotspot.reportCount} reports
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last: {hotspot.lastReportDate.toLocaleDateString()}
                  </p>
                </Card>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <Card variant="glass" className="absolute bottom-4 left-4 p-4">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Hotspot Legend
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">High Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Low / Clean</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-dashed border-muted-foreground" />
            <span className="text-xs text-muted-foreground">Predicted Risk</span>
          </div>
        </div>
      </Card>

      {/* Map Title Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        <Card variant="glass" className="p-3">
          <h3 className="font-display font-semibold">Delhi NCR Region</h3>
          <p className="text-xs text-muted-foreground">Real-time e-waste hotspots</p>
        </Card>
        
        <Card variant="glass" className="p-3 text-right">
          <p className="text-2xl font-bold text-primary">{hotspots.length}</p>
          <p className="text-xs text-muted-foreground">Active Zones</p>
        </Card>
      </div>
    </div>
  );
}
