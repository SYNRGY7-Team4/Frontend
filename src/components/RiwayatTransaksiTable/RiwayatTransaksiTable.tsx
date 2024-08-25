import noDocuments from "@/assets/no_documents.svg";
import currencyFormat from "@/utils/currencyFormat";
import dateTiemFormat from "@/utils/dateTimeFormat";
import { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function RiwayatTransaksiTable({
  transactions,
  pagination = false,
  maxRow = 10,
}: {
  transactions: any[];
  pagination?: boolean;
  maxRow?: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedTransactions, setSortedTransactions] = useState<any[]>([]);

  useEffect(() => {
    setCurrentPage(1);
    const sortedData = [...transactions].sort((a, b) => {
      const dateA = new Date(a.datetime).getTime();
      const dateB = new Date(b.datetime).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedTransactions(sortedData);
  }, [transactions, sortOrder]);

  const itemsPerPage = pagination ? maxRow : transactions.length;

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedData = [...transactions].sort((a, b) => {
      const dateA = new Date(a.datetime).getTime();
      const dateB = new Date(b.datetime).getTime();
      return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedTransactions(sortedData);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedTransactions = pagination
    ? sortedTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : sortedTransactions.slice(0, maxRow);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push("...");
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const toFirstWordCapitalized = (word: string) => {
    return [...word]
      .map((char, index) => (index === 0 ? char.toUpperCase() : char))
      .join("");
  };

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th
              className="py-3 px-6 w-[250px] bg-neutral-100 text-left cursor-pointer flex items-center"
              onClick={handleSort}
            >
              Tanggal
              {sortOrder === "asc" ? (
                <FaSortUp className="ml-2" />
              ) : (
                <FaSortDown className="ml-2" />
              )}
            </th>
            <th className="py-3 px-6 w-[150px] bg-neutral-100 text-left">
              Penerima
            </th>
            <th className="py-3 px-6 w-[220px] bg-neutral-100 text-left">
              Rekening Penerima
            </th>
            <th className="py-3 px-6 bg-neutral-100 text-left">Kategori</th>
            <th className="py-3 px-6 w-[200px] bg-neutral-100 text-left">
              Jumlah
            </th>
            <th className="py-3 px-6  bg-neutral-100 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((transaction: any) => (
              <tr key={transaction.id} className="border-b border-neutral-200">
                <td className="py-4 px-6">
                  {dateTiemFormat(new Date(transaction.datetime))}
                </td>
                <td className="py-4 px-6">{transaction.username_to}</td>
                <td className="py-4 px-6">{transaction.account_to}</td>
                <td className="py-4 px-6">
                  <span className="py-0.5 px-2 rounded-full bg-neutral-200">
                    {toFirstWordCapitalized(transaction.type)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`font-bold ${
                      transaction.transactionDirection.toUpperCase() === "DEBIT"
                        ? "text-secondary-green"
                        : "text-secondary-red"
                    }`}
                  >
                    {transaction.transactionDirection.toUpperCase() === "DEBIT"
                      ? "+"
                      : "-"}
                    {currencyFormat(transaction.amount, "id-ID", "IDR")}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`${
                      transaction.status === "completed"
                        ? "bg-secondary-green"
                        : "bg-secondary-yellow"
                    } rounded-full px-2 py-0.5 text-white`}
                  >
                    {toFirstWordCapitalized(transaction.status)}
                  </span>
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

      {pagination && totalPages > 1 && (
        <nav aria-label="Page navigation" className="flex justify-end mt-4">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-2.5 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowBack />
              </button>
            </li>
            {generatePageNumbers().map((page, index) =>
              typeof page === "string" ? (
                <li
                  key={index}
                  className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300"
                >
                  {page}
                </li>
              ) : (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`py-2 px-3 leading-tight ${
                      currentPage === page
                        ? "text-white bg-primary-blue"
                        : "text-gray-500 bg-white"
                    } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="py-2.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosArrowForward />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
