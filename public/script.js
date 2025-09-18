async function loadInternDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const internId = urlParams.get('internId') || 'INT001';  // Default internId

    const response = await fetch(`/api/intern/${internId}`);
    const intern = await response.json();

    document.querySelector('.intern-dashboard').innerHTML = `
        <h1 style="font-size: 32px;">Name</h1>
        <h2>${intern.name}</h2>
        <h1>Id</h1>
        <h2>${intern.internId}</h2>
        <h1>Mentor</h1>
        <h2>${intern.mentor}</h2>
        <h1>Department</h1>
        <h2>${intern.department}</h2>
        <button class="Explore-button" onclick="scrollToSection()">Explore <i id="down-icon" class="fa-solid fa-angle-down" style="color: #ffffff;"></i></button>
    `;
    document.querySelector('.internship-duration').innerHTML = `
        <h1>Internship Duration</h1>
        <h2>${intern.time}</h2>
    `;
}

async function loadReports() {
    const urlParams = new URLSearchParams(window.location.search);
    const internId = urlParams.get('internId') || 'INT001';

    const response = await fetch(`/api/reports/${internId}`);
    const reportData = await response.json();

    const tableBody = document.getElementById('report-table');
    tableBody.innerHTML = '';

    reportData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.week}</td>
            <td>${data.task}</td>
            <td>${data.status}</td>
            <td>${data.comments}</td>
        `;
        tableBody.appendChild(row);
    });

    // Load and dynamically update the contribution gauge
    let res = await fetch(`/api/intern/${internId}`);
    let int = await res.json();
    const percent = int.percent;

    document.querySelector('.percent-label').innerText = `${percent}%`;

    const fgArc = document.querySelector('.fg-arc');
    const dashArray = 414;
    fgArc.style.strokeDashoffset = `${dashArray - (dashArray * percent) / 100}`;
}
function logout() {
    window.location.href = "/"; // "/" points to login.html
};

window.onload = () => {
    loadInternDetails();
    loadReports();
};

function scrollToSection() {
    document.querySelector(".Explore-button").scrollIntoView({ behavior: "smooth" });
}
