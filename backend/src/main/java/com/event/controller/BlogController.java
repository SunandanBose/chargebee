package com.event.controller;

import com.event.model.Blog;
import com.event.model.EventWithFile;
import com.event.service.BlogService;
import com.event.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.event.model.Tag;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;

@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private ImageService imageService;

    @PostMapping(value = "/blogs")
    private String createNewBlog(@RequestParam("event") String model, @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Blog blog = mapper.readValue(model, Blog.class);
        blogService.create(new EventWithFile(file, blog));
        return "Successful";
    }
    //TODO : Donot return objects return response Entity
    @GetMapping(value = "/blogs")
    private List<Blog> getBlogs(){

        return blogService.getBlogs();
    }

    @GetMapping(value = "/image/{id}")
    private ResponseEntity<Resource> uploadImage(@PathVariable(value = "id") Integer blogId, HttpServletRequest request){
        String fileName = String.valueOf(blogId);
        return blogService.fetchImage(fileName,request);
        //imageService.save(file);
    }

    @RequestMapping(value = "/blogs/{id}", method = RequestMethod.DELETE)
    private void deleteBlog(@PathVariable(value = "id") Integer id){
        blogService.delete(id);
    }

    @GetMapping(value = "/tags")
    private List<Tag> getTags(){
        return blogService.getAllTags();
    }
}
