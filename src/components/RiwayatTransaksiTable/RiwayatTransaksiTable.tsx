import { Link } from "react-router-dom"
import noDocuments from "@/assets/no_documents.svg"

const transactions = [
  {
    id: 1,
    date: "7 Juli 2024",
    description: "Transfer ke BANK BCA",
    category: "Transfer",
    mutation: "- Rp. 15.000",
    balance: "Rp. 750.000",
  },
  {
    id: 2,
    date: "8 Juli 2024",
    description: "Top Up ke Gopay",
    category: "Top Up",
    mutation: "- Rp. 250.000",
    balance: "Rp. 500.000",
  },
  {
    id: 3,
    date: "8 Juli 2024",
    description: "Transfer ke BANK BCA",
    category: "Transfer",
    mutation: "- Rp. 10.000",
    balance: "Rp. 490.000",
  },
  {
    id: 4,
    date: "10 Juli 2024",
    description: "Transfer ke BANK BCA",
    category: "Transfer",
    mutation: "- Rp. 10.000",
    balance: "Rp. 480.000",
  },
]

export default function RiwayatTransaksiTable() {
  return (
    <div className='w-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-5'>
      <div className='flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3'>
        <h2 className='text-2xl font-bold'>Riwayat Transaksi</h2>
        <Link
          to='#'
          className='bg-primary-blue text-neutral-01 py-2 px-5 rounded-full'
        >
          Lihat Selengkapnya
        </Link>
      </div>
      <div className='overflow-auto'>
        <table className='w-full'>
          <tr>
            <th className='py-3 px-6 bg-neutral-100 text-left'>Tanggal</th>
            <th className='py-3 px-6 bg-neutral-100 text-left'>Deskripsi</th>
            <th className='py-3 px-6 bg-neutral-100 text-left'>Kategori</th>
            <th className='py-3 px-6 bg-neutral-100 text-left'>Mutasi</th>
            <th className='py-3 px-6 bg-neutral-100 text-left'>Saldo</th>
          </tr>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id} className='border-b border-neutral-200'>
                <td className='py-4 px-6'>{transaction.date}</td>
                <td className='py-4 px-6'>{transaction.description}</td>
                <td className='py-4 px-6'>
                  <span className='py-0.5 px-2 rounded-full bg-neutral-200'>
                    {transaction.category}
                  </span>
                </td>
                <td className='py-4 px-6'>
                  <span className='text-secondary-red font-bold'>
                    {transaction.mutation}
                  </span>
                </td>
                <td className='py-4 px-6'>
                  <span className='font-bold'>{transaction.balance}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className='py-4'>
                <img
                  src={noDocuments}
                  className='block mx-auto'
                  alt='Tidak ada riwayat transaksi'
                />
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  )
}
