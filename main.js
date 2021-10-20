(() => {
  const NUMBER_OF_LINES = 26;
  const textRef = document.querySelector(".textContent");
  const COLORS = {
    static: "#191e1f",
    active: "#6CB7C1",
  };

  const container = document.getElementById("root");
  const mainHeight = parseInt(
    window.getComputedStyle(container).height.slice(0, -2)
  );
  const radius = 120;
  const delta = 180 / (NUMBER_OF_LINES - 1); // angle between two lines
  for (let i = 0; i < NUMBER_OF_LINES; i++) {
    const theta = (delta / 180) * i * Math.PI; // angle between start position and current line in radians
    const line = document.createElement("div");
    line.className = "line";
    line.posx = Math.round(radius * Math.cos(theta)) + "px";
    line.posy = Math.round(radius * Math.sin(theta)) + "px";
    line.style.transform = `rotate(${90 - i * delta}deg)`;
    line.style.top = mainHeight / 2 - parseInt(line.posy.slice(0, -2)) + "px";
    line.style.left = mainHeight / 2 + parseInt(line.posx.slice(0, -2)) + "px";
    container.appendChild(line);
  }

  const lines = document.querySelectorAll(".line");
  const updateLinesColor = (count) => {
    const countLines = lines.length;
    lines.forEach((line, idx) => {
      if (idx + 1 > countLines - count) {
        line.style.backgroundColor = COLORS.active;
      } else {
        line.style.backgroundColor = COLORS.static;
      }
    });
  };

  document.addEventListener("scroll", () => {
    const scrollStep = (document.body.offsetHeight - window.innerHeight) / 5;
    let fillPercentage = 0;

    if (window.scrollY >= scrollStep * 5) {
      fillPercentage = 1;
    } else if (window.scrollY > scrollStep * 4) {
      fillPercentage = 0.8;
    } else if (window.scrollY > scrollStep * 3) {
      fillPercentage = 0.6;
    } else if (window.scrollY > scrollStep * 2) {
      fillPercentage = 0.4;
    } else if (window.scrollY > scrollStep) {
      fillPercentage = 0.2;
    }
    updateLinesColor(NUMBER_OF_LINES * fillPercentage);

    const textContent = textRef.textContent.trim();
    const activeTextIdxEnd = Math.floor(textContent.length * fillPercentage);
    const activeText = textContent.slice(0, activeTextIdxEnd);
    const defaultText = textContent.slice(activeTextIdxEnd);
    textRef.innerHTML = `<span class="textContentActive">${activeText}</span>${defaultText}`;
  });
})();
