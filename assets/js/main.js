/* =========================================================
   NONRE — configurações
   ========================================================= */

// Número do WhatsApp: só números, com 55 + DDD. Exemplo: "5511987654321"
const WHATSAPP = "";

/* =========================================================
   Links do WhatsApp: todo elemento com data-zap="mensagem"
   ========================================================= */
(function () {
  const numero = WHATSAPP.replace(/\D/g, "");
  const valido = numero.length >= 12;
  document.querySelectorAll("[data-zap]").forEach((el) => {
    if (!valido) return; // sem número: os botões levam para a seção de contato
    el.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(el.dataset.zap);
    el.target = "_blank";
    el.rel = "noopener";
  });
  const aviso = document.getElementById("aviso-zap");
  if (aviso && !valido) aviso.hidden = false;
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();

/* =========================================================
   Topo: fundo ao rolar + menu do celular
   ========================================================= */
(function () {
  const topo = document.getElementById("topo");
  const onScroll = () => topo.classList.toggle("rolou", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  const fechar = () => {
    menu.classList.remove("aberto");
    btn.setAttribute("aria-expanded", "false");
  };
  btn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    btn.setAttribute("aria-expanded", String(aberto));
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fechar));
  document.addEventListener("keydown", (e) => e.key === "Escape" && fechar());
})();

/* =========================================================
   Elementos aparecem suavemente ao rolar
   ========================================================= */
(function () {
  const els = document.querySelectorAll(".revelar");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visivel"));
    return;
  }
  const obs = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => obs.observe(el));
})();

/* =========================================================
   Casa interativa: luzes, tomada, câmera e cenas da Alexa
   ========================================================= */
(function () {
  const casa = document.getElementById("casa");
  if (!casa) return;
  const fala = document.getElementById("fala");
  const nomes = {
    sala: "Luz da sala",
    quarto: "Luz do quarto",
    cozinha: "Luz da cozinha",
    jardim: "Luz externa",
    tomada: "Cafeteira",
    camera: "Câmera externa",
  };
  const estado = { sala: false, quarto: false, cozinha: false, jardim: false, tomada: false, camera: true };

  function aplicar() {
    Object.entries(estado).forEach(([item, ligado]) => {
      const alvo = casa.querySelector('[data-item="' + item + '"]');
      if (alvo) alvo.classList.toggle("on", ligado);
      const botao = document.querySelector('.ctrl[data-alvo="' + item + '"]');
      if (botao) botao.setAttribute("aria-pressed", String(ligado));
    });
  }

  document.querySelectorAll(".ctrl").forEach((b) =>
    b.addEventListener("click", () => {
      const item = b.dataset.alvo;
      estado[item] = !estado[item];
      aplicar();
      fala.textContent = nomes[item] + (estado[item] ? " ligada." : " desligada.");
    })
  );

  const cenas = {
    cheguei: {
      texto: "Bem-vindo! Acendendo a sala, a cozinha e a luz externa.",
      passos: [["jardim", true], ["sala", true], ["cozinha", true]],
    },
    noite: {
      texto: "Boa noite! Apagando a casa e deixando a luz externa e a câmera ligadas.",
      passos: [["sala", false], ["cozinha", false], ["quarto", false], ["tomada", false], ["jardim", true], ["camera", true]],
    },
  };

  document.querySelectorAll(".cena").forEach((b) =>
    b.addEventListener("click", () => {
      const cena = cenas[b.dataset.cena];
      fala.textContent = cena.texto;
      cena.passos.forEach(([item, valor], i) =>
        setTimeout(() => {
          estado[item] = valor;
          aplicar();
        }, i * 280)
      );
    })
  );

  // Demonstração automática ao aparecer na tela (uma vez), para chamar atenção
  aplicar();
  const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduzido && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return;
      obs.disconnect();
      setTimeout(() => document.querySelector('.cena[data-cena="cheguei"]').click(), 3200);
    }, { threshold: 0.5 });
    obs.observe(casa);
  }
})();
