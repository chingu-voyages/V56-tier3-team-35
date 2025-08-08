import React from 'react'
import '../../utils/cssFiles/landingPage.css'
import { Badge, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import {Clock, Heart } from 'lucide-react';
import { MobileView } from './MobileView';


//dummy data

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
  {
    patient_number: "PT007",
    first_name: "Michael",
    last_name: "Brown",
    street_address: "147 Oak Park Dr",
    city: "Joliet",
    postcode: "60431",
    region: "IL",
    country: "USA",
    phone_number: "(555) 789-0123",
    contact_email: "michael.brown@email.com",
    created_at: "2024-01-15T12:30:00Z",
    status: "in-progress",
    procedure: "Cataract Surgery",
    surgeon: "Dr. Michael Thompson",
    room: "OR-3",
    startTime: "12:30",
    estimatedDuration: 1,
    guardianName: "Lisa Brown",
    guardianPhone: "(555) 789-0123",
    estimatedCompletion: "13:30",
  },
  {
    patient_number: "PT007",
    first_name: "Michael",
    last_name: "Brown",
    street_address: "147 Oak Park Dr",
    city: "Joliet",
    postcode: "60431",
    region: "IL",
    country: "USA",
    phone_number: "(555) 789-0123",
    contact_email: "michael.brown@email.com",
    created_at: "2024-01-15T12:30:00Z",
    status: "in-progress",
    procedure: "Cataract Surgery",
    surgeon: "Dr. Michael Thompson",
    room: "OR-3",
    startTime: "12:30",
    estimatedDuration: 1,
    guardianName: "Lisa Brown",
    guardianPhone: "(555) 789-0123",
    estimatedCompletion: "13:30",
  },
  {
    patient_number: "PT007",
    first_name: "Michael",
    last_name: "Brown",
    street_address: "147 Oak Park Dr",
    city: "Joliet",
    postcode: "60431",
    region: "IL",
    country: "USA",
    phone_number: "(555) 789-0123",
    contact_email: "michael.brown@email.com",
    created_at: "2024-01-15T12:30:00Z",
    status: "in-progress",
    procedure: "Cataract Surgery",
    surgeon: "Dr. Michael Thompson",
    room: "OR-3",
    startTime: "12:30",
    estimatedDuration: 1,
    guardianName: "Lisa Brown",
    guardianPhone: "(555) 789-0123",
    estimatedCompletion: "13:30",
  }
];

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
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [surgeries] = React.useState(
      mockWaitingRoomSurgeries
    );
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
    (surgery) => surgery.status !== "cancelled"
  );

  const paginatedSurgeries = activeSurgeries.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const isMobile = useIsMobile();

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
                        Procedure
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
                        Room/Surgeon
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
                        Time
                      </TableCell>
                      <TableCell
                        style={{ minWidth: 170 }}
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "hsl(215, 25%, 15%)",
                        }}
                      >
                        Guardian
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedSurgeries.map((surgery, index) => (
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
                          <div
                            className="text-lg"
                            // style={{ color: "hsl(215, 25%, 15%)" }}
                          >
                            {surgery.procedure}
                          </div>
                        </TableCell>
                        <TableCell sx={{ padding: "1.5rem" }}>
                          <div className="space-y-1">
                            <div
                              className="text-lg font-semibold"
                              style={{ color: "hsl(215, 25%, 15%)" }}
                            >
                              {surgery.room}
                            </div>
                            <div className="text-sm  text-gray-600/70">
                              {surgery.surgeon}
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
                            <span>{getStatusText(surgery.status)}</span>
                          </Badge>
                        </TableCell>

                        <TableCell sx={{ padding: "1.5rem" }}>
                          <div className="space-y-1">
                            <div
                              className="text-lg font-semibold"
                              style={{ color: "hsl(215, 25%, 15%)" }}
                            >
                              {surgery.startTime}
                            </div>
                            {surgery.estimatedCompletion && (
                              <div className="text-sm text-gray-600/70">
                                Est: {surgery.estimatedCompletion}
                              </div>
                            )}
                            <div className="text-sm text-gray-600/70">
                              {surgery.estimatedDuration}h
                            </div>
                          </div>
                        </TableCell>

                        <TableCell sx={{ padding: "1.5rem" }}>
                          <div className="space-y-1">
                            <div
                              className="text-lg font-semibold"
                              style={{ color: "hsl(215, 25%, 15%)" }}
                            >
                              {surgery.guardianName}
                            </div>
                            <div className="text-sm  text-gray-600/70">
                              {surgery.guardianPhone}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {paginatedSurgeries.map((surgery, index) => (
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
                      Procedure
                    </h4>
                    <p
                      className="text-lg"
                      style={{ color: "hsl(215, 25%, 15%)" }}
                    >
                      {surgery.procedure}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "hsl(215, 25%, 15%)" }}
                      >
                        Room
                      </h4>
                      <p
                        className="text-lg"
                        style={{ color: "hsl(215, 25%, 15%)" }}
                      >
                        {surgery.room}
                      </p>
                    </div>
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "hsl(215, 25%, 15%)" }}
                      >
                        Surgeon
                      </h4>
                      <p className=" text-gray-600/70">
                      {surgery.surgeon}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t pt-3">
                    <div>
                      <h4
                        className="font-semibold mb-1"
                      >
                        Start Time
                      </h4>
                      <p
                        className="text-lg text-gray-600/70"
                      
                      >
                        {surgery.startTime}
                      </p>
                    </div>
                    {surgery.estimatedCompletion && (
                      <div>
                        <h4
                          className="font-semibold mb-1"
                          style={{ color: "hsl(215, 25%, 15%)" }}
                        >
                          Est. Completion
                        </h4>
                        <p className='text-gray-600/70'>
                          {surgery.estimatedCompletion}
                        </p>
                      </div>
                    )}
                    <div>
                      <h4
                        className="font-semibold mb-1"
                        style={{ color: "hsl(215, 25%, 15%)" }}
                      >
                        Duration
                      </h4>
                      <p className="text-gray-600/70">
                        {surgery.estimatedDuration}h
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: "hsl(215, 25%, 15%)" }}
                    >
                      Family Contact
                    </h4>
                    <p
                      className="text-lg"
                      style={{ color: "hsl(215, 25%, 15%)" }}
                    >
                      {surgery.guardianName}
                    </p>
                    <p className="text-sm text-gray-600/70">
                      {surgery.guardianPhone}
                    </p>
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

        <div className="text-center text-muted-foreground pt-8 animate-fade-in">
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