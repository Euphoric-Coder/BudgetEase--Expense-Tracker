"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "");

  try {
    const data = await resend.emails.send({
      from: "SpendWise Expense Tracker <welcome@spendwise-expense.com>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}