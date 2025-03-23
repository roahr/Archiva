// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseRegistration {
    // Struct to store course details
    struct Course {
        string name;
        uint256 capacity;
        uint256 enrolledCount;
        mapping(address => bool) enrolledStudents;
    }

    // Mapping from course ID to Course struct
    mapping(uint256 => Course) public courses;
    
    // Event to log course registration
    event Registered(address indexed student, uint256 courseId);
    
    // Function to create a course
    function createCourse(uint256 courseId, string memory courseName, uint256 capacity) public {
        Course storage newCourse = courses[courseId];
        newCourse.name = courseName;
        newCourse.capacity = capacity;
        newCourse.enrolledCount = 0;
    }
    
    // Function to register for a course
    function registerForCourse(uint256 courseId) public {
        Course storage course = courses[courseId];
        
        // Ensure the course exists and is not full
        require(bytes(course.name).length != 0, "Course does not exist");
        require(course.enrolledCount < course.capacity, "Course is full");
        
        // Ensure the student is not already registered
        require(!course.enrolledStudents[msg.sender], "Already registered for this course");
        
        // Register the student
        course.enrolledStudents[msg.sender] = true;
        course.enrolledCount++;
        
        // Emit an event for the registration
        emit Registered(msg.sender, courseId);
    }
    
    // Function to check if a student is registered for a course
    function isRegistered(uint256 courseId, address student) public view returns (bool) {
        return courses[courseId].enrolledStudents[student];
    }
    
    // Function to get course details
    function getCourseDetails(uint256 courseId) public view returns (string memory name, uint256 capacity, uint256 enrolledCount) {
        Course storage course = courses[courseId];
        return (course.name, course.capacity, course.enrolledCount);
    }
}
