// making life easier for mobile users
import { Badge, Card, CardContent,  InputAdornment, TextField, Typography } from '@mui/material';
import React from "react";
import '../../utils/cssFiles/landingPage.css'
import {Calendar, Clock, Heart, MapPin, Phone, Search, User } from 'lucide-react';
import { Box } from '@mui/material';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockWaitingRoomSurgeries: Array<any> = [
  {
    patient_number: "PT001",
    first_name: "John",
    last_name: "Anderson",
    street_address: "123 Oak Street",
    city: "Springfield",
    postcode: "62701",
    region: "IL",
    country: "USA",
    phone_number: "(555) 123-4567",
    contact_email: "john.anderson@email.com",
    created_at: "2024-01-15T08:00:00Z",
    status: "in-progress",
    procedure: "Knee Replacement",
    surgeon: "Dr. Sarah Mitchell",
    room: "OR-1",
    startTime: "08:00",
    estimatedDuration: 3,
    guardianName: "Mary Anderson",
    guardianPhone: "(555) 123-4567",
    estimatedCompletion: "11:00",
  },
  {
    patient_number: "PT002",
    first_name: "Maria",
    last_name: "Rodriguez",
    street_address: "456 Maple Avenue",
    city: "Chicago",
    postcode: "60601",
    region: "IL",
    country: "USA",
    phone_number: "(555) 234-5678",
    contact_email: "maria.rodriguez@email.com",
    created_at: "2024-01-15T09:30:00Z",
    status: "scheduled",
    procedure: "Appendectomy",
    surgeon: "Dr. James Wilson",
    room: "OR-2",
    startTime: "09:30",
    estimatedDuration: 1.5,
    guardianName: "Carlos Rodriguez",
    guardianPhone: "(555) 234-5678",
    estimatedCompletion: "11:00",
  },
  {
    patient_number: "PT003",
    first_name: "Robert",
    last_name: "Chen",
    street_address: "789 Pine Road",
    city: "Rockford",
    postcode: "61101",
    region: "IL",
    country: "USA",
    phone_number: "(555) 345-6789",
    contact_email: "robert.chen@email.com",
    created_at: "2024-01-15T07:00:00Z",
    status: "completed",
    procedure: "Cardiac Bypass",
    surgeon: "Dr. Michael Thompson",
    room: "OR-3",
    startTime: "07:00",
    estimatedDuration: 5,
    guardianName: "Linda Chen",
    guardianPhone: "(555) 345-6789",
    estimatedCompletion: "12:00",
  },
  {
    patient_number: "PT004",
    first_name: "Emily",
    last_name: "Davis",
    street_address: "321 Elm Street",
    city: "Peoria",
    postcode: "61602",
    region: "IL",
    country: "USA",
    phone_number: "(555) 456-7890",
    contact_email: "emily.davis@email.com",
    created_at: "2024-01-15T11:00:00Z",
    status: "delayed",
    procedure: "Gallbladder Removal",
    surgeon: "Dr. Sarah Mitchell",
    room: "OR-4",
    startTime: "11:00",
    estimatedDuration: 2,
    guardianName: "James Davis",
    guardianPhone: "(555) 456-7890",
    estimatedCompletion: "14:30",
  },
  {
    patient_number: "PT005",
    first_name: "David",
    last_name: "Kim",
    street_address: "654 Cedar Lane",
    city: "Aurora",
    postcode: "60504",
    region: "IL",
    country: "USA",
    phone_number: "(555) 567-8901",
    contact_email: "david.kim@email.com",
    created_at: "2024-01-15T14:00:00Z",
    status: "scheduled",
    procedure: "Hernia Repair",
    surgeon: "Dr. James Wilson",
    room: "OR-1",
    startTime: "14:00",
    estimatedDuration: 2,
    guardianName: "Susan Kim",
    guardianPhone: "(555) 567-8901",
    estimatedCompletion: "16:00",
  },
  {
    patient_number: "PT006",
    first_name: "Sarah",
    last_name: "Johnson",
    street_address: "987 Birch Ave",
    city: "Naperville",
    postcode: "60540",
    region: "IL",
    country: "USA",
    phone_number: "(555) 678-9012",
    contact_email: "sarah.johnson@email.com",
    created_at: "2024-01-15T16:00:00Z",
    status: "scheduled",
    procedure: "Hip Replacement",
    surgeon: "Dr. Sarah Mitchell",
    room: "OR-2",
    startTime: "16:00",
    estimatedDuration: 4,
    guardianName: "Michael Johnson",
    guardianPhone: "(555) 678-9012",
    estimatedCompletion: "20:00",
  },
];

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

