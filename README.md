# Book Rental System

> Last Updated: 2025-01-29 13:24:54 UTC  
> Author: Girish-1-Goyal

<p align="center">
  <img src="https://img.freepik.com/free-vector/colorful-stacked-books-illustration_1308-166065.jpg?ga=GA1.1.1515059845.1735477248&semt=ais_hybrid" alt="Book Rental System Logo"/>
</p>

## 📚 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [System Design](#system-design)
4. [Tech Stack](#tech-stack)
5. [Project Setup](#project-setup)
6. [Usage Guide](#usage-guide)
7. [API Reference](#api-reference)
8. [Contributing](#contributing)
9. [License](#license)

## 📖 Overview

Book Rental System is a modern web application revolutionizing educational access through an innovative book rental platform. Launched in 2024, we're dedicated to making quality education materials affordable and accessible to all students.

### 🎯 Mission Statement
To democratize education by providing affordable access to academic resources through our innovative rental system, bridging the gap between students and learning materials.

### 🌟 Key Statistics
- In Development Mode

## ✨ Features

### 1. 📚 Book Collection
- Comprehensive academic library
- Specialized exam preparation materials
  - IIT-JEE
  - NEET
  - UPSC
  - State Board (10th-12th)

### 2. 👥 User System
- Secure authentication
- Profile customization
- Password recovery
- Role-based permissions

### 3. 🛒 Rental Management
- Flexible rental periods
- Automated reminders
- Dynamic pricing
- Digital receipts

## 🎨 System Design

### UML Class Diagram

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
        +resetPassword()
    }

    class Book {
        +String id
        +String title
        +String author
        +Number basePrice
        +Number availableCopies
        +String category
        +getDetails()
        +updateAvailability()
        +calculateRent()
    }

    class Cart {
        +String userId
        +Array items
        +Number total
        +addItem()
        +removeItem()
        +calculateTotal()
        +checkout()
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
        +extendRental()
    }

    class Payment {
        +String id
        +String rentalId
        +Number amount
        +String status
        +processPayment()
        +generateReceipt()
    }

    User "1" -- "*" Cart : has
    User "1" -- "*" Rental : makes
    Book "1" -- "*" Rental : involved in
    Cart "*" -- "*" Book : contains
    Rental "1" -- "1" Payment : processes
