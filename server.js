import express from 'express';
import cors from 'cors';
import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration Mailjet
const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_API_SECRET
});

console.log('Mailjet configuration:', {
  apiKey: process.env.MAILJET_API_KEY ? 'Present' : 'Missing',
  apiSecret: process.env.MAILJET_API_SECRET ? 'Present' : 'Missing',
  fromEmail: process.env.MAILJET_FROM_EMAIL,
  fromName: process.env.MAILJET_FROM_NAME
});

// Route pour l'envoi d'email
app.post('/api/send-email', async (req, res) => {
  console.log('Received email request:', req.body);
  
  try {
    const { to_name, to_email, pack_type, date, total_price, pilot_count, passenger_count, accompanying_count, nsx_type, quantity } = req.body;

    console.log('Preparing email with data:', {
      to_name,
      to_email,
      pack_type,
      date,
      total_price,
      pilot_count,
      passenger_count,
      accompanying_count,
      nsx_type,
      quantity
    });

    const result = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: process.env.MAILJET_FROM_NAME
          },
          To: [
            {
              Email: to_email,
              Name: to_name
            }
          ],
          Subject: "Confirmation de votre inscription - TH Exclusive Honda",
          TextPart: `Bonjour ${to_name},

Nous sommes ravis de confirmer votre inscription à l'événement TH Exclusive Honda.

Détails de votre commande :
- Pack : ${pack_type}
- Date : ${date}
- Total : ${total_price}€

${pilot_count ? `- Nombre de pilotes : ${pilot_count}` : ''}
${passenger_count ? `- Nombre de passagers : ${passenger_count}` : ''}
${accompanying_count ? `- Nombre d'accompagnants : ${accompanying_count}` : ''}
${quantity ? `- Nombre de visiteurs : ${quantity}` : ''}

Vous recevrez prochainement un email avec vos billets et toutes les informations pratiques pour l'événement.

Cordialement,
L'équipe TH Exclusive Honda`,
          HTMLPart: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmation d'inscription - TH Exclusive Honda</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                  }
                  .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                  }
                  .header {
                    background-color: #000000;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                  }
                  .header img {
                    max-width: 150px;
                    height: auto;
                  }
                  .content {
                    padding: 30px 20px;
                  }
                  .greeting {
                    font-size: 24px;
                    color: #000000;
                    margin-bottom: 20px;
                  }
                  .details {
                    background-color: #f8f8f8;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                  }
                  .details h2 {
                    color: #E60012;
                    margin-top: 0;
                    font-size: 20px;
                  }
                  .details ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                  }
                  .details li {
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                  }
                  .details li:last-child {
                    border-bottom: none;
                  }
                  .footer {
                    text-align: center;
                    padding: 20px;
                    color: #666;
                    font-size: 14px;
                    margin-top: 30px;
                    border-top: 1px solid #eee;
                  }
                  .button {
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #E60012;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 4px;
                    margin: 20px 0;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <img src="https://honda-th-event-experience.vercel.app/logo.png" alt="Honda Logo">
                  </div>
                  
                  <div class="content">
                    <div class="greeting">Bonjour ${to_name},</div>
                    
                    <p>Nous sommes ravis de confirmer votre inscription à l'événement TH Exclusive Honda.</p>
                    
                    <div class="details">
                      <h2>Détails de votre commande</h2>
                      <ul>
                        <li><strong>Pack :</strong> ${pack_type}</li>
                        <li><strong>Date :</strong> ${date}</li>
                        <li><strong>Total :</strong> ${total_price}€</li>
                        ${pilot_count ? `<li><strong>Nombre de pilotes :</strong> ${pilot_count}</li>` : ''}
                        ${passenger_count ? `<li><strong>Nombre de passagers :</strong> ${passenger_count}</li>` : ''}
                        ${accompanying_count ? `<li><strong>Nombre d'accompagnants :</strong> ${accompanying_count}</li>` : ''}
                        ${quantity ? `<li><strong>Nombre de visiteurs :</strong> ${quantity}</li>` : ''}
                      </ul>
                    </div>
                    
                    <p>Vous recevrez prochainement un email avec vos billets et toutes les informations pratiques pour l'événement.</p>
                    
                    <div style="text-align: center;">
                      <a href="https://honda-th-event-experience.vercel.app/" class="button">Retourner sur le site</a>
                    </div>
                  </div>
                  
                  <div class="footer">
                    <p>Cordialement,<br>L'équipe TH Exclusive Honda</p>
                  </div>
                </div>
              </body>
            </html>
          `
        }
      ]
    });

    console.log('Mailjet API Response:', JSON.stringify(result.body, null, 2));
    res.json({ success: true, data: result.body });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.body
    });
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 