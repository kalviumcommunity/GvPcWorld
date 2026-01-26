const express = require('express');
const router = express.Router();
const {
  analyzeBuild,
  generateRecommendations,
  aiAsk,
  generateTemplates
} = require('../controllers/aiController');

// POST /api/ai/analyze-build - Analyze a complete PC build
router.post('/analyze-build', analyzeBuild);

// POST /api/ai/recommendations - Generate PC build recommendations
router.post('/recommendations', generateRecommendations);

// POST /api/ai/ask - AI Ask feature for real-time queries
router.post('/ask', aiAsk);

// GET /api/ai/templates - Generate PC build templates
router.get('/templates', generateTemplates);

module.exports = router;
