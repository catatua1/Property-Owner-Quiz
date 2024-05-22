import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Function to submit quiz data to Firebase
export async function submitQuizData(email, answers) {
    try {
        const docRef = await addDoc(collection(db, "quizzes"), {
            email: email,
            answers: answers,
            timestamp: serverTimestamp()
        });
        console.log("Document successfully written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
