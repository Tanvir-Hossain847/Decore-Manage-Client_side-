import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loder from "../Components/Loder";

const User = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loder></Loder>;
  }

  const handleRoleChange = (id) => {
    
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Photo</th>
              <th>User</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td></td>
                <td>
                  <img
                    className="rounded-full w-10 h-10 object-cover"
                    src={user.photoURL}
                    alt=""
                  />
                </td>
                <td>
                  <div className="">
                    <h1 className="text-lg font-bold">{user.displayName}</h1>
                    <p>{user.email}</p>
                    <p>{user.createdAt}</p>
                  </div>
                </td>
                <td className="btn btn-accent mt-7">{user.role}</td>
                <td>
                  <div className="">
                    <form action="">
                      <fieldset>
                        <select defaultValue="Pick a color" className="select w-40">
                          <option disabled={true}>Change Role</option>
                          <option>User</option>
                          <option>Decorator</option>
                          <option>Admin</option>
                        </select>
                      </fieldset>
                    </form>
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

export default User;
