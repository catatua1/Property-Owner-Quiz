// Assuming Firebase has been initialized in another script or needs to be initialized here

// Function to submit quiz data to Firebase
export async function submitQuizData(email, answers) {
    const db = firebase.firestore(); // Ensure firebase is already imported and initialized

    try {
        const docRef = await db.collection("quizzes").add({
            email: email,
            answers: answers,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Document successfully written with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
