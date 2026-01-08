import { Recycle, MapPin, Shield, TrendingUp } from "lucide-react";

export interface Report {
  id: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  wasteType: WasteType;
  confidence: number;
  status: ReportStatus;
  createdAt: Date;
  verificationResult?: VerificationResult;
}

export type WasteType = 
  | "mobile_phone"
  | "battery"
  | "pcb"
  | "tv_appliance"
  | "computer"
  | "other"
  | "non_ewaste";

export type ReportStatus = "pending" | "verified" | "rejected" | "cleaned";

export interface VerificationResult {
  isEwaste: boolean;
  confidence: number;
  detectedType: WasteType;
  timestamp: Date;
}

export interface Hotspot {
  id: string;
  center: {
    lat: number;
    lng: number;
  };
  radius: number;
  severity: "high" | "moderate" | "low";
  reportCount: number;
  lastReportDate: Date;
  isPredicted?: boolean;
}

export interface DashboardStats {
  totalReports: number;
  verifiedReports: number;
  rejectedReports: number;
  activeHotspots: number;
  cleanedLocations: number;
  pendingReports: number;
}

export const wasteTypeLabels: Record<WasteType, string> = {
  mobile_phone: "Mobile Phone",
  battery: "Battery",
  pcb: "Circuit Board (PCB)",
  tv_appliance: "TV / Appliance",
  computer: "Computer / Laptop",
  other: "Other E-Waste",
  non_ewaste: "Non E-Waste",
};

export const wasteTypeIcons: Record<WasteType, typeof Recycle> = {
  mobile_phone: MapPin,
  battery: Shield,
  pcb: TrendingUp,
  tv_appliance: Recycle,
  computer: Recycle,
  other: Recycle,
  non_ewaste: Recycle,
};
