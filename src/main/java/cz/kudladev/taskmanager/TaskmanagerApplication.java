package cz.kudladev.taskmanager;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
@Log4j2
public class TaskmanagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskmanagerApplication.class, args);
        waitForKeyPress();
    }

    private static void waitForKeyPress() {
        try {
            System.in.read();
        } catch (IOException e) {
            log.error("Cannot read input from keyboard.", e);
        }
    }


}
