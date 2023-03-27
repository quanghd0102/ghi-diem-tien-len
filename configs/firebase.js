import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJjFV_Me1sYqrn_WX9ZtAB99z4I6d9Fmc",
  authDomain: "tien-len-ghi-diem.firebaseapp.com",
  projectId: "tien-len-ghi-diem",
  storageBucket: "tien-len-ghi-diem.appspot.com",
  messagingSenderId: "469752036967",
  appId: "1:469752036967:web:cd139ea8bd0ff0e6401ec2",
  measurementId: "G-N1JTDFHK1G",
};

const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
