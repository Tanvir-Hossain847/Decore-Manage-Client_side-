import React, { use } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Context/AuthContext";
import { LucideX } from "lucide-react";

const CompletedTask = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = use(AuthContext)
  const {
    data: tasks = [],
    refetch,
    isLoading,
    } = useQuery({
    queryKey: ["booking", user.email, "Decorator_Assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/complete?decoratorEmail=${user.email}&workStatus=Completed`);
      return res.data;
    },
  });
  console.log(tasks);
  
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Work Status</th>
            </tr>
          </thead>
          <tbody>
            {
                tasks.map((task, index) => (
            <tr key={task._id}>
              <th>{index + 1}</th>
              <td>
                <div className="">
                    <h1 className="font-bold text-lg">{task.packageTitle}</h1>
                    <h1>{task.bookingDate}</h1>
                </div>
              </td>
              <td className="font-bold">{task.packagePrice}</td>
              <td><div className="badge badge-secondary">{task.status}</div></td>
              <td><div className="badge badge-secondary">{task.workStatus}</div></td>
              <td><div>
                <button className="btn bg-red-500 text-white btn-xs hover:scale-105"><LucideX></LucideX></button>
                </div></td>
            </tr>
                ))
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedTask;
