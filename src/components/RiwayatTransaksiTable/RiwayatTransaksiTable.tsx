import noDocuments from "@/assets/no_documents.svg";
export default function RiwayatTransaksiTable({transactions}: {transactions: any[]}) {
  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-neutral-100 text-left">Tanggal</th>
            <th className="py-3 px-6 bg-neutral-100 text-left">Deskripsi</th>
            <th className="py-3 px-6 bg-neutral-100 text-left">Kategori</th>
            <th className="py-3 px-6 bg-neutral-100 text-left">Mutasi</th>
            <th className="py-3 px-6 bg-neutral-100 text-left">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions?.map((transaction: any) => (
              <tr key={transaction.id} className="border-b border-neutral-200">
                <td className="py-4 px-6">{transaction.datetime.toString()}</td>
                <td className="py-4 px-6">{transaction.description}</td>
                <td className="py-4 px-6">
                  <span className="py-0.5 px-2 rounded-full bg-neutral-200">
                    {transaction.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-secondary-red font-bold">
                    - {transaction.amount}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-bold">- {transaction.amount}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4">
                <img
                  src={noDocuments}
                  className="block mx-auto"
                  alt="Tidak ada riwayat transaksi"
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
