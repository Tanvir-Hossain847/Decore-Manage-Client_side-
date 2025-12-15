import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loder from "../Components/Loder";
import { LucideX } from "lucide-react";
import Swal from "sweetalert2";

const PaymentHistory = () => {
    
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    
    const {data: payments = [], isLoading, refetch} = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    
    if(isLoading){
        return <Loder></Loder>
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
            axiosSecure.delete(`/payments/${id}`).then((res) => {
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
        <h1 className="text-4xl font-bold p-5">Payment History</h1>
        <h1 className="text-xl font-bold p-5">Currently Paid {payments.length}</h1>
        {
            payments.length === 0 ? 
            <h1>No Current History</h1>
            :
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Paid</th>
              <th>Transaction ID</th>
              <th>Tracking ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                payments.map((payment, index) => 
            <tr key={payment._id}>
              <th>{ index+1 }</th>
              <td>{payment.serviceName}</td>
              <td>{ payment.amountTotal/100 }</td>
              <td>{payment.transactionId}</td>
              <td>{payment.trackingId}</td>
              <td onClick={() => handleDelete(payment._id)} className="btn btn-xs mt-2 bg-red-500 text-white"><LucideX></LucideX></td>
            </tr>)
            }
            {/* row 1 */}
            
          </tbody>
        </table>
      </div>
        }
    </div>
  );
};

export default PaymentHistory;
