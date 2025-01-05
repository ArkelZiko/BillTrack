/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userid: string;
  firstName: string;
  lastName: string;
};

declare type NewUserParams = {
  userid: string;
  email: string;
  password: string;
};


// declare type Transaction = {
//   id: string;
//   $id: string;
//   name: string;
//   paymentChannel: string;
//   type: string;
//   accountId: string;
//   amount: number;
//   pending: boolean;
//   category: string;
//   date: string;
//   image: string;
//   type: string;
//   $createdAt: string;
//   channel: string;
//   senderBankId: string;
//   receiverBankId: string;
// };

declare type Category = "Food & Drinks" | "Vehicle & Transportation" | "Music" | "Fitness & Health" | "Rent & Fees" | "Other"

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}


declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}


declare interface BankTabItemProps {
  account: Account;
  appwriteItemId?: string;
}

declare interface TotalBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop"
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

declare interface SidebarProps {
  user: User;
}

declare interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface CategoryBadgeProps {
  category: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface CategoryProps {
  category: CategoryCount;
}

declare interface DoughnutChartProps {
  accounts: Account[];
}

declare interface PaymentTransferFormProps {
  accounts: Account[];
}

// Actions
declare interface getAccountsProps {
  userid: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}


declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
userid: string;
}

declare type RecurringBill = {
  category: string;
  $id: string;
  userid: string;
  billId: string;
  name: string;
  amount: number;
  nextPaymentDate: string;
  frequency: "monthly" | "yearly" | "weekly" | "quarterly";
  $createdAt: string;
};

// Update TransactionTableProps to handle RecurringBills
declare interface TransactionTableProps {
  transactions: RecurringBill[];
}

// Add specific props for recurring bills table
declare interface RecurringBillsTableProps {
  bills: RecurringBill[];
}

declare interface CreateRecurringBillProps {
  userid: string;
  name: string;
  amount: number;
  nextPaymentDate: string;
  frequency: "monthly" | "yearly" | "weekly" | "quarterly";
}

declare interface getRecurringBillsProps {
  userId: string;
}

declare type RecurringBillsResponse = {
  total: number;
  documents: RecurringBill[];
};
