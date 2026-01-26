import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

const AIReview = () => {
  const location = useLocation();
  const { selectedComponents, buildName, budget, purpose } = location.state || {};

  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);

      const componentsText = Object.entries(selectedComponents || {})
        .map(([type, comp]) => `${type}: ${comp.component} (${comp.price} INR)`)
        .join('\n');

      const prompt = `
You're a PC hardware expert. A user is building a PC with the following intent: ${purpose}.
Their total budget is ₹${budget}.

Here are the selected components:
${componentsText}

Give a short analysis (~200 words):
1. Is the build balanced or are there any bottlenecks?
2. Is the power supply wattage sufficient?
3. Any component that's too powerful or weak for this use-case?
4. Final recommendation: Good to go, or what to change?

Keep the tone simple and user-friendly.
      `.trim();

      try {
        console.log('Fetching AI review with prompt')
        const res = await fetch(`${apiUrl}?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });
        console.log('Response received from review api');
        const data = await res.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';
        setReview(output);
      } catch (error) {
        setReview('Something went wrong while fetching the review.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [selectedComponents, purpose, budget, apiKey, apiUrl]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        AI Review for "{buildName}"
      </Typography>

      <Paper elevation={3} sx={{ p: 4, minHeight: 300 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {review}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AIReview;