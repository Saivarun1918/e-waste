import { useState, useRef, useCallback } from "react";
import { Camera, Upload, MapPin, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WasteType, wasteTypeLabels } from "@/types/ewaste";
import { toast } from "sonner";

interface ReportFormProps {
  onSubmit?: (data: { image: File; location: { lat: number; lng: number }; wasteType?: WasteType }) => void;
}

const wasteTypes: { value: WasteType; label: string }[] = [
  { value: "mobile_phone", label: "📱 Mobile Phone" },
  { value: "battery", label: "🔋 Battery" },
  { value: "pcb", label: "🔌 Circuit Board" },
  { value: "tv_appliance", label: "📺 TV / Appliance" },
  { value: "computer", label: "💻 Computer" },
  { value: "other", label: "🔧 Other E-Waste" },
];

type VerificationState = "idle" | "verifying" | "success" | "failed";

export function ReportForm({ onSubmit }: ReportFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationAddress, setLocationAddress] = useState<string | null>(null);
  const [selectedWasteType, setSelectedWasteType] = useState<WasteType | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  const [confidence, setConfidence] = useState<number>(0);
  const [detectedType, setDetectedType] = useState<WasteType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = useCallback((file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Simulate AI verification
    simulateVerification();
  }, []);

  const simulateVerification = () => {
    setVerificationState("verifying");
    
    // Simulate AI processing delay
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.2) {
        // 80% chance of success
        const types: WasteType[] = ["mobile_phone", "battery", "pcb", "tv_appliance", "computer"];
        const detected = types[Math.floor(Math.random() * types.length)];
        const conf = 0.75 + Math.random() * 0.2; // 75-95% confidence
        
        setVerificationState("success");
        setConfidence(conf);
        setDetectedType(detected);
        setSelectedWasteType(detected);
        toast.success("E-waste detected successfully!");
      } else {
        setVerificationState("failed");
        setConfidence(0.3 + Math.random() * 0.2);
        setDetectedType("non_ewaste");
        toast.error("Could not verify e-waste in image");
      }
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageSelect(file);
    }
  };

  const getLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      setLocationAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      toast.success("Location captured!");
    } catch {
      toast.error("Could not get location. Please enable GPS.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSubmit = () => {
    if (!image || !location) {
      toast.error("Please add an image and location");
      return;
    }
    
    if (verificationState !== "success") {
      toast.error("Image verification failed");
      return;
    }

    onSubmit?.({
      image,
      location,
      wasteType: selectedWasteType || undefined,
    });

    // Reset form
    setImage(null);
    setImagePreview(null);
    setLocation(null);
    setLocationAddress(null);
    setSelectedWasteType(null);
    setVerificationState("idle");
    setConfidence(0);
    setDetectedType(null);
    
    toast.success("Report submitted successfully!");
  };

  return (
    <Card variant="elevated" className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Report E-Waste
        </CardTitle>
        <CardDescription>
          Upload a photo and we'll verify it with AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image Upload Area */}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer",
            "hover:border-primary/50 hover:bg-primary/5",
            imagePreview ? "border-primary/50 bg-primary/5" : "border-border"
          )}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />
          
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              
              {/* Verification Overlay */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center rounded-lg transition-all duration-300",
                verificationState === "verifying" && "bg-background/80",
                verificationState === "success" && "bg-success/20",
                verificationState === "failed" && "bg-destructive/20"
              )}>
                {verificationState === "verifying" && (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <span className="text-sm font-medium">Analyzing image...</span>
                  </div>
                )}
                {verificationState === "success" && (
                  <div className="flex flex-col items-center gap-2 animate-scale-in">
                    <CheckCircle className="h-10 w-10 text-success" />
                    <Badge variant="success" className="text-sm">
                      {(confidence * 100).toFixed(0)}% Confidence
                    </Badge>
                    {detectedType && (
                      <span className="text-sm text-muted-foreground">
                        Detected: {wasteTypeLabels[detectedType]}
                      </span>
                    )}
                  </div>
                )}
                {verificationState === "failed" && (
                  <div className="flex flex-col items-center gap-2 animate-scale-in">
                    <XCircle className="h-10 w-10 text-destructive" />
                    <Badge variant="destructive">Not Verified</Badge>
                    <span className="text-sm text-muted-foreground">
                      Could not detect e-waste
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Tap to take a photo or drop an image
              </p>
            </div>
          )}
        </div>

        {/* Location Button */}
        <Button
          variant={location ? "success" : "outline"}
          className="w-full gap-2"
          onClick={getLocation}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          {location ? locationAddress : "Get Current Location"}
        </Button>

        {/* Waste Type Selection (Optional) */}
        {verificationState === "success" && (
          <div className="space-y-3 animate-fade-in">
            <label className="text-sm font-medium">
              Confirm or change detected type:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {wasteTypes.map(({ value, label }) => (
                <Button
                  key={value}
                  variant={selectedWasteType === value ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "justify-start",
                    selectedWasteType === value && "glow-primary"
                  )}
                  onClick={() => setSelectedWasteType(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          disabled={!image || !location || verificationState !== "success"}
          onClick={handleSubmit}
        >
          Submit Report
        </Button>
      </CardContent>
    </Card>
  );
}
