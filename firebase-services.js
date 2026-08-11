// firebase-services.js

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from
  "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend
} from
  "https://www.gstatic.com/firebasejs/12.10.0/firebase-ai.js";

import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const ai = getAI(app, {
  backend: new GoogleAIBackend()
});

export const model = getGenerativeModel(ai, {
  model: "gemini-3.6-flash"
});

export async function saveContactMessage(data) {
  return addDoc(collection(db, "contact_messages"), {
    name: data.name,
    email: data.email,
    subject: data.subject || "",
    message: data.message,
    createdAt: serverTimestamp(),
    source: "professional-ai-robotics-website"
  });
}
