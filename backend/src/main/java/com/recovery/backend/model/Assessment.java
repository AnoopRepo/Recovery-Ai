package com.recovery.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "assessments")
public class Assessment {
    @Id
    private String id;
    private String userId;
    private String prompt;
    private String response;
    private LocalDateTime createdAt;
}
