# EmailJS Setup Guide

This guide will help you set up EmailJS to send order confirmation emails from your Kawaii Kantaloupe website.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Copy your **Service ID** - you'll need this later

## Step 3: Create an Email Template

1. In your EmailJS dashboard, click "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

### Template Content:

**Subject:** Order Confirmation - {{order_id}}

**Body:**
```
Hi {{to_name}},

Thank you for your order from Kawaii Kantaloupe! 🎉

ORDER DETAILS
=============
Order ID: {{order_id}}
Order Date: {{order_date}}
Status: Pending

SHIPPING INFORMATION
====================
Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Address: {{customer_address}}
City: {{customer_city}}, {{customer_state}} {{customer_zipCode}}

ORDER ITEMS
===========
{{order_items}}

TOTAL: ${{order_total}}

ORDER NOTES
===========
{{order_notes}}

WHAT'S NEXT?
============
1. We'll calculate shipping costs and send you a payment request
2. Once payment is received, we'll ship your order
3. You'll receive tracking information via email
4. Your handmade blob stickers will arrive with love!

Thank you for supporting this young entrepreneur!

Best wishes,
Kawaii Kantaloupe
```

4. Save the template and copy your **Template ID**

## Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account" > "General"
2. Find your **Public Key** and copy it

## Step 5: Configure Your Website

1. In your project folder, create a file called `.env.local`
2. Add your EmailJS credentials:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

3. Replace the placeholder values with your actual IDs from EmailJS
4. Save the file

## Step 6: Restart Your Development Server

```bash
npm run dev
```

## Testing

1. Add items to your cart
2. Go through the checkout process
3. After placing an order, check:
   - Browser console for success/error messages
   - Your email inbox for the confirmation email
   - EmailJS dashboard for sent email statistics

## Troubleshooting

### Emails Not Sending?

- Check that all three environment variables are set correctly
- Verify your EmailJS account is verified
- Check browser console for error messages
- Ensure your email service is properly connected in EmailJS dashboard
- Check EmailJS usage limits (free tier has monthly limits)

### Template Variables Not Showing?

- Make sure your template uses the exact variable names shown above
- Variables are case-sensitive: `{{order_id}}` not `{{Order_ID}}`

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 10 email templates

For a small business just starting out, this should be sufficient!

## Support

If you need help:
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: Available through their dashboard

---

**Note:** The website will work without EmailJS configured - orders will still be processed and saved, but customers won't receive automatic email confirmations. You can manually email customers using the order details from the confirmation page.
