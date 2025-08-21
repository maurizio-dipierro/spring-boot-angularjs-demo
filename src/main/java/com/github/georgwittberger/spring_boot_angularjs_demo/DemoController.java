package com.github.georgwittberger.spring_boot_angularjs_demo;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api")
public class DemoController {
  
  private final AtomicLong counter = new AtomicLong();
  private final List<User> users = new ArrayList<User>();
  
  public DemoController() {
    users.add(new User(counter.incrementAndGet(), "John", "Doe", "john.doe@example.com"));
    users.add(new User(counter.incrementAndGet(), "Jane", "Smith", "jane.smith@example.com"));
    users.add(new User(counter.incrementAndGet(), "Bob", "Johnson", "bob.johnson@example.com"));
  }
  
  @RequestMapping("/person")
  public Person getPerson() {
    return new Person("James", "Bond");
  }
  
  @RequestMapping("/users")
  public List<User> getUsers() {
    return users;
  }
  
  @RequestMapping(value = "/users", method = RequestMethod.POST)
  public User addUser(@RequestBody Person person) {
    User newUser = new User(counter.incrementAndGet(), person.getFirstName(), person.getLastName(), 
                           person.getFirstName().toLowerCase() + "." + person.getLastName().toLowerCase() + "@example.com");
    users.add(newUser);
    return newUser;
  }
  
  @RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
  public void deleteUser(@PathVariable Long id) {
    for (int i = 0; i < users.size(); i++) {
      if (users.get(i).getId().equals(id)) {
        users.remove(i);
        break;
      }
    }
  }
  
  @RequestMapping("/people/random")
  public List<Person> getRandomPeople() {
    List<Person> people = new ArrayList<Person>();
    people.add(new Person("Alice", "Williams"));
    people.add(new Person("Charlie", "Brown"));
    people.add(new Person("Diana", "Miller"));
    people.add(new Person("Edward", "Davis"));
    return people;
  }
}
