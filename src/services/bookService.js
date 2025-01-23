import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebase';

export const calculateRentalPrice = (basePrice, duration) => {
  const weeklyRate = basePrice * 0.1; // 10% of base price per week
  return Math.round(weeklyRate * duration);
};

export const calculateDamageFine = (condition, bookPrice) => {
  const fineRates = {
    slight: 0.2,    // 20% of book price
    moderate: 0.5,  // 50% of book price
    severe: 0.8,    // 80% of book price
    lost: 1.0       // 100% of book price
  };

  return Math.round(bookPrice * (fineRates[condition] || 0));
};

export const rentBook = async (userId, bookId, duration) => {
  const bookRef = doc(db, 'books', bookId);
  
  await updateDoc(bookRef, {
    availableCopies: increment(-1)
  });

  return {
    userId,
    bookId,
    startDate: new Date().toISOString(),
    returnDate: new Date(Date.now() + duration * 7 * 24 * 60 * 60 * 1000).toISOString(),
    duration,
    status: 'active'
  };
};

export const returnBook = async (rentalId, bookId, condition) => {
  const bookRef = doc(db, 'books', bookId);
  
  await updateDoc(bookRef, {
    availableCopies: increment(1)
  });
}; 