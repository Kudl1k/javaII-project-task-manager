package cz.kudladev.taskmanager.repository;

import cz.kudladev.taskmanager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
