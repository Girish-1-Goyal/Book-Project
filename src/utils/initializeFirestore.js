import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

const sampleBooks = [
  {
    title: 'Physics NCERT Class 12',
    author: 'NCERT',
    description: 'Complete physics textbook for class 12 students preparing for board exams and competitive entrance tests.',
    isbn: '978-1234567890',
    category: '12th',
    price: 800,
    imageUrl: 'https://example.com/physics12.jpg',
    availableCopies: 10,
    totalCopies: 10,
    rating: 4.5,
    reviewCount: 25,
    status: 'available'
  },
  {
    title: 'IIT JEE Mathematics',
    author: 'R.D. Sharma',
    description: 'Comprehensive mathematics book for IIT JEE preparation.',
    isbn: '978-0987654321',
    category: 'iit',
    price: 1200,
    imageUrl: 'https://example.com/iitmath.jpg',
    availableCopies: 8,
    totalCopies: 8,
    rating: 4.8,
    reviewCount: 42,
    status: 'available'
  },
  // Add more sample books as needed
];

const sampleUsers = [
  {
    uid: 'admin123',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    userType: 'admin',
    phone: '1234567890',
    address: '123 Admin Street',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  // Add more sample users as needed
];

export async function initializeFirestore() {
  try {
    // Initialize Books Collection
    console.log('Initializing Books Collection...');
    for (const book of sampleBooks) {
      await addDoc(collection(db, 'books'), {
        ...book,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    console.log('Books Collection initialized successfully!');

    // Initialize Users Collection
    console.log('Initializing Users Collection...');
    for (const user of sampleUsers) {
      await setDoc(doc(db, 'users', user.uid), user);
    }
    console.log('Users Collection initialized successfully!');

    // Initialize other collections with sample data
    await addDoc(collection(db, 'book_requests'), {
      userId: 'admin123',
      userName: 'Admin User',
      title: 'Sample Book Request',
      author: 'Sample Author',
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    await addDoc(collection(db, 'reviews'), {
      bookId: 'sample_book_id',
      userId: 'admin123',
      userName: 'Admin User',
      rating: 5,
      review: 'Great book!',
      createdAt: new Date().toISOString()
    });

    console.log('All collections initialized successfully!');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
} 