package com.recovery.backend.repository;

import com.recovery.backend.model.Assessment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AssessmentRepository extends MongoRepository<Assessment, String> {
    List<Assessment> findByUserId(String userId);
}
