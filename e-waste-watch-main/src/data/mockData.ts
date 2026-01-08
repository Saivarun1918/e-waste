import { Report, Hotspot, DashboardStats, WasteType } from "@/types/ewaste";

// Mock reports data
export const mockReports: Report[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg",
    location: { lat: 28.6139, lng: 77.2090, address: "Connaught Place, New Delhi" },
    wasteType: "mobile_phone",
    confidence: 0.94,
    status: "verified",
    createdAt: new Date("2024-01-15"),
    verificationResult: {
      isEwaste: true,
      confidence: 0.94,
      detectedType: "mobile_phone",
      timestamp: new Date("2024-01-15"),
    },
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg",
    location: { lat: 28.5355, lng: 77.3910, address: "Sector 18, Noida" },
    wasteType: "battery",
    confidence: 0.87,
    status: "verified",
    createdAt: new Date("2024-01-14"),
    verificationResult: {
      isEwaste: true,
      confidence: 0.87,
      detectedType: "battery",
      timestamp: new Date("2024-01-14"),
    },
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg",
    location: { lat: 28.4595, lng: 77.0266, address: "Cyber City, Gurgaon" },
    wasteType: "pcb",
    confidence: 0.91,
    status: "pending",
    createdAt: new Date("2024-01-16"),
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg",
    location: { lat: 28.6304, lng: 77.2177, address: "Karol Bagh, New Delhi" },
    wasteType: "tv_appliance",
    confidence: 0.78,
    status: "verified",
    createdAt: new Date("2024-01-13"),
    verificationResult: {
      isEwaste: true,
      confidence: 0.78,
      detectedType: "tv_appliance",
      timestamp: new Date("2024-01-13"),
    },
  },
  {
    id: "5",
    imageUrl: "/placeholder.svg",
    location: { lat: 28.5672, lng: 77.2100, address: "Nehru Place, New Delhi" },
    wasteType: "computer",
    confidence: 0.96,
    status: "cleaned",
    createdAt: new Date("2024-01-10"),
    verificationResult: {
      isEwaste: true,
      confidence: 0.96,
      detectedType: "computer",
      timestamp: new Date("2024-01-10"),
    },
  },
  {
    id: "6",
    imageUrl: "/placeholder.svg",
    location: { lat: 28.6517, lng: 77.2219, address: "Chandni Chowk, New Delhi" },
    wasteType: "non_ewaste",
    confidence: 0.45,
    status: "rejected",
    createdAt: new Date("2024-01-12"),
    verificationResult: {
      isEwaste: false,
      confidence: 0.45,
      detectedType: "non_ewaste",
      timestamp: new Date("2024-01-12"),
    },
  },
];

// Mock hotspots data
export const mockHotspots: Hotspot[] = [
  {
    id: "h1",
    center: { lat: 28.5672, lng: 77.2100 },
    radius: 500,
    severity: "high",
    reportCount: 15,
    lastReportDate: new Date("2024-01-16"),
  },
  {
    id: "h2",
    center: { lat: 28.6139, lng: 77.2090 },
    radius: 400,
    severity: "moderate",
    reportCount: 8,
    lastReportDate: new Date("2024-01-15"),
  },
  {
    id: "h3",
    center: { lat: 28.4595, lng: 77.0266 },
    radius: 300,
    severity: "low",
    reportCount: 3,
    lastReportDate: new Date("2024-01-14"),
  },
  {
    id: "h4",
    center: { lat: 28.6800, lng: 77.1500 },
    radius: 450,
    severity: "high",
    reportCount: 0,
    lastReportDate: new Date("2024-01-17"),
    isPredicted: true,
  },
  {
    id: "h5",
    center: { lat: 28.5000, lng: 77.3000 },
    radius: 350,
    severity: "moderate",
    reportCount: 0,
    lastReportDate: new Date("2024-01-18"),
    isPredicted: true,
  },
];

// Mock dashboard stats
export const mockStats: DashboardStats = {
  totalReports: 156,
  verifiedReports: 128,
  rejectedReports: 12,
  activeHotspots: 5,
  cleanedLocations: 16,
  pendingReports: 16,
};

// Waste type distribution for charts
export const wasteTypeDistribution: { type: WasteType; count: number }[] = [
  { type: "mobile_phone", count: 42 },
  { type: "battery", count: 35 },
  { type: "computer", count: 28 },
  { type: "tv_appliance", count: 22 },
  { type: "pcb", count: 15 },
  { type: "other", count: 14 },
];

// Weekly trend data
export const weeklyTrend = [
  { day: "Mon", reports: 12, verified: 10 },
  { day: "Tue", reports: 18, verified: 15 },
  { day: "Wed", reports: 15, verified: 12 },
  { day: "Thu", reports: 22, verified: 19 },
  { day: "Fri", reports: 28, verified: 24 },
  { day: "Sat", reports: 35, verified: 30 },
  { day: "Sun", reports: 26, verified: 22 },
];
