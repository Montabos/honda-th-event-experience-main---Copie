import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dummy email endpoint that always returns success
app.post('/api/send-email', async (req, res) => {
  res.json({ 
    success: true, 
    message: "Email functionality is disabled in this deployment" 
  });
});

export default app; 