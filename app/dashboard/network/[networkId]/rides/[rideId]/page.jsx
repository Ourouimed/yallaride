"use client";

import DashboardLayout from "@/app/dashboard/dashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNetwork } from "@/context/NetworksContext";
import {
  Clock,
  MapPin,
  Navigation,
  Users,
  Car,
  MoveRight,
  User,
  Info,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RidePage() {
  const { rideId, networkId } = useParams();
  const { getRide, isLoading, bookRide } = useNetwork();
  const { user } = useAuth();

  const [rideData, setRideData] = useState(null);
  const [seatsToBook, setSeatsToBook] = useState(1);

  useEffect(() => {
    const fetchRide = async () => {
      const data = await getRide(rideId, networkId);
      setRideData(data);
    };
    if (rideId) fetchRide();
  }, [rideId, networkId, getRide]);

  const handleBookSeats = async () => {
    if (!rideData) return;
    await bookRide({ ...rideData, rideId }, seatsToBook, networkId);
  };

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date.seconds ? date.seconds * 1000 : date);
    return d.toLocaleString();
  };

  
  const currentBooking = rideData?.passengers?.find(
    (p) => p.id === user?.uid
  );

  return (
    <DashboardLayout>
      {rideData ? (
        <div className="space-y-5 p-3 md:p-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-2xl font-semibold">Ride Details</h2>
            <p className="text-sm text-muted-foreground">
              Ride ID: <span className="font-medium">{rideId}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-5">
            {/* LEFT SIDE */}
            <div className="space-y-4">
              {/* Ride Info */}
              <Card>
                <CardHeader className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-secondary flex items-center justify-center">
                    <Car className="text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-3">
                      {rideData.departure} <MoveRight className="size-4" />{" "}
                      {rideData.arrival}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="size-4" />
                      {rideData.departure_date} at {rideData.departure_time}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <MapPin className="inline size-4 mr-1" />{" "}
                    <span className="font-medium">Departure:</span>{" "}
                    {rideData.departure}
                  </p>
                  <p>
                    <Navigation className="inline size-4 mr-1" />{" "}
                    <span className="font-medium">Arrival:</span>{" "}
                    {rideData.arrival}
                  </p>
                  <p>
                    <Users className="inline size-4 mr-1" />{" "}
                    <span className="font-medium">Seats Available:</span>{" "}
                    {rideData.available_seats}
                  </p>
                  <p>
                    <Info className="inline size-4 mr-1" />{" "}
                    <span className="font-medium">Description:</span>{" "}
                    {rideData.ride_description || "No description provided."}
                  </p>
                </CardContent>
              </Card>

              {/* Driver Info */}
              <Card>
                <CardHeader className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-secondary flex items-center justify-center">
                    <User className="text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    Driver Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <span className="font-medium text-foreground">Name:</span>{" "}
                    {rideData.driver?.fullname || "Unknown"}
                  </p>
                  <p>
                    <Mail className="inline size-4 mr-1" />{" "}
                    <span className="font-medium text-foreground">Email:</span>{" "}
                    {rideData.driver?.email || "Not provided"}
                  </p>
                  <p>
                    <Phone className="inline size-4 mr-1" />{" "}
                    <span className="font-medium text-foreground">Phone:</span>{" "}
                    {rideData.driver?.phone || "Not provided"}
                  </p>
                  <p>
                    <Car className="inline size-4 mr-1" />{" "}
                    <span className="font-medium text-foreground">
                      Car Model:
                    </span>{" "}
                    {rideData.driver?.roleform?.carModel || "Not specified"}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Car Plate:
                    </span>{" "}
                    {rideData.driver?.roleform?.licencePlate || "—"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-4">
              {/* Passenger List (visible to driver/director) */}
              {(user?.role === "driver" || user?.role === "director") && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Users className="size-4" />
                      Passengers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {rideData?.passengers?.length > 0 ? (
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {rideData.passengers.map((p, i) => (
                          <li
                            key={i}
                            className="border rounded-lg p-2 hover:bg-accent transition"
                          >
                            <p className="font-medium text-foreground">
                              {p.fullname}
                            </p>
                            <p className="flex items-center gap-1">
                              <Mail className="size-3" /> {p.email}
                            </p>
                            <p className="flex items-center gap-1">
                              <Phone className="size-3" /> {p.phone}
                            </p>
                            <p>
                              Seats booked:{" "}
                              <span className="font-medium text-foreground">
                                {p.seats || 1}
                              </span>
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="size-3" />{" "}
                              {formatDate(p.booked_at)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No passengers yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Passenger booking section */}
              {user?.role === "passenger" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Users className="size-4" />
                      Book Your Seats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentBooking ? (
                      <div className="border rounded-md p-3 bg-secondary/30">
                        <p className="font-medium text-foreground">
                          You’ve already booked this ride.
                        </p>
                        <p className="text-sm">
                          <strong>Seats:</strong> {currentBooking.seats || 1}
                        </p>
                        <p className="text-sm">
                          <strong>Booked at:</strong>{" "}
                          {formatDate(currentBooking.booked_at)}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Choose how many seats you’d like to reserve.
                        </p>
                        <Input
                          type="number"
                          min={1}
                          max={rideData.available_seats}
                          value={seatsToBook}
                          onChange={(e) =>
                            setSeatsToBook(
                              Math.min(
                                Math.max(1, Number(e.target.value)),
                                rideData.available_seats
                              )
                            )
                          }
                          className="w-24"
                        />
                        <Button
                          onClick={handleBookSeats}
                          disabled={
                            seatsToBook < 1 ||
                            seatsToBook > rideData.available_seats ||
                            rideData.available_seats == 0 ||
                            isLoading
                          }
                          className="w-full"
                        >
                          {isLoading
                            ? "Booking..."
                            : `Book ${seatsToBook} Seat${
                                seatsToBook > 1 ? "s" : ""
                              } (${rideData.price * seatsToBook} MAD)`}
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center p-5 text-muted-foreground">Ride not found.</p>
      )}
    </DashboardLayout>
  );
}
