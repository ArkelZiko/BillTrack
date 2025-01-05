"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Bill name is required"),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount")
    .min(1, "Amount is required"),
  category: z.string().min(1, "Category is required"), //TODO: Change to a dropdown menu 
  frequency: z //TODO: Frequency in number of days
    .string()
    .min(1, "Frequency is required")
    .regex(/^(daily|weekly|monthly|yearly)$/, "Invalid frequency"),
  nextPaymentDate: z.string().min(1, "Next payment date is required"), // TODO: HAVE like a calendar dropdown for nextPaymentDate
  note: z.string().optional(),
});

const RecurringBillForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
      category: "",
      frequency: "",
      nextPaymentDate: "",
      note: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try { //TODO: Implement pop up somewhere that says Bill Created/added
      // TODO: Add bill to database
      console.log("Recurring bill created:", data);
      form.reset();
      router.push("/"); // Redirect or update UI as needed
    } catch (error) {
      console.error("Failed to create recurring bill: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <FormLabel className="text-14 font-medium text-gray-700">
                Bill Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Rent"
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <FormLabel className="text-14 font-medium text-gray-700">
                Amount
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 500.00"
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <FormLabel className="text-14 font-medium text-gray-700">
                Category
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Utilities"
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <FormLabel className="text-14 font-medium text-gray-700">
                Frequency
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., monthly"
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nextPaymentDate"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <FormLabel className="text-14 font-medium text-gray-700">
                Next Payment Date
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <FormLabel className="text-14 font-medium text-gray-700">
                Note (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional details about this bill"
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500" />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <Button type="submit" className="w-full">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Saving...
              </>
            ) : (
              "Create Recurring Bill"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecurringBillForm;