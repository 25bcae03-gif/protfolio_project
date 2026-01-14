import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { addDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

async function fetchProfileDtls() {
    const snapshot = await getDocs(collection (db,"portfolio"));
    snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data.name);
        document.getElementById("profile-name").innerText = data.name;
        document.getElementById("profile-about").innerText = data.about;
        document.getElementById("email-me").innerText = data.email;
        document.getElementById("contact-me").innerText = data.phone_no;
       document.getElementById("web-me").innerText = data.role;

    });
}

async function fetchEducationDtls() {
    const snapshot = await getDocs(collection(db, "education"));
    snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data.degree);
        document.getElementById("education").innerHTML += 
        `<ul>
        <li><span>${data.year} - ${data.grade}%</span><br>${data.degree} from ${data.institute} </li>
        </ul>`;
    });
}
async function fetchskillsDtls() {
    const snapshot = await getDocs(collection(db, "skills"));
    snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data.skills);
        document.getElementById("skills").innerHTML += 
        `<ul>
        <li>${data.skills}  <br> ${data.skill_desc}</li>
        </ul>`;
    });
}
async function fetchExperienceDtls() {
    const snapshot =await getDocs(collection(db, "experience"));
    snapshot.forEach(doc =>{
        const data = doc.data();
        console.log(data.experience);
        document.getElementById("experience").innerHTML += 
        `<ul>
        <li><span>${data.year}</span> <br> ${data.working}<br><span>${data.year}</span> <br> ${data.talent} </li>
        </ul>`;
    })
    
}
async function fetchCourseDtls() {
    const snapshot = await getDocs(collection(db, "course"));
    snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data.course);
        document.getElementById("course").innerHTML +=
        `<ul>
       <li><span>${data.year} </span> <br> ${data.course}</li>
        </ul>`;
    })
    
}
async function fetchINTERESTDtls() {
  const container = document.getElementById("services-container");
  container.innerHTML = "";

  const snapshot = await getDocs(collection(db, "interest"));

  snapshot.forEach(doc => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "service";

    card.innerHTML = `
      <i class="${data.icon}"></i>
      <h2>${data.interest}</h2>
      <p>${data.interest_desc}</p>
      <a href="#">Learn more</a>
    `;

    container.appendChild(card);
  });
}
window.addEventListener("DOMContentLoaded", fetchINTERESTDtls);

async function fetchWorkDtls() {
    const snapshot = await getDocs(collection(db, "work"));
    const workDivs = document.querySelectorAll("#work-container .work");

    let index = 0;
    snapshot.forEach(doc => {
        const data = doc.data();
        if (workDivs[index]) {
            const h3 = workDivs[index].querySelector("h3");
            const p = workDivs[index].querySelector("p");
            const img = workDivs[index].querySelector("img");
            const a = workDivs[index].querySelector("a");

            if (h3) h3.textContent = data.work || "";
            if (p) p.textContent = data.work_desc || "";
            if (img && data.image) img.src = data.image;
            if (a && data.link) a.href = data.link;
        }
        index++;
    });
}



fetchProfileDtls();
fetchEducationDtls();
fetchskillsDtls();
fetchExperienceDtls();
fetchCourseDtls();
fetchWorkDtls();

// Contact form submission to Firebase
async function submitContactForm(name, email, message) {
    try {
        const docRef = await addDoc(collection(db, "contact"), {
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = form.Name.value;
            const email = form.email.value;
            const message = form.message.value;

            const success = await submitContactForm(name, email, message);

            if (success) {
                msg.innerHTML = "Message sent successfully";
                msg.style.color = "green";
                form.reset();
                setTimeout(function() {
                    msg.innerHTML = "";
                }, 5000);
            } else {
                msg.innerHTML = "Error sending message. Please try again.";
                msg.style.color = "red";
                setTimeout(function() {
                    msg.innerHTML = "";
                }, 5000);
            }
        });
    }
});




