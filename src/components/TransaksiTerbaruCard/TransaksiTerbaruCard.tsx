import avatar from "@/assets/avatar.png"
import noCreditCard from "@/assets/no_credit_card.svg"

const latestTransactions = [
  {
    id: 1,
    name: "Kijang Innova",
    accountNumber: "7541223687564",
    avatar: avatar,
  },
  {
    id: 2,
    name: "Sigit Rendang",
    accountNumber: "084521365478",
    avatar: avatar,
  },
]

export default function TransaksiTerbaruCard() {
  return (
    <div className='w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-2.5'>
      <h2 className='text-2xl font-bold'>Transaksi Terbaru</h2>
      <div className='h-full flex flex-col gap-4'>
        {latestTransactions.length > 0 ? (
          latestTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className='flex items-center bg-neutral-01 border border-primary-darkBlue rounded-lg py-4 px-5 gap-4 overflow-auto'
            >
              <img
                src={transaction.avatar}
                className='w-10 h-10'
                alt={`Avatar ${transaction.name}`}
              />
              <div className=''>
                <p className='text-lg'>{transaction.name}</p>
                <p className='text-gray-500'>{transaction.accountNumber}</p>
              </div>
            </div>
          ))
        ) : (
          <div className='flex justify-center'>
            <img src={noCreditCard} alt='tidak ada transaksi' />
          </div>
        )}
      </div>
    </div>
  )
}
