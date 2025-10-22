const storms = {
  alicia: {
    name: "Alicia",
    location: "14.3°N, 73.5°W",
    maxWinds: "40 NM",
    outerIsobar: "160 NM",
    envPressure: "1009 mb",
    windSpeed: 83, // km/h
    pressure: 1001
  },
  bruno: {
    name: "Bruno",
    location: "20.2°N, 68.1°W",
    maxWinds: "60 NM",
    outerIsobar: "210 NM",
    envPressure: "987 mb",
    windSpeed: 150,
    pressure: 987
  },
  clara: {
    name: "Clara",
    location: "10.8°N, 55.0°W",
    maxWinds: "30 NM",
    outerIsobar: "120 NM",
    envPressure: "1012 mb",
    windSpeed: 60,
    pressure: 1012
  }
};

// populate dropdown
const select = document.getElementById("stormSelect");
Object.keys(storms).forEach(key => {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = storms[key].name;
  select.appendChild(opt);
});

select.addEventListener("change", () => {
  const value = select.value;
  if (value === "none") return;

  const storm = storms[value];
  document.getElementById("location").textContent = storm.location;
  document.getElementById("maxWinds").textContent = storm.maxWinds;
  document.getElementById("outerIsobar").textContent = storm.outerIsobar;
  document.getElementById("envPressure").textContent = storm.envPressure;

  updateGauge(storm.windSpeed, storm.pressure);
});

function updateGauge(windSpeed, pressure) {
  const windCircle = document.getElementById("windCircle");
  const pressureCircle = document.getElementById("pressureCircle");
  const windValue = document.getElementById("windValue");
  const pressureValue = document.getElementById("pressureValue");
  const infoIcon = document.querySelector(".info-icon");
  const infoLine = document.querySelector(".info-line");

  // Gauge calculation
  const windPercent = Math.min(windSpeed / 300, 1);
  const pressurePercent = Math.max((1050 - pressure) / 100, 0);

  const windOffset = 440 - 440 * windPercent;
  const pressureOffset = 440 - 440 * pressurePercent;

  // Color based on wind intensity
  const color = getWindColor(windSpeed);
  windCircle.style.stroke = color;
  pressureCircle.style.stroke = color;
  infoIcon.style.color = color;
  infoLine.style.background = color;

  windCircle.style.strokeDashoffset = windOffset;
  pressureCircle.style.strokeDashoffset = pressureOffset;

  windValue.textContent = `${windSpeed} km/h`;
  pressureValue.textContent = `${pressure} mb`;
}

function getWindColor(speed) {
  if (speed < 62) return "#00ff80"; // tropical depression
  if (speed < 118) return "#ffff00"; // tropical storm
  if (speed < 178) return "#ff8000"; // category 1–2
  if (speed < 252) return "#ff0000"; // category 3–4
  return "#b000ff"; // category 5+
}
