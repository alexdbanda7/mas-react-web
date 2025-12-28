// // initializeProjects.js
// import { initializeApp } from "firebase/app";
// import { getFirestore, doc, setDoc } from "firebase/firestore";

// // TODO: Replace with your actual Firebase config values
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// // Initialize Firebase
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

// async function initializeProjects() {
//   for (const project of initialProjectsData) {
//     await setDoc(doc(db, "projects", project.id), project.data);
//     console.log(`Initialized ${project.id}`);
//   }
//   console.log("All projects initialized!");
// }

// initializeProjects().catch(console.error);
