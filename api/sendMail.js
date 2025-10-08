// File: api/sendMail.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const data = req.body;

  // --- 1. Save the form data to Supabase ---
  try {
    const { error } = await supabase
      .from('hydrostatic_tests') // This must match your table name
      .insert([data]);

    // **CRITICAL CHANGE**: If there is an error, STOP and report it.
    if (error) {
      console.error('Supabase insert error:', error); // Log for Vercel
      // Send the specific error back to the form so we can see it.
      return res.status(500).json({ message: `Database Error: ${error.message}` });
    }

  } catch (dbError) {
    console.error('A critical error occurred connecting to Supabase:', dbError);
    return res.status(500).json({ message: `Database Connection Failed: ${dbError.message}` });
  }

  // --- 2. Send the email (only if Supabase was successful) ---
  try {
    const emailPayload = {
      from: { email: process.env.MAIL_FROM, name: 'A-1 Hydrostatic Form' },
      to: [{ email: process.env.MAIL_TO, name: 'A-1 Office' }],
      subject: `New Hydrostatic Test for ${data.customerName || 'N/A'}`,
      html: `<h1>New Hydrostatic Test Submission</h1><p>Customer: <strong>${data.customerName || 'N/A'}</strong></p><p>Address: <strong>${data.street || ''}, ${data.cityZip || ''}</strong></p><hr><pre>${JSON.stringify(data, null, 2)}</pre>`
    };

    const mailerResponse = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!mailerResponse.ok) {
      const errorText = await mailerResponse.text();
      console.error('MailerSend Error:', errorText);
    }

    return res.status(200).json({ message: 'Submission processed successfully.' });

  } catch (emailError) {
    console.error('Email sending failed:', emailError);
    return res.status(500).json({ message: `Email Sending Failed: ${emailError.message}` });
  }
}
