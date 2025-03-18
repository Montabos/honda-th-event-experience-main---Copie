interface EmailData {
  to_name: string;
  to_email: string;
  pack_type: string;
  date: string;
  total_price: number;
  pilot_count?: number;
  passenger_count?: number;
  accompanying_count?: number;
  nsx_type?: string;
  quantity?: number;
}

export const sendConfirmationEmail = async (data: EmailData) => {
  try {
    const response = await fetch('http://localhost:3002/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 