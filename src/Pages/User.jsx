import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loder from "../Components/Loder";
import Swal from "sweetalert2";

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

  const handleRoleChange = (e, id) => {
    const role = e.target.value;
    if (role === "Change Role") {
      return;
    }
    const updateRole = {
      role: role,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Change This Users Role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}`, updateRole).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: ` Role Changed To ${role} `,
              icon: "success",
            });
            refetch();
          }
        });
        Swal.fire({
          title: "Changed",
          text: "Role Succesfully Changed.",
          icon: "success",
        });
      }
    });
  };

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
                        <select
                          onChange={(e) => handleRoleChange(e, user._id)}
                          defaultValue="Pick a color"
                          className="select w-40"
                        >
                          <option disabled={true}>Change Role</option>
                          <option>User</option>
                          <option>Decorator</option>
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
