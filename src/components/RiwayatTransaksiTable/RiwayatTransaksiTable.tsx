import noDocuments from '@/assets/no_documents.svg';
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
  const itemsPerPage = pagination ? maxRow : transactions.length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
      .format(date)
      .replace(':', '.');

    return `${formattedDate} ${formattedTime} WIB`;
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedTransactions = pagination
    ? transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : transactions.slice(0, maxRow);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1);
        pages.push('...');
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="overflow-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-neutral-100 text-left">Tanggal</th>
            <th className="py-3 px-6 w-[200px] bg-neutral-100 text-left">
              Deskripsi
            </th>
            <th className="py-3 px-6 bg-neutral-100 text-left">Kategori</th>
            <th className="py-3 px-6 w-[200px] bg-neutral-100 text-left">
              Mutasi
            </th>
            <th className="py-3 px-6 w-[200px] bg-neutral-100 text-left">
              Saldo
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((transaction: any) => (
              <tr key={transaction.id} className="border-b border-neutral-200">
                <td className="py-4 px-6">
                  {formatDate(transaction.datetime)}
                </td>
                <td className="py-4 px-6">{transaction.description}</td>
                <td className="py-4 px-6">
                  <span className="py-0.5 px-2 rounded-full bg-neutral-200">
                    {transaction.type}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`${
                      transaction.type === 'debit' ? 'text-secondary-green' : 'text-secondary-red'
                    } font-bold`}
                  >
                    {transaction.type === 'debit'
                      ? `+ ${formatRupiah(transaction.amount)}`
                      : `- ${formatRupiah(transaction.amount)}`}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-bold">
                    {formatRupiah(transaction.amount)}
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
              typeof page === 'string' ? (
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
                        ? 'text-white bg-primary-blue'
                        : 'text-gray-500 bg-white'
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
