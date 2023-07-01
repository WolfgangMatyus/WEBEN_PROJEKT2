package com.backend.controller;

import com.backend.entity.Product;
import com.backend.security.user.User;
import com.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;


    @GetMapping("/get")
    public ResponseEntity<String> getAdmin() {
        return ResponseEntity.ok("ADMIN WORKS");
    }

    @GetMapping("/users")
    public List<User> getAllUser(){return userService.getAllUser();}

    @PutMapping ("/user/{userID}")
    public ResponseEntity<User> updateUser(@PathVariable("userID") Integer userID, @RequestBody User user){
        User existingUser = userService.getUserById(userID);
        if (existingUser != null) {
            existingUser.setEmail(user.getEmail());
            existingUser.setFirstname(user.getFirstname());
            existingUser.setLastname(user.getLastname());
            //existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole());
            existingUser.setActive(user.getActive());
            userService.saveUser(existingUser);
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @DeleteMapping("user/{userID}")
    public ResponseEntity<String> deleteUser(@PathVariable("userID") Integer userId){
        User UserToDelete = userService.getUserById(userId);
        if (UserToDelete != null) {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User with id: " + userId + " successfully deleted!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
