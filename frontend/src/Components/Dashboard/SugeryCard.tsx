import { Card, Typography, Box, Badge, CardContent } from "@mui/material";
import '../../utils/cssFiles/landingPage.css'
import React from "react";
import { Calendar, MapPin, Phone, User } from "lucide-react";
import LongMenu from "../Dropdown";
import { Patient } from "../../types/types";




//status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-500/10 text-blue-600 border-blue-200";
    case "in-progress":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
    case "completed":
      return "bg-green-500/10 text-green-600 border-green-200";
    case "delayed":
      return "bg-red-500/10 text-red-600 border-red-200";
    case "cancelled":
      return "bg-gray-500/10 text-gray-600 border-gray-200";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-200";
  }
};

export const SurgeryCard = ({ surgery }: {surgery: Patient}) => {
  return (
    <Card
      key={surgery.patient_number}
      className="border-1 border-gray-400/5"
      sx={{ borderRadius: "15px" }}
    >
      <Box sx={{ paddingBottom: "0.75rem", padding: "1.5rem" }}>
        <div className="flex items-start justify-between">
          <div>
            <Typography
              // variant="h6"
              sx={{ fontSize: "1.25rem" }}
              className="text-black"
            >
              {surgery.first_name} {surgery.last_name}
            </Typography>
            <p className="text-sm text-gray-600/40 mt-1">
              Patient {surgery.patient_number}
            </p>
          </div>
          <LongMenu />
        </div>
      </Box>
      <div className="flex items-center justify-between px-4">
        <Badge className={`${getStatusColor(surgery.status)} font-semibold p-2 rounded-lg px-3`}>
         {surgery.status.charAt(0).toUpperCase() + surgery.status.slice(1)}
        </Badge>
        <div className="flex items-center gap-1 text-xs ">
          <Calendar className="w-3 h-3" />
          <span>{surgery.created_at.split("T")[0]}</span>
        </div>
      </div>

      <CardContent className="space-y-4">

        <div className="p-3 bg-gray-400/6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-600/40" />
            <h4 className="font-semibold text-gray-600">Location</h4>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-600/40">Street Address</p>
              <p className="text-gray-600 font-medium">{surgery.street_address}</p>
            </div>
            {surgery.region && (
              <div>
                <p className="text-gray-600/40">Region:</p>
                <p className="text-gray-600 font-medium">
                  {surgery.region}
                </p>
              </div>
            )}
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm font-medium">
              City: {surgery.city}
            </p>
          </div>
        </div>

        <div className="p-3 bg-blue-400/5 rounded-lg border border-blue-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4  text-blue-400" />
            <h4 className="font-semibold text-gray-400">Your Contact Info</h4>
          </div>
          <p className="font-medium">{surgery.contact_email}</p>
          <p className="text-sm text-gray-600/40">{surgery.phone_number}</p>
        </div>
      </CardContent>
    </Card>
  );
};
