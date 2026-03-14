/* ============================================================
   LÓGICA FINAL: CARTA PARA REBEKA (MIA FILMES)
   ============================================================ */

const cursor = document.querySelector('.custom-cursor');
const intro = document.getElementById('intro-trigger');
const letter = document.getElementById('letterSection');
const typewriter = document.getElementById('typewriter-content');
const mia = document.getElementById('mia-interactive');
const miauAudio = document.getElementById('miau-audio');
const glassCard = document.querySelector('.glass-card');
const consentScreen = document.getElementById('consent-overlay');
const btnAceitar = document.getElementById('btn-aceitar');
const btnNegar = document.getElementById('btn-negar');

// 1. GESTÃO DE CONSENTIMENTO
btnAceitar.addEventListener('click', () => {
    gsap.to(consentScreen, { opacity: 0, duration: 0.5, onComplete: () => {
        consentScreen.style.display = 'none';
        intro.style.display = 'block'; // Libera a claquete apenas aqui
        gsap.fromTo(intro, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8 });
    }});
});

btnNegar.addEventListener('click', () => {
    gsap.to(consentScreen, { opacity: 0, duration: 0.5, onComplete: () => {
        consentScreen.style.display = 'none';
        typewriter.innerHTML = "<p style='color: white; font-size: 1.3rem; padding: 20px;'>Sem problemas, Rebeka! 😊<br><br>Nossa amizade vale muito mais que qualquer roteiro. A carta estará aqui para quando você se sentir pronta.</p>";
        letter.style.display = 'block';
        gsap.to(letter, { opacity: 1, duration: 1 });
        mia.classList.add('mia-visible');
    }});
});

// 2. CURSOR E INTERAÇÕES
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
});

mia.addEventListener('click', () => {
    if (miauAudio) miauAudio.play();
    gsap.to(mia, { y: -25, duration: 0.2, yoyo: true, repeat: 1 });
});

// 3. ROTEIRO (TEXTO ORIGINAL PRESERVADO)
const roteiro = [
    { t: "Minha cara Senhorita Rebeka,\n\n", c: "ian-style" },
    { t: "Escrevo esta carta na esperança de que algum dia ela possa chegar às suas mãos.\n\n" },
    { t: "Quase uma década", c: "baianes-style", h: "Desde aquela formatura, quando meu mundo mudou" },
    { t: " se passou desde que você apareceu em minha vida. Acreditará se eu lhe assegurar que para mim nada mudou durante este tempo todo? Que não perdi a esperança de que um dia você volte para onde sempre pertenceu? Que ainda sinto você rabiscando meu braço?\n\n" },
    { t: "Perdoe-me, meu amor, por não ter sido capaz de " },
    { t: "prendê-la aqui", c: "baianes-style", h: "Queria ter te segurado comigo para sempre" },
    { t: ". Perdoe-me por não ter sido rápido o bastante. Tudo seria diferente se eu tivesse sido capaz de impedir que o tempo nos levasse para direções distintas. Contudo, eu não lamento nada. Os momentos em que passei ao seu lado foram os mais preciosos da minha existência.\n\n" },
    { t: "Agradeço todas as noites por tê-la em minha vida, mesmo que por caminhos tortuosos. Desejo fervorosamente que esteja feliz. Não posso suportar, sequer pensar, que você não tenha tido a vida plena que merece.\n\n" },
    { t: "Nunca desisti de encontrá-la. Talvez eu tenha encontrado uma solução agora, nesta pequena produção da " },
    { t: "Coqueteria", c: "baianes-style", h: "Onde eu uso o crochê para expressar o que me doi dizer" },
    { t: ". Talvez eu possa, finalmente, ir buscá-la.\n\n" },
    { t: "Não sou capaz de lhe dizer adeus, pois sei que ainda nos veremos outra vez. E se puder ler estas linhas, não se esqueça que " },
    { t: "a amei desde o primeiro instante", c: "baianes-style", h: "Quando você treinou a valsa da formatura comigo" },
    { t: " e a amarei até o último. Talvez até depois.\n\n" },
    { t: "Vemo-nos em breve,\n\n" },
    { t: "Eternamente seu,\n\n" },
    { t: "Ollie.", c: "baianes-style", h: "Oliver Santos" }
];

// 4. SEQUÊNCIA "ACTION!"
intro.addEventListener('click', () => {
    gsap.to(intro, { opacity: 0, scale: 0.9, duration: 0.5, onComplete: () => {
        intro.style.display = 'none';
        letter.style.display = 'block';
        mia.classList.add('mia-visible');
        
        const bubble = mia.querySelector('.speech-bubble');
        gsap.fromTo(bubble, { scale: 0, opacity: 0, transformOrigin: "bottom right" },
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5,
              onStart: () => { if(miauAudio) miauAudio.play(); } 
            }
        );

        setTimeout(() => {
            gsap.to(letter, { opacity: 1, duration: 1 });
            iniciarEscrita();
            gsap.to(bubble, { opacity: 0, duration: 1, delay: 3 });
        }, 1800);
    }});
});

// 5. TYPEWRITER & AUTO-SCROLL
async function iniciarEscrita() {
    for (const trecho of roteiro) {
        const span = document.createElement('span');
        if (trecho.c) span.className = trecho.c;
        if (trecho.h) {
            span.title = trecho.h;
            span.style.cursor = "help";
            span.style.borderBottom = "1px dashed var(--neon-glow)";
        }
        typewriter.appendChild(span);

        for (const char of trecho.t) {
            span.textContent += char;
            glassCard.scrollTop = glassCard.scrollHeight; // Scroll automático

            let pausa = 35 + Math.random() * 35;
            if (char === '.' || char === '?' || char === '!') pausa += 500;
            if (char === ',') pausa += 200;
            await new Promise(r => setTimeout(r, pausa));
        }
    }
}