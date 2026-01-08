import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { weeklyTrend, wasteTypeDistribution } from "@/data/mockData";
import { wasteTypeLabels } from "@/types/ewaste";

const COLORS = [
  "hsl(174, 72%, 45%)", // primary
  "hsl(35, 92%, 55%)",  // accent
  "hsl(152, 70%, 45%)", // success
  "hsl(45, 95%, 55%)",  // warning
  "hsl(0, 72%, 55%)",   // destructive
  "hsl(200, 15%, 40%)", // muted
];

export function ReportsTrendChart() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Weekly Report Trend</CardTitle>
        <CardDescription>Reports submitted and verified over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyTrend}>
              <defs>
                <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174, 72%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(174, 72%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(152, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(152, 70%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 15%, 20%)" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(200, 10%, 55%)"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(200, 10%, 55%)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(200, 18%, 12%)",
                  border: "1px solid hsl(200, 15%, 20%)",
                  borderRadius: "8px",
                  color: "hsl(180, 10%, 95%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="reports"
                stroke="hsl(174, 72%, 45%)"
                fillOpacity={1}
                fill="url(#colorReports)"
                strokeWidth={2}
                name="Total Reports"
              />
              <Area
                type="monotone"
                dataKey="verified"
                stroke="hsl(152, 70%, 45%)"
                fillOpacity={1}
                fill="url(#colorVerified)"
                strokeWidth={2}
                name="Verified"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function WasteTypeChart() {
  const data = wasteTypeDistribution.map(item => ({
    name: wasteTypeLabels[item.type],
    value: item.count,
  }));

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Waste Type Distribution</CardTitle>
        <CardDescription>Breakdown by e-waste category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="hsl(200, 20%, 8%)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(200, 18%, 12%)",
                  border: "1px solid hsl(200, 15%, 20%)",
                  borderRadius: "8px",
                  color: "hsl(180, 10%, 95%)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-muted-foreground truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
