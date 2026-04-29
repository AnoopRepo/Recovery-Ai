package com.recovery.backend.controller;

import com.recovery.backend.model.Assessment;
import com.recovery.backend.repository.AssessmentRepository;
import com.recovery.backend.security.UserDetailsImpl;
import com.recovery.backend.service.LlmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private LlmService llmService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitAssessment(@RequestBody Map<String, String> request, Authentication authentication) {
        String answers = request.get("answers");
        
        String llmResponse = llmService.analyzeAssessment(answers);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        Assessment assessment = Assessment.builder()
                .userId(userDetails.getId())
                .prompt(answers)
                .response(llmResponse)
                .createdAt(LocalDateTime.now())
                .build();
                
        assessmentRepository.save(assessment);

        return ResponseEntity.ok(Map.of("analysis", llmResponse));
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<Assessment> assessments = assessmentRepository.findByUserId(userDetails.getId());
        return ResponseEntity.ok(assessments);
    }
}
