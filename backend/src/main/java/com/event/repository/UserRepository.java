package com.event.repository;

import com.event.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
 
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserName(String userName);

    User save(User user);
}
