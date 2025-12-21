import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loder from "../Components/Loder";

const AssignDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const {  data: services = [], refetch: refetchServices } = useQuery({
    queryKey: ["services", "Pending", "Rejected"],
    queryFn: async () => {
      const res = await axiosSecure.get("/booking?workStatus=Pending&workStatus=Rejected");
      return res.data;
    },
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["decorator", "available"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "decorator?status=Approved&currentStatus=Available"
      );
      return res.data;
    },
  });

  if(!services){
    return <Loder></Loder>
  }

  console.log("Services:", services);
  console.log("Decorators:", decorators);

  // Handle opening the modal
  const handleAssignClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleAssignDecorator = async (decorator) => {
    if (!selectedService || !decorator) return;

    setIsAssigning(true);
    const decoratorInfo = {
      decoratorId: decorator._id,
      decoratorEmail: decorator.email,
      decoratorName: decorator.fullName,
      packageId: selectedService._id,
    };

    axiosSecure.patch(`/booking/${selectedService._id}`, decoratorInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Decorator Assigned",
            text: `You have assigned ${decorator.fullName} to this task`,
            icon: "success",
          });
          refetchServices();
          handleCloseModal();
        }
      });
    setIsAssigning(false);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="">
          <h1 className="text-4xl p-5 font-bold">Assign Decorator</h1>
        </div>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Work Status</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="">
                    <h1 className="text-md font-bold">
                      {service.packageTitle}
                    </h1>
                    <h1>{service.bookingDate}</h1>
                  </div>
                </td>
                <td>{service.location}</td>
                <td>
                  <div className="badge badge-accent">{service.workStatus}</div>
                </td>
                <td>
                  <div className="badge badge-secondary">{service.status}</div>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleAssignClick(service)}
                  >
                    Assign Decorator
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">
              Assign Decorator to: {selectedService?.packageTitle}
            </h3>

            {/* Service Details */}
            <div className="bg-base-200 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Service:</span>{" "}
                  {selectedService?.packageTitle}
                </div>
                <div>
                  <span className="font-semibold">Date:</span>{" "}
                  {selectedService?.bookingDate}
                </div>
                <div>
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedService?.location}
                </div>
              </div>
            </div>

            {/* Available Decorators Table */}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Decorator Info</th>
                    <th>Business Details</th>
                    <th>Experience & Area</th>
                    <th>Contact</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {decorators && decorators.length > 0 ? (
                    decorators.map((decorator) => (
                      <tr key={decorator._id} className="hover">
                        {/* Decorator Info */}
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded-full">
                                <img
                                  src={
                                    decorator.photoURL ||
                                    `https://ui-avatars.com/api/?name=${decorator.fullName}&background=628141&color=fff`
                                  }
                                  alt={decorator.fullName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-base">
                                {decorator.fullName}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Business Details */}
                        <td className="py-4">
                          <div>
                            <div className="font-semibold text-secondary">
                              {decorator.businessName}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {decorator.specialties &&
                                decorator.specialties.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {decorator.specialties
                                      .slice(0, 2)
                                      .map((specialty, index) => (
                                        <span
                                          key={index}
                                          className="badge badge-outline badge-xs"
                                        >
                                          {specialty}
                                        </span>
                                      ))}
                                    {decorator.specialties.length > 2 && (
                                      <span className="badge badge-outline badge-xs">
                                        +{decorator.specialties.length - 2}
                                      </span>
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        </td>

                        {/* Experience & Area */}
                        <td className="py-4">
                          <div>
                            <div className="font-medium">
                              {decorator.yearsOfExperience || "N/A"}
                            </div>
                            <div className="text-sm text-gray-600">
                              {decorator.serviceArea || "N/A"}
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-4">
                          <div className="text-sm">
                            <div>{decorator.email}</div>
                            <div className="text-gray-600">
                              {decorator.phoneNumber || "N/A"}
                            </div>
                          </div>
                        </td>

                        {/* Action */}
                        <td className="py-4">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleAssignDecorator(decorator)}
                            disabled={isAssigning}
                          >
                            {isAssigning ? "Assigning..." : "Assign"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-gray-500"
                      >
                        No available decorators found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                className="btn"
                onClick={handleCloseModal}
                disabled={isAssigning}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignDecorator;
