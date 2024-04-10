package cz.kudladev.taskmanager.repository;

import cz.kudladev.taskmanager.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProjectRepository extends JpaRepository<Project, Long> {

}
