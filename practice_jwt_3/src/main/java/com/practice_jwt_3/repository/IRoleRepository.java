package com.practice_jwt_3.repository;

import com.practice_jwt_3.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, Long> {
}
