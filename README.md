# tap-payments-mcp

MCP server for Tap Payments gateway (UAE/Saudi/Kuwait/Bahrain). Supports charges, refunds, customers, and invoices via Bearer token auth.

## Tools (8)

| Tool | Description |
|---|---|
| `create_charge` | Create a payment charge |
| `get_charge` | Get charge details by ID |
| `list_charges` | List charges with filters |
| `create_refund` | Refund a captured charge |
| `get_refund` | Get refund details |
| `create_customer` | Create a customer profile |
| `create_invoice` | Create a payment invoice |
| `list_invoices` | List invoices with filters |

## Quick Start

```json
{
  "mcpServers": {
    "tap-payments": {
      "command": "npx",
      "args": ["-y", "@theyahia/tap-payments-mcp"],
      "env": {
        "TAP_SECRET_KEY": "<YOUR_SECRET_KEY>"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `TAP_SECRET_KEY` | Yes | Secret API key from Tap dashboard |

## Demo Prompts

- "Create a charge of 100 AED for a coffee subscription"
- "Check status of charge chg_abc123"
- "List all captured charges"
- "Refund 50 AED from charge chg_xyz789"
- "Create a customer profile for Ali with email ali@example.com"

## License

MIT
