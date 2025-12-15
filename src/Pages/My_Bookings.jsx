import React, { use } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { LucideEdit, LucideX } from "lucide-react";
import Loder from "../Components/Loder";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";

const My_Bookings = () => {
  const { user } = use(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    data: booking = [],
    refetch,
  } = useQuery({
    queryKey: ["myBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user.email}`);
      return res.data;
    },
  });
  console.log(booking);

  if (isLoading) {
    return <Loder></Loder>;
  }

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#628141",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/booking/${id}`).then((res) => {
          console.log(res.data);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your parcel request has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold p-5">My Bookings</h1>
      <div className="overflow-x-auto mt-5">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Service Name</th>
              <th>Service ID</th>
              <th>Cost</th>
              <th>Location</th>
              <th>Payment</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((bookings, index) => (
              <tr key={bookings._id}>
                <th>{index + 1}</th>
                <td>{bookings.userName}</td>
                <td>{bookings.userEmail}</td>
                <td>{bookings.packageTitle}</td>
                <td>{bookings.packageId}</td>
                <td className="font-bold">{bookings.packagePrice}</td>
                <td>{bookings.location}</td>
                <td>
                  <Link
                    to={`/dashboard/payments/${bookings._id}`}
                    className="btn btn-xs btn-secondary hover:scale-105 transition-all duration-200"
                  >
                    Pay
                  </Link>
                </td>
                <td
                  className={`badge text-white ${
                    bookings.status === "paid" ? "bg-green-600" : "bg-gray-500"
                  }`}
                >
                  {bookings.status}
                </td>{" "}
                <td className="space-x-1.5">
                  <button className="btn btn-xs p-1 hover:scale-105 transition-all duration-200 btn-secondary">
                    <LucideEdit></LucideEdit>
                  </button>
                  <button
                    onClick={() => handleDelete(bookings._id)}
                    className="btn btn-xs p-1 hover:scale-105 transition-all duration-200 bg-red-500 text-white"
                  >
                    <LucideX></LucideX>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default My_Bookings;
