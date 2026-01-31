package com.POS_system_backend.mapper;

import com.POS_system_backend.dto.TrialProfileResponse;
import com.POS_system_backend.dto.TrialSignupRequest;
import com.POS_system_backend.entity.TrialAccount;
import org.springframework.stereotype.Component;

@Component
public class TrialMapper {

    public TrialAccount toEntity(TrialSignupRequest request) {
        if (request == null) {
            return null;
        }
        TrialAccount trialAccount = new TrialAccount();
        trialAccount.setBusinessName(request.getBusinessName());
        trialAccount.setOwnerName(request.getOwnerName());
        trialAccount.setEmail(request.getEmail());
        trialAccount.setMobile(request.getMobile());
        // Password should be encoded in the service layer
        return trialAccount;
    }

    public TrialProfileResponse toProfileResponse(TrialAccount trialAccount) {
        if (trialAccount == null) {
            return null;
        }
        TrialProfileResponse response = new TrialProfileResponse();
        response.setId(trialAccount.getId());
        response.setBusinessName(trialAccount.getBusinessName());
        response.setOwnerName(trialAccount.getOwnerName());
        response.setEmail(trialAccount.getEmail());
        response.setMobile(trialAccount.getMobile());
        response.setPlan(trialAccount.getPlan());
        response.setActive(trialAccount.isActive());
        response.setStartDate(trialAccount.getStartDate());
        response.setEndDate(trialAccount.getEndDate());
        response.setMaxBranches(trialAccount.getMaxBranches());
        response.setMaxUsers(trialAccount.getMaxUsers());
        return response;
    }
}
