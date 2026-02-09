package com.POS_system_backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public-deprecated")
@Tag(name = "Public Controller (Deprecated)", description = "Deprecated public endpoints")
public class PublicController {
    // This controller is deprecated. Use DemoController instead.
}
