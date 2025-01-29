# Book Rental System

![Book Rental System](https://your-image-url-here.com/book-rental-logo.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

Book Rental System is a modern web application designed to make education accessible through an innovative book rental platform. Founded in 2024, the system provides affordable access to educational books, particularly focusing on academic and competitive exam preparation materials.

### Mission Statement
To make quality education accessible to everyone by providing affordable access to educational books through an innovative rental system. Our platform bridges the gap between students and resources, making learning more accessible and sustainable.

## Features

### Core Functionality
1. **Extensive Book Collection**
   - Access to thousands of academic books
   - Specialized collections for:
     - 10th-12th standard
     - IIT preparation
     - UPSC preparation
     - NEET preparation

2. **User Management**
   - User registration and authentication
   - Profile management
   - Password recovery system
   - Role-based access control

3. **Book Management**
   - Detailed book listings
   - Search and filter capabilities
   - Book availability tracking
   - Coming soon section

4. **Rental System**
   - Flexible rental durations (1 week to 1 year)
   - Easy renewal options
   - Automated return date tracking
   - Dynamic pricing system

5. **Shopping Cart**
   - Add/remove books
   - Rental duration selection
   - Price calculation
   - Checkout process

6. **Security Features**
   - Secure authentication
   - Protected routes
   - Data encryption
   - Safe payment gateway

## Architecture

### System Architecture (UML)

```mermaid
classDiagram
    class User {
        +String uid
        +String email
        +String name
        +String role
        +register()
        +login()
        +updateProfile()
    }

    class Book {
        +String id
        +String title
        +String author
        +Number basePrice
        +Number availableCopies
        +getDetails()
        +updateAvailability()
    }

    class Cart {
        +String userId
        +Array items
        +Number total
        +addItem()
        +removeItem()
        +calculateTotal()
    }

    class Rental {
        +String id
        +String userId
        +String bookId
        +Date startDate
        +Date returnDate
        +String status
        +createRental()
        +processReturn()
    }

    User "1" -- "*" Cart : has
    User "1" -- "*" Rental : makes
    Book "1" -- "*" Rental : involved in
    Cart "*" -- "*" Book : contains
