package com.event.service;

import com.event.model.Event;
import com.event.model.User;
import com.event.model.UserEvent;
import com.event.repository.EventRepository;
import com.event.repository.UserEventRepository;
import com.event.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserEventService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEventRepository userEventRepository;

    @Autowired
    private EventRepository eventRepository;



    public List<User> getUsersOfParticularEvent(Integer eventId) {
        Event event = eventRepository.findById(eventId).get();
        List<UserEvent> events = userEventRepository.findByEvent(event);
        return events.stream().map(UserEvent::getUser).collect(Collectors.toList());
    }

}
