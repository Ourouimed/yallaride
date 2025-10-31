import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

export default function DriverProfile({ profile, setProfile }) {
  const [roleData, setRoleData] = useState({
    role: "driver",
    carModel: "",
    licencePlate: "",
  });


  useEffect(() => {
    if (profile?.roleform) {
      setRoleData({
        role: profile.roleform.role || "driver",
        carModel: profile.roleform.carModel || "",
        licencePlate: profile.roleform.licencePlate || "",
      });
    }
  }, [profile?.roleform]);
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updated = { ...roleData, [id]: value };
    setRoleData(updated);
    setProfile((prev) => ({ ...prev, roleform: updated }));
  };

  return (
    <Card>
      <CardHeader className="!pb-3 border-b border-border">
        <CardTitle>Driver Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 flex items-center gap-2 w-full">
          <div className="w-full mb-0">
            <Label htmlFor="carModel">Car Model</Label>
            <Input
              id="carModel"
              type="text"
              placeholder="Enter car model"
              value={roleData.carModel}
              onChange={handleChange}
            />
          </div>
          <div className="w-full mb-0">
            <Label htmlFor="licencePlate">Licence Plate</Label>
            <Input
              id="licencePlate"
              type="text"
              placeholder="Enter licence plate"
              value={roleData.licencePlate}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
