import React, { use } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loder from "../Components/Loder";
import Swal from "sweetalert2";

const AssignedPackage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["booking", user.email, "Decorator_Assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/decorator?decoratorEmail=${user.email}&workStatus=Decorator_Assigned`);
      return res.data;
    },
  });

   const { data: decorators = [] } = useQuery({
      queryKey: ["decorator", "available"],
      queryFn: async () => {
        const res = await axiosSecure.get("decorator?status=Approved&currentStatus=On-Assignment");
        return res.data;
      },
    });
    


  if (isLoading) {
    return <Loder></Loder>;
  }
  console.log(tasks);

  const handleAccept = (task) => {
    
    const updateInfo = {
      workStatus: "Accepted",
    };
    axiosSecure.patch(`/booking/${task._id}/status`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Task Accepted",
          text: `Thank You For Accepting`,
          icon: "success",
        });
      }
    });
  };


  const handleReject = (task) => {
    
    const updateInfo = {
      workStatus: "Reject",
    };
    axiosSecure.patch(`/booking/${task._id}/status`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Task Rejected",
          text: `Thank You For Your Time, This Task Will Assign To A New Decorator`,
          icon: "success",
        });
      }
    });
  };

  const handleCompleted = (task) => {
    const decorator = decorators.find(d => d._id.toString() === task.decoratorId.toString())
    console.log("this is the specific decorator",decorator.currentStatus);
    const updateBooking = {
      workStatus: "Completed",
    };
    const updateDecorator = {
      currentStatus: "Available"
    };
    axiosSecure.patch(`/decorator/${decorator._id}/status`, updateDecorator).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        axiosSecure.patch(`/booking/${task._id}/status`, updateBooking).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Task Completed",
          text: `Thank You For Completing The Task`,
          icon: "success",
        });
      }
    });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <h1 className="text-4xl font-bold p-5">Manage Package</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Working Status</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="">
                    <h1 className="text-lg font-bold">{task.packageTitle}</h1>
                    <h1>{task.bookingDate}</h1>
                  </div>
                </td>
                <td className="font-bold">{task.packagePrice}</td>
                <td>
                  <div className="badge badge-secondary">{task.status}</div>
                </td>
                <td>
                  <div className="badge badge-accent">{task.workStatus}</div>
                </td>
                <td className="font-bold">{task.location}</td>
                <td>
                  <div className="flex flex-col">
                    {
                      task.workStatus === "Accepted" ? <>
                      <div className="">
                        <button onClick={() => handleCompleted(task)} className="btn btn-secondary">Mark As Complete</button>
                      </div>
                      </>
                      :                    
                      <>
                        <button
                          onClick={() => handleAccept(task)}
                          className="btn btn-secondary"
                        >
                          Accept
                        </button>
                        <button onClick={() => handleReject(task)} className="btn btn-accent">Reject</button>
                      </>                      
                    }
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

export default AssignedPackage;
