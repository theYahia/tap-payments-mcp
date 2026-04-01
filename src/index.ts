#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createChargeSchema, handleCreateCharge } from "./tools/create-charge.js";
import { getChargeSchema, handleGetCharge } from "./tools/get-charge.js";
import { listChargesSchema, handleListCharges } from "./tools/list-charges.js";
import { createRefundSchema, handleCreateRefund } from "./tools/create-refund.js";
import { getRefundSchema, handleGetRefund } from "./tools/get-refund.js";
import { createCustomerSchema, handleCreateCustomer } from "./tools/create-customer.js";
import { createInvoiceSchema, handleCreateInvoice } from "./tools/create-invoice.js";
import { listInvoicesSchema, handleListInvoices } from "./tools/list-invoices.js";

const server = new McpServer({ name: "tap-payments-mcp", version: "1.0.0" });

server.tool("create_charge", "Create a payment charge via Tap Payments.", createChargeSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateCharge(params) }] }));

server.tool("get_charge", "Get charge details by ID.", getChargeSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetCharge(params) }] }));

server.tool("list_charges", "List payment charges with filters.", listChargesSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleListCharges(params) }] }));

server.tool("create_refund", "Refund a captured charge.", createRefundSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateRefund(params) }] }));

server.tool("get_refund", "Get refund details by ID.", getRefundSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetRefund(params) }] }));

server.tool("create_customer", "Create a customer profile.", createCustomerSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateCustomer(params) }] }));

server.tool("create_invoice", "Create a payment invoice.", createInvoiceSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateInvoice(params) }] }));

server.tool("list_invoices", "List invoices with filters.", listInvoicesSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleListInvoices(params) }] }));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[tap-payments-mcp] Server started. 8 tools available.");
}

main().catch((error) => { console.error("[tap-payments-mcp] Error:", error); process.exit(1); });
