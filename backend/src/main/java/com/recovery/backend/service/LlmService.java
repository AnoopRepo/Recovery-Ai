package com.recovery.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LlmService {

    @Value("${llm.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String analyzeAssessment(String answers) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

        String prompt = "You are a world-class digital burnout recovery expert. Based on the user's assessment answers below, provide a comprehensive yet concise recovery analysis.\n\n" +
                "Structure your response using Markdown:\n" +
                "1. **Burnout Score**: A score from 0-100 indicating the severity.\n" +
                "2. **Key Findings**: A brief analysis of their current state.\n" +
                "3. **Personalized Recovery Plan**: 3-5 actionable steps tailored to their specific answers.\n" +
                "4. **Encouragement**: A final supportive closing statement.\n\n" +
                "User Answers:\n" + answers;

        System.out.println("Calling Gemini API with model: gemini-1.5-flash");

        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        // Safety settings to ensure response is not blocked for burnout topics
        Map<String, Object> safetySetting = new HashMap<>();
        safetySetting.put("category", "HARM_CATEGORY_HARASSMENT");
        safetySetting.put("threshold", "BLOCK_NONE");
        
        Map<String, Object> safetySetting2 = new HashMap<>();
        safetySetting2.put("category", "HARM_CATEGORY_HATE_SPEECH");
        safetySetting2.put("threshold", "BLOCK_NONE");

        Map<String, Object> safetySetting3 = new HashMap<>();
        safetySetting3.put("category", "HARM_CATEGORY_SEXUALLY_EXPLICIT");
        safetySetting3.put("threshold", "BLOCK_NONE");

        Map<String, Object> safetySetting4 = new HashMap<>();
        safetySetting4.put("category", "HARM_CATEGORY_DANGEROUS_CONTENT");
        safetySetting4.put("threshold", "BLOCK_NONE");

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));
        requestBody.put("safetySettings", List.of(safetySetting, safetySetting2, safetySetting3, safetySetting4));

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            Map<String, Object> body = response.getBody();
            if (body != null && body.containsKey("candidates")) {
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");
                if (!candidates.isEmpty()) {
                    Map<String, Object> contentResp = (Map<String, Object>) candidates.get(0).get("content");
                    if (contentResp != null && contentResp.containsKey("parts")) {
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) contentResp.get("parts");
                        System.out.println("Gemini API call successful.");
                        return (String) parts.get(0).get("text");
                    }
                }
            }
            System.err.println("Gemini API returned unexpected body: " + body);
            return "Unable to analyze assessment at this time. Please try again later.";
        } catch (org.springframework.web.client.HttpStatusCodeException e) {
            System.err.println("Gemini API HTTP Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            return "AI Analysis Service currently unavailable (Error " + e.getStatusCode() + "). Please try again shortly.";
        } catch (Exception e) {
            System.err.println("Gemini API General Error: " + e.getMessage());
            e.printStackTrace();
            return "An unexpected error occurred while generating your recovery plan. Please try again.";
        }
    }
}
