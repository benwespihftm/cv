const skills = [
  { name: "Active Directory", category: "Systemadministration", level: 90 },
  { name: "Windows Server", category: "Systemadministration", level: 85 },
  { name: "Azure", category: "Cloud", level: 85 },
  { name: "Office 365", category: "Cloud", level: 85 },
  { name: "Network", category: "Systemadministration", level: 80 },
  { name: "PowerShell", category: "Programming", level: 70 },
  { name: "Linux", category: "Systemadministration", level: 50 },
  { name: "JavaScript", category: "Programming", level: 40 }
];

function initSkills() {
  const select = document.getElementById("categoryFilter");
  const cats = [...new Set(skills.map(s => s.category))];
  cats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  renderSkills("Alle");
}

function renderSkills(filter) {
  const container = document.getElementById("skillsContainer");
  container.innerHTML = "";
  const data = filter === "Alle" ? skills : skills.filter(s => s.category === filter);

  data.forEach(skill => {
    const item = document.createElement("div");
    item.className = "skill-item";
    item.innerHTML = `
      <div class="skill-label">${skill.name} (${skill.level}%)</div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" style="width:0"></div>
      </div>
    `;
    container.appendChild(item);
  });

  requestAnimationFrame(() => {
    document.querySelectorAll(".skill-bar-fill").forEach((bar, i) => {
      bar.style.width = data[i].level + "%";
    });
  });
}

function filterSkills() {
  renderSkills(document.getElementById("categoryFilter").value);
}

document.addEventListener("DOMContentLoaded", () => {
  initSkills();
  // Fade-in Animation
  document.querySelectorAll("section").forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(10px)";
    sec.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(sec);
  });
});
