import { initializeFirestore } from './initializeFirestore';

async function initializeApp() {
  console.log('Starting Firestore initialization...');
  await initializeFirestore();
  console.log('Firestore initialization completed!');
}

// Run the initialization
initializeApp().catch(console.error); 