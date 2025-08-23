import { Card, Typography, Box, Badge, CardContent } from "@mui/material";
import '../../utils/cssFiles/landingPage.css'
// import React from "react";
import { Calendar, MapPin, Phone, User } from "lucide-react";
import LongMenu from "../Dropdown";
import { Patient } from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatientApi } from "../../api/patient.api";
import { toast } from "react-toastify";




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

export const SurgeryCard = ({ surgery, showMenu, showContact, showName }: {surgery: Patient, showMenu: boolean, showContact: boolean, showName: boolean}) => {

  //delete patient
  const queryClient = useQueryClient()

  const deletePatient = useMutation({
    mutationFn: async(id: number)=>{
      return deletePatientApi(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient deleted successfully");
      window.location.reload();
    },
    onError:(error) => {
      console.log(error);
      toast.error("Error deleting patient");
    }
  })


  const handleDelete = (id: number) => {
    deletePatient.mutate(id)
  }
  return (
    <Card
      key={surgery.patient_number}
      className="border-1 border-gray-400/5"
      sx={{ borderRadius: "15px" }}
    >
      <Box sx={{ paddingBottom: "0.75rem", padding: "1.5rem" }}>
        <div className="flex items-start justify-between">
          <div>
          {showName && (
            <>
            <Typography
              // variant="h6"
              sx={{ fontSize: "1.25rem" }}
              className="text-black"
            >
              {surgery.first_name} {surgery.last_name}
            </Typography>
            <p className="text-gray-400  mt-1">
              Patient <span className="font-semibold text-gray-500">{surgery.patient_number}</span>
            </p>
          </>
          )}
            {!showName && <p className="text-gray-600 text-2xl mt-1">
              Patient <span className="font-semibold">{surgery.patient_number}</span>
            </p>}
          </div>
          {showMenu && (
            <LongMenu
              onDelete={() => handleDelete(surgery?.id)}
              onEdit={surgery}
            />
          )}
        </div>
      </Box>
      <div className="flex items-center justify-between px-4">
        <Badge
          className={`${getStatusColor(
            surgery.status
          )} font-semibold p-2 rounded-lg px-3`}
        >
          {surgery.status.charAt(0).toUpperCase() + surgery.status.slice(1)}
        </Badge>
        <div className="flex items-center gap-1 text-xs ">
          <Calendar className="w-3 h-3" />
          <span>{surgery.created_at.split("T")[0]}</span>
        </div>
      </div>

      <CardContent className="space-y-4">
        <div className="p-3 bg-gray-400/6 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-1">Procedure</h4>
          <p className="text-gray-600">{surgery.procedure}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-400/6 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-600/40" />
              <h4 className="font-semibold text-600 text-sm">Room</h4>
            </div>
            <p className="text-gray-600  font-medium">{surgery.room}</p>
          </div>
          <div className="p-3 bg-gray-400/6 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-600" />
              <h4 className="font-semibold text-gray-600 text-sm">Surgeon</h4>
            </div>
            <p className="text-gray-600 text-sm">{surgery.surgeon}</p>
          </div>
        </div>

        <div className="p-3 bg-gray-400/6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-400/80" />
            <h4 className="font-semibold text-foreground">Schedule</h4>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-400/80">Started:</p>
              <p className=" font-medium">
                {new Date(surgery.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Est. Done:</p>
              <p className="font-medium">
                {(() => {
                  const startTime = new Date(surgery.created_at);
                  const endTime = new Date(startTime.getTime() + (surgery.duration * 60 * 60 * 1000));
                  return endTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });
                })()}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-500 text-sm">Duration: {surgery.duration}h</p>
          </div>
        </div>
      { showContact &&(
        <div className="p-3 bg-blue-400/5 rounded-lg border border-blue-400/20">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4  text-blue-400" />
            <h4 className="font-semibold text-gray-400">Patient Contact Info</h4>
          </div>
          <p className="font-medium">{surgery.contact_name}</p>
          <p className="text-sm text-gray-600/40">{surgery.phone_number}</p>
        </div>
          )
      }
      </CardContent>
    </Card>
  );
};
