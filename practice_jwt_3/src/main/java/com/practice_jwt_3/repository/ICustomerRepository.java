package com.practice_jwt_3.repository;

import com.practice_jwt_3.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerRepository extends JpaRepository<Customer, Long> {
}
