import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { transactionCategoryStyles } from "@/constants";
  import { cn, formatAmount, formatDateTime, removeSpecialCharacters } from "@/lib/utils";
  
  const CategoryBadge = ({ category }: { category: string }) => {
    const {
      borderColor,
      backgroundColor,
      textColor,
      chipBackgroundColor,
    } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;
  
    return (
      <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
        <div className={cn("size-2 rounded-full", backgroundColor)} />
        <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
      </div>
    );
  };
  
  const RecurringBillsTable = ({ bills }: RecurringBillsTableProps) => {
    const getStatus = (nextPaymentDate: string) => {
      return new Date(nextPaymentDate) < new Date() ? "paid" : "upcoming";
    };
  
    const getDefaultCategory = (frequency: string) => {
      // Map frequencies to categories, adjust as needed
      const categoryMap: { [key: string]: string } = {
        monthly: "Rent & Fees",
        yearly: "Other",
        weekly: "Other",
        quarterly: "Other"
      };
      return categoryMap[frequency] || "Other";
    };
  
    return (
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Bill Name</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Category</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Next Payment Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.$id} className="bg-[#f9fafb]">
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(bill.name)}
                  </h1>
                </div>
              </TableCell>
  
              <TableCell className="pl-2 pr-10 font-semibold text-[#039855]">
                {formatAmount(bill.amount)}
              </TableCell>
  
              <TableCell className="pl-2 pr-10">
                <CategoryBadge category={bill.category || getDefaultCategory(bill.frequency)} />
              </TableCell>
  
              <TableCell className="pl-2 pr-10 capitalize">
                {getStatus(bill.nextPaymentDate)}
              </TableCell>
  
              <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(bill.nextPaymentDate)).dateOnly}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default RecurringBillsTable;