// File: api/sendMail.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const data = req.body; // JSON body from your form

  try {
    const r = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: {
          email: process.env.MAIL_FROM,
          name: 'A-1 Hydrostatic Form'
        },
        to: [
          {
            email: process.env.MAIL_TO,
            name: 'A-1 Office'
          }
        ],
        subject: 'New Hydrostatic Test Form Submission',
        text: JSON.stringify(data, null, 2),
        html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
      })
    });

    if (!r.ok) {
      const msg = await r.text();
      return res.status(502).send(msg);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
