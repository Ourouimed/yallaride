import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

export default function DirectorProfile({ profile, setProfile }) {
  const [roleData, setRoleData] = useState({
    role: "director",
    institution: "",
  });


  useEffect(() => {
    if (profile?.roleform) {
      setRoleData({
        role: profile.roleform.role || "driver",
        institution: profile.roleform.institution || "",
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
        <CardTitle>Director Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 flex items-center gap-2 w-full">
          <div className="w-full mb-0">
            <Label htmlFor="licencePlate">Institution name</Label>
            <Input
              id="institution"
              type="text"
              placeholder="Enter licence plate"
              value={roleData.institution}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
