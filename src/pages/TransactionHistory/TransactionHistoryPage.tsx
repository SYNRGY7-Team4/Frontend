// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// // Define schema for form validation using Zod
// const transactionSchema = z.object({
//   transactionType: z.string().optional(),
//   startDate: z.string().optional(),
//   endDate: z.string().optional(),
// });

// // Define types for form data and transaction history
// type TransactionFormData = z.infer<typeof transactionSchema>;

// type Transaction = {
//   id: number;
//   date: string;
//   type: string;
//   amount: number;
// };

// // Sample transaction data
// const transactionData: Transaction[] = [];

// const TransactionHistoryPage: React.FC = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<TransactionFormData>({
//     resolver: zodResolver(transactionSchema),
//   });

//   const onSubmit = (data: TransactionFormData) => {
//     console.log("Filtered Data:", data);
//     // Filter logic can be added here
//   };

//   const watchFields = watch(["transactionType", "startDate", "endDate"]);

//   // Filtered transaction data based on form input
//   const filteredTransactions = transactionData.filter((transaction) => {
//     const isTypeMatch =
//       !watchFields.transactionType || transaction.type === watchFields.transactionType;
//     const isAfterStartDate =
//       !watchFields.startDate || new Date(transaction.date) >= new Date(watchFields.startDate);
//     const isBeforeEndDate =
//       !watchFields.endDate || new Date(transaction.date) <= new Date(watchFields.endDate);

//     return isTypeMatch && isAfterStartDate && isBeforeEndDate;
//   });

//   return (
//     <div className="container mx-auto px-6 py-10">
//       <div className="bg-white px-8 py-10 rounded-lg shadow-md">
//         <h1 className="text-3xl font-bold text-primary-blue mb-6">
//           Riwayat Transaksi
//         </h1>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Transaction Type Dropdown */}
//           <div className="flex flex-col gap-y-1">
//             <label className="block font-medium text-sm mb-1" htmlFor="transactionType">
//               Jenis Transaksi
//             </label>
//             <Controller
//               name="transactionType"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <select
//                   {...field}
//                   id="transactionType"
//                   className={`w-full p-2 border rounded ${errors.transactionType ? "border-red-500" : "border-gray-300"}`}
//                 >
//                   <option value="">Semua Transaksi</option>
//                   <option value="Deposit">Deposit</option>
//                   <option value="Withdrawal">Withdrawal</option>
//                   <option value="Transfer">Transfer</option>
//                 </select>
//               )}
//             />
//             {errors.transactionType && (
//               <span className="text-red-500 text-sm">{errors.transactionType.message}</span>
//             )}
//           </div>

//           {/* Start Date Input */}
//           <div className="flex flex-col gap-y-1">
//             <label className="block font-medium text-sm mb-1" htmlFor="startDate">
//               Dari Tanggal
//             </label>
//             <Controller
//               name="startDate"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="date"
//                   id="startDate"
//                   className={`w-full p-2 border rounded ${errors.startDate ? "border-red-500" : "border-gray-300"}`}
//                 />
//               )}
//             />
//             {errors.startDate && (
//               <span className="text-red-500 text-sm">{errors.startDate.message}</span>
//             )}
//           </div>

//           {/* End Date Input */}
//           <div className="flex flex-col gap-y-1">
//             <label className="block font-medium text-sm mb-1" htmlFor="endDate">
//               Sampai Tanggal
//             </label>
//             <Controller
//               name="endDate"
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <input
//                   {...field}
//                   type="date"
//                   id="endDate"
//                   className={`w-full p-2 border rounded ${errors.endDate ? "border-red-500" : "border-gray-300"}`}
//                 />
//               )}
//             />
//             {errors.endDate && (
//               <span className="text-red-500 text-sm">{errors.endDate.message}</span>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-primary-darkBlue text-white py-2 px-4 rounded hover:bg-blue-600"
//             >
//               Filter
//             </button>
//           </div>
//         </form>

//         {/* Transaction Table */}
//         <table className="min-w-full bg-white mt-8 border">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">Tanggal</th>
//               <th className="border px-4 py-2">Deskripsi</th>
//               <th className="border px-4 py-2">Category</th>
//               <th className="border px-4 py-2">Mutasi</th>
//               <th className="border px-4 py-2">Saldo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.length > 0 ? (
//               filteredTransactions.map((transaction) => (
//                 <tr key={transaction.id}>
//                   <td className="border px-4 py-2">{transaction.date}</td>
//                   <td className="border px-4 py-2">{transaction.type}</td>
//                   <td className="border px-4 py-2">{transaction.type}</td>
//                   <td className="border px-4 py-2">{transaction.amount}</td>
//                   <td className="border px-4 py-2">{transaction.amount}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-4">
//                   Tidak ada history transaksi
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransactionHistoryPage;
