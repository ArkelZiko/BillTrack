"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_RECURRING_BILL_COLLECTION_ID: RECURRING_BILL_COLLECTION_ID,
} = process.env;

export const createRecurringBill = async (bill: CreateRecurringBillProps): Promise<RecurringBill | null> => {
  try {
    const { database } = await createAdminClient();

    const newBill = await database.createDocument(
      DATABASE_ID!,
      RECURRING_BILL_COLLECTION_ID!,
      ID.unique(),
      {
        ...bill,
        billId: ID.unique(), // Generate a unique billId
      }
    );

    return parseStringify(newBill);
  } catch (error) {
    console.error("Error creating recurring bill:", error);
    return null;
  }
};

export const getRecurringBills = async ({
  userId,
}: getRecurringBillsProps): Promise<RecurringBillsResponse | null> => {
  try {
    const { database } = await createAdminClient();

    const bills = await database.listDocuments(
      DATABASE_ID!,
      RECURRING_BILL_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(bills);
  } catch (error) {
    console.error("Error fetching recurring bills:", error);
    return null;
  }
};


// Determine if a bill is paid or upcoming
export const getBillStatus = (nextPaymentDate: string): "paid" | "upcoming" => {
  const currentDate = new Date();
  const paymentDate = new Date(nextPaymentDate);

  return currentDate >= paymentDate ? "paid" : "upcoming";
};


