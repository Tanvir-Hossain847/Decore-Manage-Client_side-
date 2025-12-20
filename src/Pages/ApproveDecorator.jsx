import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loder from "../Components/Loder";
import Swal from "sweetalert2";

const ApproveDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: decorators = [],
    isLoading,
  } = useQuery({
    queryKey: ["decorator", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loder></Loder>;
  }

  const handleApproval = (id, status, email) => {
    const updateInfo = {
      status: "Approved",
      email: email,
    };
    if (status === "Approved") {
      return Swal.fire({
        title: "Decorator Already Approved",
        icon: "info",
      });
    }
    axiosSecure.patch(`/decorator/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Decorator Approved",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleRejection = (id, status) => {
    const updateInfo = {
      status: "Rejected",
    };
    if (status === "Rejected") {
      return Swal.fire({
        title: "Decorator Already Approved",
        icon: "info",
      });
    }
    axiosSecure.patch(`/decorator/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Decorator Rejected",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    axiosSecure.delete(`/decorator/${id}`).then((res) => {
      console.log(res.data);
      refetch();
       Swal.fire({
          title: "Decorator Deleted",
          icon: "success",
        });
    });
  };

  return (
    <div>
      <div className="p-5 space-y-2">
        <h1 className="text-4xl font-bold">Aprrove Decorator</h1>
        <h1 className="text-xl font-bold">
          Total {decorators.length} Request Found
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Decorators</th>
              <th>Expireience</th>
              <th>Specialties</th>
              <th>Area/Time</th>
              <th>Status</th>
              <th>Current Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorators.map((decorator, index) => (
              <tr key={decorator._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>
                  <div className="">
                    <h1 className="font-bold text-lg">{decorator.fullName}</h1>
                    <p>{decorator.email}</p>
                    <p>{decorator.phoneNumber}</p>
                    <p>{decorator.applicationDate}</p>
                  </div>
                </td>
                <td>
                  <div className="">
                    <h1 className="font-bold">
                      {decorator.yearsOfExperience} Year
                    </h1>
                  </div>
                </td>
                <td>
                  <div className="">
                    {decorator.specialties.map((special) => (
                      <div className="bg-accent w-20 px-3 py-1 text-secondary font-bold rounded-2xl flex m-2">
                        {special}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="">
                    <h1>
                      Area:{" "}
                      <span className="font-bold">{decorator.serviceArea}</span>
                    </h1>
                    <h1>
                      Available Days:{" "}
                      <span className="font-bold">
                        {decorator.availableDays}
                      </span>
                    </h1>
                  </div>
                </td>
                <td>
                  <div
                    className={`${
                      decorator.status === "Available"
                        ? "badge badge-secondary"
                        : decorator.status === "Rejected"
                        ? "badge bg-red-500 text-white"
                        : "badge badge-neutral"
                    }`}
                  >
                    {decorator.status}
                  </div>
                </td>
                <td>
                  <div
                    className={`${
                      decorator.status === "Approved"
                        ? "badge badge-secondary"
                        : decorator.status === "Not-Available"
                        ? "badge bg-red-500 text-white"
                        : "badge badge-neutral"
                    }`}
                  >
                    {decorator.currentStatus}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <button
                      onClick={() =>
                        handleApproval(decorator._id, decorator.status, decorator.email)
                      }
                      className={`${
                        decorator.status === "Approved" ||
                        decorator.status === "Rejected"
                          ? "btn btn-disabled"
                          : "btn btn-secondary"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleRejection(decorator._id, decorator.status)
                      }
                      className={`${
                        decorator.status === "Approved" ||
                        decorator.status === "Rejected"
                          ? "btn btn-disabled"
                          : "btn btn-accent"
                      }`}
                    >
                      Reject
                    </button>
                    {(decorator.status === "Approved" && (
                      <button
                        onClick={() => handleDelete(decorator._id)}
                        className="btn btn-neutral text-white"
                      >
                        Delete
                      </button>
                    )) ||
                      (decorator.status === "Rejected" && (
                        <button 
                        onClick={() => handleDelete(decorator._id)}
                        className="btn btn-neutral text-white">
                          Delete
                        </button>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveDecorator;
