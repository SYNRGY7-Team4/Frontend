import avatar from "@/assets/avatar.png";
import noCreditCard from "@/assets/no_credit_card.svg";
import { useUserStore } from "@/store/UserStore";

export default function TransaksiTerbaruCard() {
  const { userMutations } = useUserStore();

  const latestTransactions = userMutations.slice(-2);

  return (
    <div className="w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-2.5">
      <h2 className="text-2xl font-bold">Transaksi Terbaru</h2>
      <div className="h-full flex flex-col gap-4">
        {latestTransactions.length > 0 ? (
          latestTransactions.map((transaction: any) => (
            <div
              key={transaction.id}
              className="flex items-center bg-neutral-01 border border-primary-darkBlue rounded-lg py-4 px-5 gap-4 overflow-auto"
            >
              <img
                src={avatar}
                className="w-10 h-10"
                alt={`Avatar ${transaction.account_to}`}
              />
              <div className="">
                <p className="text-lg">{transaction.account_to}</p>
                <p className="text-gray-500">{transaction.account_to}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <img src={noCreditCard} alt="tidak ada transaksi" />
          </div>
        )}
      </div>
    </div>
  );
}
