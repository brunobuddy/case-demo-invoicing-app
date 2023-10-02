import { jsPDF } from "jspdf";
import * as fs from "fs";

export const saveInvoiceToPdf = (content: {
  reference: string;
  label: string;
  issueDate: string;
  customerName: string;
  customerAddress: string;
  amount: number;
  taxes: number;
}): string => {
  var doc = new jsPDF();

  // Title.
  doc.setFontSize(28);
  doc.text(`Invoice: ${content.reference}`, 20, 25);

  // Other content.
  const fontSize: number = 14;
  const x: number = 35;
  doc.setFontSize(fontSize);

  doc.text(content.label, 20, x);
  doc.text(content.customerName, 20, x + fontSize);
  doc.text(content.customerAddress, 20, x + fontSize * 2);
  doc.text(content.issueDate, 20, x + fontSize * 3);
  doc.text(`Amount: ${content.amount}`, 20, x + fontSize * 4);
  doc.text(`Taxes: ${content.taxes}`, 20, x + fontSize * 5);

  var data = doc.output();

  const storagePath = "./public/storage";
  const path = `/invoices/${content.reference}.pdf`;

  fs.writeFileSync(storagePath + path, data, "binary");

  return path;
};
