const price = {
  Silver_bullion: 903,
  Steel_bullion: 171,
  Orichalcorn_bullion: 1601,
  Adamantite_bullion: 948,
  Silver_req: 32,
  Steel_req: 64,
  Orichalcorn_req: 24,
  Adamantite_req: 32,
  box_1: { plywood: 658, nail: 52 },
  box_2: { plywood: 542, nail: 35 },
  box_3: { plywood: 501, nail: 18 }
};

const minerals = {
  Silver_bullion: { unitPrice: price.Silver_bullion, req: price.Silver_req, name: "은 원석" },
  Steel_bullion: { unitPrice: price.Steel_bullion, req: price.Steel_req, name: "강철 원석" },
  Orichalcorn_bullion: { unitPrice: price.Orichalcorn_bullion, req: price.Orichalcorn_req, name: "오리할콘 원석" },
  Adamantite_bullion: { unitPrice: price.Adamantite_bullion, req: price.Adamantite_req, name: "아다만타이트 원석" }
};

const boxes = [
  { name: "1단계 상자", ...price.box_1 },
  { name: "2단계 상자", ...price.box_2 },
  { name: "3단계 상자", ...price.box_3 }
];

function calPrice(oreType, oreReq, box) {
  return (oreType * oreReq) + (box.plywood * 3) + (box.nail * 2);
}

function calculateSelected() {
  const selected = document.getElementById("mineral").value;
  const mineral = minerals[selected];

  let result = `== ${mineral.name} ==\n`;

  boxes.forEach(box => {
    const total = calPrice(mineral.unitPrice, mineral.req, box);
    result += `${box.name}: 총 가격 = ${total} DP\n`;
  });

  document.getElementById("result").innerText = result;
}

// 다크모드 토글
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("theme-icon");

  if (body.dataset.theme === "dark") {
    body.dataset.theme = "light";
    localStorage.setItem("theme", "light");
    icon.textContent = "🌙";
  } else {
    body.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
    icon.textContent = "🌞";
  }
}

// 초기 테마 적용
(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.dataset.theme = "dark";
    document.getElementById("theme-icon").textContent = "🌞";
  } else {
    document.body.dataset.theme = "light";
    document.getElementById("theme-icon").textContent = "🌙";
  }
})();
