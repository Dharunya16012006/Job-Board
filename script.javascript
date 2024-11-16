// Sample job listings array with some initial jobs
let jobListings = [
    {
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "New York",
      description: "Looking for a skilled frontend developer with experience in React and JavaScript.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
    {
      title: "Backend Developer",
      company: "Innovate Solutions",
      location: "San Francisco",
      description: "Experienced backend developer needed with skills in Node.js and MongoDB.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
    {
      title: "Full Stack Developer",
      company: "Webify",
      location: "Remote",
      description: "Seeking a full stack developer with knowledge in both frontend and backend technologies.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
    {
      title: "UX/UI Designer",
      company: "Creative Minds",
      location: "Austin",
      description: "We are looking for a UX/UI designer to improve user experience and design compelling interfaces.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
    {
      title: "Data Scientist",
      company: "Data Insights",
      location: "Chicago",
      description: "Data Scientist needed to analyze complex datasets and derive actionable insights.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Solutions",
      location: "Seattle",
      description: "Looking for a DevOps engineer to manage cloud infrastructure and automate deployment processes.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
    {
      title: "Product Manager",
      company: "Productify",
      location: "San Francisco",
      description: "Seeking a product manager with experience in managing product life cycles from conception to launch.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
    {
      title: "Software Tester",
      company: "QA Labs",
      location: "New York",
      description: "Join us as a software tester to ensure the quality of our software products.",
      postedDate: new Date().toLocaleDateString(), // Added posted date
    },
  ];
  
  // Load saved job listings from local storage on page load
  function loadSavedJobs() {
    const savedJobs = JSON.parse(localStorage.getItem("jobListings"));
    if (savedJobs) jobListings = savedJobs;
  }
  
  // Save job listings to local storage
  function saveJobs() {
    localStorage.setItem("jobListings", JSON.stringify(jobListings));
  }
  
  // Function to create a single job card element
  function createJobCard(job, index) {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Posted on:</strong> ${job.postedDate}</p>
      <p>${job.description}</p>
      <button class="edit-job" data-index="${index}">Edit</button>
      <button class="delete-job" data-index="${index}">Delete</button>
    `;
    return jobCard;
  }
  
  // Function to display all jobs in the job listings array
  function displayJobs() {
    const jobListingsContainer = document.getElementById("job-listings");
    jobListingsContainer.innerHTML = ''; // Clear current listings
    jobListings.forEach((job, index) => jobListingsContainer.appendChild(createJobCard(job, index)));
  }
  
  // Function to handle new job submission
  function handleJobSubmit(event) {
    event.preventDefault();
  
    const jobTitle = document.getElementById("job-title").value.trim();
    const company = document.getElementById("company").value.trim();
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();
  
    if (jobTitle && company && location && description) {
      // Add the new job to the array and update the display
      const newJob = { 
        title: jobTitle, 
        company, 
        location, 
        description, 
        postedDate: new Date().toLocaleDateString() // Include posted date
      };
      jobListings.push(newJob);
      displayJobs();
      saveJobs(); // Update local storage
  
      // Clear the form fields after submission
      document.getElementById("job-form").reset();
    } else {
      alert("Please fill in all fields.");
    }
  }
  
  // Function to handle job deletion
  function handleJobDelete(event) {
    const index = event.target.dataset.index;
    jobListings.splice(index, 1); // Remove job from the array
    displayJobs();
    saveJobs(); // Update local storage
  }
  
  // Function to handle job editing
  function handleJobEdit(event) {
    const index = event.target.dataset.index;
    const job = jobListings[index];
  
    document.getElementById("job-title").value = job.title;
    document.getElementById("company").value = job.company;
    document.getElementById("location").value = job.location;
    document.getElementById("description").value = job.description;
  
    // Change the submit button to "Update Job"
    const submitButton = document.querySelector("#job-form button");
    submitButton.textContent = "Update Job";
  
    // Add an event listener to update the job on form submission
    document.getElementById("job-form").onsubmit = function(event) {
      event.preventDefault();
      const updatedJob = {
        title: document.getElementById("job-title").value.trim(),
        company: document.getElementById("company").value.trim(),
        location: document.getElementById("location").value.trim(),
        description: document.getElementById("description").value.trim(),
        postedDate: job.postedDate, // Keep the original posted date
      };
      
      jobListings[index] = updatedJob; // Update the job
      displayJobs();
      saveJobs();
      document.getElementById("job-form").reset();
      submitButton.textContent = "Post Job"; // Reset button text
    };
  }
  
  // Event listener for job form submission
  document.getElementById("job-form").addEventListener("submit", handleJobSubmit);
  
  // Event delegation for edit and delete buttons
  document.getElementById("job-listings").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-job")) {
      handleJobDelete(event);
    } else if (event.target.classList.contains("edit-job")) {
      handleJobEdit(event);
    }
  });
  
  // Initial setup to load saved jobs and display them
  loadSavedJobs();
  displayJobs();
  