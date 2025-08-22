import React from 'react'
import '../../utils/cssFiles/landingPage.css'
import { Badge, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import {Clock, Heart, MapPin } from 'lucide-react';
import { MobileView } from './MobileView';
import { useQuery } from '@tanstack/react-query';
import { getAllPatients } from '../../api/patient.api';
import { Patient } from '../../types/types';




const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "in-progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "delayed":
      return "bg-red-100 text-red-800 border-red-200";
    case "cancelled":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
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


  function useIsMobile() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    return isMobile;
}

export const WaitingRoom = () => {

    const fetchData = useQuery({
      queryKey: ["patients"],
      queryFn: getAllPatients,
    });

    // Debug logging

    const PatientData = fetchData.data?.data ? fetchData.data.data : [];

    const [currentTime, setCurrentTime] = React.useState(new Date());
    const surgeries = PatientData;
    const [currentPage, setCurrentPage] = React.useState(0);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(surgeries.length / itemsPerPage);


    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 30000);
      return () => clearInterval(timer);
    }, []);


    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 10000);
      return () => clearInterval(timer);
    }, [totalPages]);


  const activeSurgeries = surgeries.filter(
    (surgery: Patient) => surgery.status !== "cancelled"
  );

  const paginatedSurgeries = activeSurgeries.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const isMobile = useIsMobile();

  if (fetchData.isLoading) {
    return <div>Loading...</div>;
  }

  if (fetchData.isError) {
    return <div>Error loading data</div>;
  }

  if (isMobile) {
    return <MobileView />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center font-bold items-center text-blue-400  gap-3 mb-4">
            <Heart className="w-8 h-8 sm:w-12 sm:h-12 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xlbg-clip-text">
              Surgery Update Board
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-lg sm:text-xl lg:text-2xl text-gray-600/40">
            <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
            <span className="transition-all duration-300">
              {currentTime.toLocaleDateString()} •{" "}
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-600/70 mb-8 animate-fade-in">
            Today's Surgery Schedule
          </h2>

          <div
            className="hidden lg:block bg-card rounded-lg shadow-card border-2 overflow-hidden animate-scale-in"
            style={{ border: "1px solid red" }}
          >
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ minWidth: 170 }}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "hsl(215, 25%, 15%)",
                          p: 3,
                        }}
                      >
                        Patient
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170 }}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "hsl(215, 25%, 15%)",
                          p: 3,
                        }}
                      >
                        Contact Info
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170 }}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "hsl(215, 25%, 15%)",
                          p: 3,
                        }}
                      >
                        Location
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170 }}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "hsl(215, 25%, 15%)",
                          p: 3,
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170 }}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "hsl(215, 25%, 15%)",
                          p: 3,
                        }}
                      >
                        Start Time
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170 }}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "hsl(215, 25%, 15%)",
                        }}
                      >
                        Date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedSurgeries.map(
                      
                      (surgery: Patient) => (
                        <TableRow
                          key={surgery.patient_number}
                          sx={{
                            borderBottom: "1px solid rgba(0,0,0,0.12)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.04)",
                              transform: "scale(1.01)",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            },
                          }}
                        >
                          <TableCell sx={{ padding: "1.5rem" }}>
                            <div className="space-y-1">
                              <div
                                className="text-lg font-bold"
                                style={{ color: "hsl(215, 25%, 15%)" }}
                              >
                                {surgery.first_name} {surgery.last_name}
                              </div>
                              <div className="text-sm text-gray-600/70">
                                {surgery.patient_number}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell sx={{ padding: "1.5rem" }}>
                            <div className="space-y-1">
                              <div className="text-lg">
                                {surgery.contact_email}
                              </div>
                              <div className="text-sm text-gray-600/70">
                                {surgery.phone_number}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell sx={{ padding: "1.5rem" }}>
                            <div className="space-y-1">
                              <div
                                className="text-lg"
                                style={{ color: "hsl(215, 25%, 15%)" }}
                              >
                                {surgery.city}, {surgery.region}
                              </div>
                              <div className="text-sm text-gray-400/70">
                                {surgery.postcode}, {surgery.country}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell sx={{ padding: "1.5rem" }}>
                            <Badge
                              className={`${getStatusColor(
                                surgery.status
                              )} text-sm px-3 py-1 font-semibold transition-all duration-300 hover:scale-105`}
                              sx={{ borderRadius: "50px" }}
                            >
                              {surgery.status.charAt(0).toUpperCase() +
                                surgery.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell sx={{ padding: "1.5rem" }}>
                            <div className="space-y-1">
                              <div
                                className="text-lg font-semibold text-gray-600/60"
                              >
                                {new Date(
                                  surgery.created_at
                                ).toLocaleTimeString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell sx={{ padding: "1.5rem" }}>
                            <div className="space-y-1">
                              <div
                                className="text-lg font-semibold"
                                style={{ color: "hsl(215, 25%, 15%)" }}
                              >
                                {new Date(
                                  surgery.created_at
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {paginatedSurgeries.map((surgery: Patient, index: number) => (
              <div
                key={surgery.patient_number}
                className="bg-card rounded-lg shadow-card border-2 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3
                        className="text-xl font-bold"
                        // style={{ color: "hsl(215, 25%, 15%)" }}
                      >
                        {surgery.first_name} {surgery.last_name}
                      </h3>
                      <p className="text-sm  text-gray-600/70">
                        {surgery.patient_number}
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(
                        surgery.status
                      )} text-sm px-3 py-1 font-semibold transition-all duration-300 hover:scale-105 self-start sm:self-center`}
                    >
                      {getStatusText(surgery.status)}
                    </Badge>
                  </div>

                  <div className="border-t pt-3">
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: "hsl(215, 25%, 15%)" }}
                    >
                      Contact Info
                    </h4>
                    <div className="space-y-1">
                      <div className="text-lg text-gray-600/40">
                        {surgery.contact_email}
                      </div>
                      <div className="text-sm text-gray-600/70">
                        {surgery.phone_number}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-400/6 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-600/40" />
                      <h4 className="font-semibold text-gray-600">Location</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600/40">Street Address</p>
                        <p className="text-gray-600 font-medium">
                          {surgery.street_address}
                        </p>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t pt-3">
                    <div>
                      <h4 className="font-semibold mb-1">Time</h4>
                      <p className="text-lg text-gray-600/70">
                        {new Date(surgery.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "hsl(215, 25%, 15%)" }}
                      >
                        Date
                      </h4>
                      <p className="text-gray-600/70">
                        {new Date(surgery.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-1 animate-fade-in">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                index === currentPage
                  ? "bg-blue-400 scale-125 shadow-lg"
                  : "bg-blue-950 hover:bg-gray-600/40 scale-100"
              }`}
            />
          ))}
        </div>

        <div className="text-center pt-8 animate-fade-in">
          <p className="text-base sm:text-lg">
            For questions or concerns, please speak with the front desk staff.
          </p>
          <p className="text-xs sm:text-sm mt-2">
            This display updates automatically • Page {currentPage + 1} of{" "}
            {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
}