const getStatusText = (status: string) => {
  switch (status) {
    case "scheduled":
      return "Scheduled";
    case "in-progress":
      return "In Surgery";
    case "completed":
      return "Completed";
    case "delayed":
      return "Delayed";
    case "cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
};




export const MobileView = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [surgeries] = React.useState(mockWaitingRoomSurgeries);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Filter surgeries based on search query (patient name or guardian name)
  const filteredSurgeries = surgeries
    .filter((surgery) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const patientName =
        `${surgery.first_name} ${surgery.last_name}`.toLowerCase();
      const guardianName = surgery.guardianName?.toLowerCase() || "";

      return patientName.includes(query) || guardianName.includes(query);
    })
    .filter((surgery) => surgery.status !== "cancelled");
  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center text-blue-400 gap-2 mb-4">
            <Heart className="w-8 h-8 animate-pulse" />
            <h1 className="text-2xl font-bold bg-clip-text ">
              Surgery Update Board
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600/40">
            <Clock className="w-4 h-4" />
            <span>
              {currentTime.toLocaleDateString()} •{" "}
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="relative">
          <TextField
            placeholder="Search for your loved one..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="w-4 h-4 text-blue-400" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              pl: 5, // pl-10 = spacing(5) = 40px
              height: "3rem", // h-12
              fontSize: "1rem", // text-base
              "& .MuiOutlinedInput-root": {
                border: "1px solid",
                borderRadius: "15px",
                borderColor: "#60a5fa",

                "&:hover fieldset": {
                  borderColor: "green",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#60a5fa", // focus:border-primary
                },
              },
            }}
          />
        </div>

        <div className="space-y-4">
          {filteredSurgeries.length === 0 ? (
            <Card className="border-1 m-6">
              <CardContent className="p-6 text-center">
                <User className="w-12 h-12 text-gray-600/40 mx-auto mb-4" />
                <p className="text-gray-600/40">
                  {searchQuery
                    ? "No patients found matching your search."
                    : "No active surgeries today."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredSurgeries.map((surgery) => (
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
                        className="text-gray-500"
                      >
                        {surgery.first_name} {surgery.last_name}
                      </Typography>
                      <p className="text-sm text-gray-600/40 mt-1">
                        Patient #{surgery.patient_number}
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(
                        surgery.status
                      )} font-semibold p-2 rounded-lg px-3`}
                    >
                      {getStatusText(surgery.status)}
                    </Badge>
                  </div>
                </Box>
                <CardContent className="space-y-4">
                  
                  <div className="p-3  bg-gray-400/6 rounded-lg">
                    <h4 className="font-semibold text-gray-600 mb-1">
                      Procedure
                    </h4>
                    <p className="text-foreground">{surgery.procedure}</p>
                  </div>

                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3  bg-gray-400/6 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gray-600/40" />
                        <h4 className="font-semibold text-gray-600 text-sm">
                          Room
                        </h4>
                      </div>
                      <p className="text-gray-600 font-medium">
                        {surgery.room}
                      </p>
                    </div>
                    <div className="p-3  bg-gray-400/6 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-600/40" />
                        <h4 className="font-semibold text-gray-600 text-sm">
                          Surgeon
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm">{surgery.surgeon}</p>
                    </div>
                  </div>

                  
                  <div className="p-3 bg-gray-400/6 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-600/40" />
                      <h4 className="font-semibold text-gray-600">Schedule</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600/40">Started:</p>
                        <p className="text-gray-600 font-medium">
                          {surgery.startTime}
                        </p>
                      </div>
                      {surgery.estimatedCompletion && (
                        <div>
                          <p className="text-gray-600/40">Est. Done:</p>
                          <p className="text-gray-600 font-medium">
                            {surgery.estimatedCompletion}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-600 text-sm">
                        Duration: {surgery.estimatedDuration}h
                      </p>
                    </div>
                  </div>

                  
                  <div className="p-3 bg-blue-400/5 rounded-lg border border-blue-400/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4  text-blue-400" />
                      <h4 className="font-semibold text-gray-400">
                        Your Contact Info
                      </h4>
                    </div>
                    <p className="font-medium">{surgery.guardianName}</p>
                    <p className="text-sm text-gray-600/40">
                      {surgery.guardianPhone}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
