import emailjs from '@emailjs/browser';
import { Order } from '@/types';

// EmailJS configuration
// These will need to be set up by the user at https://www.emailjs.com/
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

/**
 * Initialize EmailJS with public key
 */
export const initEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmation = async (order: Order): Promise<boolean> => {
  // Check if EmailJS is configured
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS not configured. Skipping email send.');
    return false;
  }

  try {
    // Format order items for email
    const orderItemsText = order.items
      .map((item) => {
        return `${item.product.name} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`;
      })
      .join('\n');

    // Prepare email template parameters
    const templateParams = {
      to_email: order.customer.email,
      to_name: order.customer.name,
      order_id: order.orderId,
      order_date: new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone || 'Not provided',
      customer_address: order.customer.address,
      customer_city: order.customer.city,
      customer_state: order.customer.state,
      customer_zipCode: order.customer.zipCode,
      order_items: orderItemsText,
      order_total: order.total.toFixed(2),
      order_notes: order.customer.notes || 'None',
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
