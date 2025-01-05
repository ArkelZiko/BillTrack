"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecurringBillsTable from "./RecurringBillTransactionsTable";
import { Pagination } from "./Pagination";

const RecurringBillTransactions = ({
  transactions = [],
  page = 1,
}: {
  transactions: RecurringBill[];
  page?: number;
}) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "paid">("upcoming");

  const rowsPerPage = 10;
  const filteredTransactions = transactions.filter((bill) =>
    activeTab === "paid"
      ? new Date(bill.nextPaymentDate) < new Date()
      : new Date(bill.nextPaymentDate) >= new Date()
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="recurring-bill-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recurring-bill-transactions-label">Recurring Bill Transactions</h2>
      </header>
      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "upcoming" | "paid")}
        className="w-full"
      >
        <TabsList className="recurring-bill-transactions-tablist">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="paid">Already Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <RecurringBillsTable bills={currentTransactions} />
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} page={page} />
          )}
        </TabsContent>

        <TabsContent value="paid">
          <RecurringBillsTable bills={currentTransactions} />
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} page={page} />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RecurringBillTransactions;