import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/RecurringBillTransactionsTable';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getRecurringBills } from '@/lib/actions/recurringBills.actions';
import React from 'react';

const RecurringBillHistory = async ({ searchParams: { page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const rowsPerPage = 10;

  // Fetch the logged-in user
  const loggedInUser = await getLoggedInUser();

  // Fetch all recurring bill transactions for the user
  const response = await getRecurringBills({ userId: loggedInUser.$id });
  
  if (!response) return null;
  
  const recurringBills = response.documents;

  // Filter past transactions
  const pastTransactions = recurringBills.filter((bill: RecurringBill) =>
    new Date(bill.nextPaymentDate) < new Date()
  );

  const totalPages = Math.ceil(pastTransactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = pastTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Recurring Bill History"
          subtext="See all your past recurring bill transactions."
        />
      </div>

      <section className="space-y-6">
        <TransactionsTable transactions={currentTransactions} />
        {totalPages > 1 && (
          <div className="my-4 w-full">
            <Pagination totalPages={totalPages} page={currentPage} />
          </div>
        )}
      </section>
    </div>
  );
};

export default RecurringBillHistory;