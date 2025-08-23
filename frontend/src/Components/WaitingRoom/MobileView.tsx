// making life easier for mobile users
import { Card, CardContent,  InputAdornment, TextField} from '@mui/material';
import React from "react";
import '../../utils/cssFiles/landingPage.css'
import {Clock, Heart, Search, User } from 'lucide-react';
// import { Box } from '@mui/material';
import { getAllPatients } from '../../api/patient.api';
import { useQuery } from '@tanstack/react-query';
import { Patient } from '../../types/types';
import { SurgeryCard } from '../Dashboard/SugeryCard';



export const MobileView = () => {

  const fetchData = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });

      // Debug logging

  const PatientData = fetchData.data?.data ? fetchData.data.data : [];
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [searchQuery, setSearchQuery] = React.useState("");
  const [surgeries] = React.useState(PatientData);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Filter surgeries based on search query (patient name or guardian name)
  const filteredSurgeries = surgeries
    .filter((surgery: Patient) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const patientName =
        `${surgery.first_name} ${surgery.last_name}`.toLowerCase();
      const guardianName = surgery.contact_name?.toLowerCase() || "";

      return patientName.includes(query) || guardianName.includes(query);
    })
    .filter((surgery: Patient) => surgery.status !== "cancelled");
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
            filteredSurgeries.map((surgery: Patient) => (
              <SurgeryCard key={surgery.patient_number} surgery={surgery} showMenu={false} showName={false} showContact={false} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
