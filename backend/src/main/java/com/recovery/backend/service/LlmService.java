package com.recovery.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class LlmService {

    @Value("${llm.api.key}")
    private String apiKey;

    @Value("${grok.api.key:}")
    private String grokApiKey;

    private final RestTemplate restTemplate;

    public LlmService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(30000);
        factory.setReadTimeout(60000);
        this.restTemplate = new RestTemplate(factory);
    }

    public String analyzeAssessment(String answers) {
        String prompt = "You are an expert mental health and digital burnout recovery coach. Analyze the user's assessment answers and write a professional, empathetic recovery report in Markdown.\n\n" +
                "Use EXACTLY these section headings:\n" +
                "# Mental Health Recovery Report\n\n" +
                "## Burnout Severity Score\n" +
                "Score: X/100 | Status: [Healthy / At Risk / Moderate Burnout / Severe Burnout]\n" +
                "Brief explanation (2-3 sentences).\n\n" +
                "## Key Findings\n" +
                "3-5 bullet points about the user's psychological and physical state.\n\n" +
                "## Your 30-Day Recovery Roadmap\n" +
                "**Week 1 – Immediate Reset:** 2-3 actions.\n" +
                "**Week 2-4 – Habit Rebuilding:** 2-3 sustainable changes.\n\n" +
                "## Specific Recommendations\n" +
                "3-4 concrete tools or techniques tailored to their answers.\n\n" +
                "## Encouragement\n" +
                "A warm, uplifting closing paragraph.\n\n" +
                "USER ANSWERS:\n" + answers;

        // --- TRY GROK (xAI) FIRST IF KEY IS PROVIDED ---
        if (grokApiKey != null && !grokApiKey.trim().isEmpty() && !grokApiKey.startsWith("${")) {
            System.out.println("[LLM] Trying Grok (xAI) API...");
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setBearerAuth(grokApiKey);

                Map<String, Object> message = new HashMap<>();
                message.put("role", "user");
                message.put("content", prompt);

                Map<String, Object> requestBody = new HashMap<>();
                requestBody.put("model", "grok-2-1212");
                requestBody.put("messages", List.of(message));
                requestBody.put("temperature", 0.7);

                HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
                ResponseEntity<Map> response = restTemplate.exchange("https://api.x.ai/v1/chat/completions", HttpMethod.POST, entity, Map.class);
                
                Map<String, Object> body = response.getBody();
                if (body != null && body.containsKey("choices")) {
                    List<Map<String, Object>> choices = (List<Map<String, Object>>) body.get("choices");
                    if (!choices.isEmpty()) {
                        Map<String, Object> choice = choices.get(0);
                        Map<String, Object> msg = (Map<String, Object>) choice.get("message");
                        if (msg != null && msg.containsKey("content")) {
                            System.out.println("[LLM] Success with Grok!");
                            return (String) msg.get("content");
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("[LLM] Grok API failed: " + e.getMessage());
                // Fall through to Gemini
            }
        }

        // --- GEMINI FALLBACK ---
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Try models in order: highest free-tier quota first
        List<String[]> modelConfigs = List.of(
            new String[]{"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=", "gemini-2.0-flash-lite"},
            new String[]{"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=", "gemini-2.0-flash"},
            new String[]{"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=", "gemini-1.5-flash"},
            new String[]{"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-8b:generateContent?key=", "gemini-1.5-flash-8b"},
            new String[]{"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=", "gemini-1.5-flash-latest"}
        );

        for (String[] config : modelConfigs) {
            String modelUrl = config[0] + apiKey;
            String model = config[1];
            System.out.println("[LLM] Trying Gemini model: " + model);

            for (int attempt = 1; attempt <= 3; attempt++) {
                try {
                    ResponseEntity<Map> response = restTemplate.exchange(modelUrl, HttpMethod.POST, entity, Map.class);
                    String result = extractTextFromResponse(response.getBody());
                    System.out.println("[LLM] Success with Gemini model: " + model);
                    return result;

                } catch (org.springframework.web.client.HttpStatusCodeException e) {
                    int status = e.getStatusCode().value();
                    String errorBody = e.getResponseBodyAsString();
                    System.err.println("[LLM] Gemini " + model + " attempt " + attempt + " -> HTTP " + status + " | Body: " + errorBody);

                    if (status == 429) {
                        if (attempt < 3) {
                            long waitMs = attempt * 15000L;
                            System.out.println("[LLM] Rate limited. Waiting " + (waitMs/1000) + "s before retry...");
                            try { Thread.sleep(waitMs); } catch (InterruptedException ie) { Thread.currentThread().interrupt(); }
                        } else {
                            System.out.println("[LLM] All retries exhausted for " + model + ". Trying next model...");
                            break;
                        }
                    } else if (status == 404 || status == 400) {
                        System.out.println("[LLM] Model " + model + " not available. Trying next...");
                        break;
                    } else {
                        System.err.println("[LLM] Unrecoverable error: " + status + " - " + e.getResponseBodyAsString());
                        return "AI Analysis Service returned an error (" + status + "). Please try again shortly.";
                    }
                } catch (Exception e) {
                    System.err.println("[LLM] " + model + " attempt " + attempt + " -> Error: " + e.getMessage());
                    if (attempt == 3) break;
                    try { Thread.sleep(5000L); } catch (InterruptedException ie) { Thread.currentThread().interrupt(); }
                }
            }
        }

        System.err.println("[LLM] All models and retries exhausted. Returning Demo Fallback.");
        return "# Mental Health Recovery Report (Demo Mode)\n\n" +
               "## Burnout Severity Score\n" +
               "Score: 65/100 | Status: Moderate Burnout\n" +
               "Based on your answers, you are experiencing significant digital fatigue and high stress levels. Your focus and energy are being drained by over-engagement with digital platforms.\n\n" +
               "## Key Findings\n" +
               "* **High Cortisol Levels:** Constant notifications are keeping your body in a 'fight or flight' state.\n" +
               "* **Sleep Disruption:** Blue light exposure before bed is affecting your REM cycle.\n" +
               "* **Cognitive Overload:** Frequent task-switching is reducing your deep-work capacity.\n\n" +
               "## Your 30-Day Recovery Roadmap\n" +
               "**Week 1 – Immediate Reset:** Implement a 'Digital Sunset' (no screens 90 mins before bed). Start each day with 10 minutes of box breathing.\n" +
               "**Week 2-4 – Habit Rebuilding:** Batch check emails/messages only 3 times a day. Replace one hour of scrolling with a physical activity or reading.\n\n" +
               "## Specific Recommendations\n" +
               "* **Grey-scale Mode:** Turn your phone screen to black & white to reduce dopamine triggers.\n" +
               "* **Forest App:** Use gamified focus tools to keep you off your phone.\n" +
               "* **Nature Walks:** Spend 20 minutes daily in a green space without any devices.\n\n" +
               "## Encouragement\n" +
               "You have already taken the hardest step by acknowledging the burnout. This roadmap is a journey, not a race. Be patient with yourself, and you will see your energy and joy return!";
    }

    private String extractTextFromResponse(Map<String, Object> body) {
        if (body != null && body.containsKey("candidates")) {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");
            if (!candidates.isEmpty()) {
                Map<String, Object> candidate = candidates.get(0);
                String finishReason = (String) candidate.get("finishReason");

                if ("SAFETY".equals(finishReason)) {
                    System.err.println("Gemini API blocked the response due to safety settings.");
                    return "The analysis was blocked by safety filters. Please try again.";
                }

                Map<String, Object> contentResp = (Map<String, Object>) candidate.get("content");
                if (contentResp != null && contentResp.containsKey("parts")) {
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) contentResp.get("parts");
                    if (!parts.isEmpty() && parts.get(0).containsKey("text")) {
                        System.out.println("Gemini API call successful.");
                        return (String) parts.get(0).get("text");
                    }
                }
            }
        }
        System.err.println("Gemini API returned unexpected body: " + body);
        return "Unable to analyze assessment at this time (Unexpected response format). Please try again later.";
    }
}
