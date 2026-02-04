package com.POS_system_backend.service;

import com.POS_system_backend.entity.User;

import java.util.List;

public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long userId) throws Exception;

    List<User> findAllUsers();

    User getCurrentUser() throws Exception;
}
