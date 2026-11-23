
const scene = document.getElementById("scene");
const button = document.getElementById("toggle");
const confetti = document.getElementById("confetti");

const paperSound = document.getElementById("paperSound");
const birthdayMusic = document.getElementById("birthdayMusic");
const closeSound = document.getElementById("closeSound");

let isOpen = false;
let musicTimer;

function launchConfetti() {
    const colors = [
        "#ffd700",
        "#ff3158",
        "#ff8cbd",
        "#f31273",
        "#ffffff",
        "#e8b65c",
        "#ff4545",
        "#ffa600",
        "#ff0000"
    ];

    // Разлетающиеся конфетти
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");

        piece.className = "confetti-piece";
        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.left = "50%";
        piece.style.top = "45%";

        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 350;

        piece.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
        piece.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

        piece.style.setProperty(
            "--rotation",
            `${Math.random() * 1080 - 540}deg`
        );

        piece.style.animationDelay = `${Math.random() * 0.4}s`;

        confetti.appendChild(piece);

        piece.addEventListener("animationend", () => piece.remove());
    }

    // Золотые искры
    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";
        sparkle.textContent = "✦";

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 300;

        sparkle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        sparkle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        sparkle.style.animationDelay = `${Math.random() * 0.5}s`;

        confetti.appendChild(sparkle);

        sparkle.addEventListener("animationend", () => sparkle.remove());
    }


    // Разлетающиеся конфеты
    const candies = ["🍬", "🍭", "🍫", "🍬", "🍡", "🍭"];

    for (let i = 0; i < 25; i++) {
        const candy = document.createElement("div");

        candy.className = "candy-piece";

        candy.textContent =
            candies[Math.floor(Math.random() * candies.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 300;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        candy.style.setProperty("--x", `${x}px`);
        candy.style.setProperty("--y", `${y}px`);

        candy.style.setProperty(
            "--rotation",
            `${Math.random() * 1080 - 540}deg`
        );

        candy.style.animationDelay = `${Math.random() * 0.4}s`;

        confetti.appendChild(candy);

        candy.addEventListener("animationend", () => {
            candy.remove();
        });
    }

}

button.addEventListener("click", () => {
    isOpen = !isOpen;

    scene.classList.toggle("open", isOpen);

    button.textContent = isOpen
        ? "Закрыть конверт"
        : "Открыть конверт";

    clearTimeout(musicTimer);

    if (isOpen) {
        // Звук открытия открытки
        if (paperSound) {
            paperSound.pause();
            paperSound.currentTime = 0;
            paperSound.volume = 0.7;

            paperSound.play().catch(error => {
                console.log("Ошибка воспроизведения звука:", error);
            });
        }

        // Конфетти
        setTimeout(() => {
            if (!isOpen) return;

            launchConfetti();

            // Праздничная музыка
            musicTimer = setTimeout(() => {
                if (birthdayMusic && isOpen) {
                    birthdayMusic.volume = 0.3;

                    birthdayMusic.play().catch(error => {
                        console.log("Ошибка воспроизведения музыки:", error);
                    });
                }
            }, 500);

        }, 500);

    } else {

    // Остановка музыки
    if (birthdayMusic) {
        birthdayMusic.pause();
        birthdayMusic.currentTime = 0;
    }

    // Остановка звука открытия
    if (paperSound) {
        paperSound.pause();
        paperSound.currentTime = 0;
    }

    // Звук закрытия конверта
    if (closeSound) {
        closeSound.currentTime = 0;
        closeSound.volume = 0.6;

        closeSound.play().catch(error => {
            console.log("Ошибка звука закрытия:", error);
        });
    }
}
});
