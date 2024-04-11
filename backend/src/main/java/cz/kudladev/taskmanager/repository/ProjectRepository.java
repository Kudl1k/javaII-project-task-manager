package cz.kudladev.taskmanager.repository;

import cz.kudladev.taskmanager.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query(value = "SELECT DISTINCT p FROM Project p LEFT JOIN FETCH p.users")
    List<Project> findAllWithUsers();
}
