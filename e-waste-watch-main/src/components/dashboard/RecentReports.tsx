import { Report } from "@/types/ewaste";
import { mockReports } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { wasteTypeLabels } from "@/types/ewaste";
import { CheckCircle, XCircle, Clock, Trash2 } from "lucide-react";

interface RecentReportsProps {
  reports?: Report[];
}

export function RecentReports({ reports = mockReports }: RecentReportsProps) {
  const getStatusIcon = (status: Report["status"]) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "cleaned":
        return <Trash2 className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "verified":
        return "success";
      case "rejected":
        return "destructive";
      case "pending":
        return "warning";
      case "cleaned":
        return "default";
    }
  };

  return (
    <Card variant="elevated" className="h-full">
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-1 p-4 pt-0">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                {/* Status Icon */}
                <div className="shrink-0">
                  {getStatusIcon(report.status)}
                </div>

                {/* Report Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm truncate">
                      {wasteTypeLabels[report.wasteType]}
                    </span>
                    <Badge variant={getStatusBadge(report.status) as any} className="shrink-0">
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {report.location.address}
                  </p>
                </div>

                {/* Confidence */}
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium">
                    {(report.confidence * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {report.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
