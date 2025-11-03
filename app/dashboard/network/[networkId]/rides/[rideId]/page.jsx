"use client"

import DashboardLayout from "@/app/dashboard/dashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNetwork } from "@/context/NetworksContext"
import {
  Clock,
  MapPin,
  Navigation,
  Users,
  Car,
  MoveRight,
  User,
  Info,
} from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RidePage() {
  const { rideId, networkId } = useParams()
  const { getRide, isLoading } = useNetwork()
  const { user } = useAuth()

  const [rideData, setRideData] = useState(null)
  const [seatsToBook, setSeatsToBook] = useState(1)

  useEffect(() => {
    const fetchRide = async () => {
      const data = await getRide(rideId, networkId)
      setRideData(data)
    }

    if (rideId) fetchRide()
  }, [rideId, networkId, getRide])

  const handleBookSeats = () => {
    if (!rideData) return
    console.log(`Booked ${seatsToBook} seats for ride ${rideId}`)
  }

  return (
    <DashboardLayout>
        {rideData ? <div className="space-y-5 p-3 md:p-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl font-semibold">Ride Details</h2>
          {rideData && (
            <p className="text-sm text-muted-foreground">
              Ride ID: <span className="font-medium">{rideId}</span>
            </p>
          )}
        </div>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        )}

        {!isLoading && rideData && (
          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-5">
            {/* === LEFT SIDE (Ride Info) === */}
            <div className="space-y-4">
              {/* Ride Summary */}
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

              {/* Driver & Car Info */}
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
                    <span className="font-medium text-foreground">
                      Name:
                    </span>{" "}
                    {rideData.driver?.fullname || "Unknown"}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Email:
                    </span>{" "}
                    {rideData.driver?.email || "Not provided"}
                  </p>
                  <p>
                    <Car className="inline size-4 mr-1" />{" "}
                    <span className="font-medium text-foreground">
                      Car Model:
                    </span>{" "}
                    {rideData.driver?.roleform.carModel || "Not specified"}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Car Plate:
                    </span>{" "}
                    {rideData.driver?.roleform.licencePlate || "—"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
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
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {rideData.passengers.map((p, i) => (
                          <li key={i}>{p.fullname}</li>
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

              {user?.role === "passanger" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <Users className="size-4" />
                      Book Your Seats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
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
                        seatsToBook > rideData.available_seats
                      }
                      className="w-full"
                    >
                      Book {seatsToBook} Seat
                      {seatsToBook > 1 ? "s" : ""} (
                      {rideData.price * seatsToBook} MAD)
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div> : <p>Ride unfound!!</p>}
      
    </DashboardLayout>
  )
}
