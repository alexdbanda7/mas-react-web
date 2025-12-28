// // Import Firebase functions
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAvLT7eG5hx7hgcm8lL6nQi3_qOIlEu4-s",
//   authDomain: "mas-web-ebbbd.firebaseapp.com",
//   projectId: "mas-web-ebbbd",
//   storageBucket: "mas-web-ebbbd.firebasestorage.app",
//   messagingSenderId: "121567501994",
//   appId: "1:121567501994:web:25119521aee4dad427bad3",
//   measurementId: "G-ZND4HD2TK5"
// };

// // Initialize Firebase
// // Initialize Firebase app and Firestore
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const initialProjectsData = [
//   {
//     id: "project1",
//     data: {
//       likes: 0,
//       comments: []
//     }
//   },
//   {
//     id: "project2",
//     data: {
//       likes: 0,
//       comments: []
//     }
//   },
//   {
//     id: "project3",
//     data: {
//       likes: 0,
//       comments: []
//     }
//   }
// ];

// initializeProjects().catch(console.error);