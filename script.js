document.addEventListener('DOMContentLoaded', () => {

    if (typeof gsap === 'undefined') {
        console.warn("GSAP not loaded yet. Waiting...");
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const messages = [
        "youre the prettiest girl EVER its NOT EVEN CLOSE",
        "i love you SOOOOO MUCH <3",
        "im gonna give you the FATTEST kiss EVER EVER EVER",
        "i love your beautiful smile SO MUCH YOURE SO PRETTY I LOVE IT",
        "your face is getting licked twin....",
        "youre so fucking cute :(",
        "i love how intelligent you are <3",
        "hi poop handpictur for you later :D",
        "i love you more than cs :DD",
        "youre my pretty princess forever <3",
        "eyes so pretty i could cry (true..)",
        "i believe in you so much <3",
        "im SO proud of you every single fucking day",
        "youre the sweetest girl EVER",
        "im gonna cum on your gorgeous face :D",
        "i cant wait to kiss you ALLL over",
        "oh no is that the the mistletoe oh noooo!!!! we have to kiss",
        "whos the prettiest girl in the world?",
        "im gonna hit you :D",
        "date idea we kiss and makeout and fuck :DDDDDD",
        "mistletoe... why are you back.... fine..... one more kiss",
        "who am i SO proud of every day?",
        "...... you know what that means......",
        "I LOVE MY FUCKING WIFE SO MUCH",
        "whos my baby?"
    ];

    const specialInteractions = {
        18: {
            type: 'quiz',
            correct: "YOU (The prettiest)",
            wrong: "every other girl",
            successMsg: "YEAHHH GOOD JOBBB BABY OBVIOUSLY ITS YOU"
        },
        22: {
            type: 'quiz',
            correct: "MY BABY (YOU)",
            wrong: "RANDOM RETARDS ON CS",
            successMsg: "YEAHHH YOU BEEET IM ALWAYS SO PROUD <3"
        }
    };

    const daysData = Array.from({ length: 24 }, (_, i) => {
        const dayNum = i + 1;
        const imgIndex = ((i) % 8) + 1;
        return {
            id: dayNum,
            msg: messages[i % messages.length] || "MERRY CHRISTMAS",
            img: `images/${imgIndex}.png`,
            interaction: specialInteractions[dayNum] || null
        };
    });

    const container = document.getElementById('path-grid');
    if (!container) return;

    const giftModal = document.getElementById('gift-modal');

    const verticalSpacing = 350;
    const totalHeight = (daysData.length + 1) * verticalSpacing;
    container.style.height = `${totalHeight}px`;

    daysData.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = 'day-card';
        card.innerHTML = `${day.id}`;
        card.addEventListener('click', () => openGift(day));
        container.appendChild(card);

        const isEven = index % 2 === 0;
        const leftPercent = isEven ? 35 : 65;
        const topPos = (index * verticalSpacing) + 100;
        card.style.left = `${leftPercent}%`;
        card.style.top = `${topPos}px`;

        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 85%" },
            scale: 0, opacity: 0, duration: 0.5, ease: "back.out(1.7)"
        });
    });

    function connectDots() {
        const svgPath = document.getElementById('dynamic-path');
        if (!svgPath) return;
        const cards = document.querySelectorAll('.day-card');
        const containerRect = container.getBoundingClientRect();
        if(cards.length === 0) return;
        let d = "";

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const x = rect.left + rect.width / 2 - containerRect.left;
            const y = rect.top + rect.height / 2 - containerRect.top;

            if (index === 0) {
                d += `M ${x} ${y}`;
            } else {
                const prevCard = cards[index - 1];
                const prevRect = prevCard.getBoundingClientRect();
                const prevX = prevRect.left + prevRect.width / 2 - containerRect.left;
                const prevY = prevRect.top + prevRect.height / 2 - containerRect.top;
                d += ` C ${prevX} ${prevY + (y - prevY) / 2}, ${x} ${prevY + (y - prevY) / 2}, ${x} ${y}`;
            }
        });

        const caseEl = document.getElementById('case-trigger');
        if(caseEl) {
            const lastCard = cards[cards.length - 1];
            const lastRect = lastCard.getBoundingClientRect();
            const lastX = lastRect.left + lastRect.width / 2 - containerRect.left;
            const lastY = lastRect.top + lastRect.height / 2 - containerRect.top;
            const caseRect = caseEl.getBoundingClientRect();
            const caseX = caseRect.left + caseRect.width / 2 - containerRect.left;
            const caseY = caseRect.top + (caseRect.height * 0.2) - containerRect.top;
            d += ` C ${lastX} ${lastY + (caseY - lastY) / 2}, ${caseX} ${lastY + (caseY - lastY) / 2}, ${caseX} ${caseY}`;
        }
        svgPath.setAttribute('d', d);
    }

    window.addEventListener('load', connectDots);
    window.addEventListener('resize', connectDots);
    setTimeout(connectDots, 100);

    window.openGift = function(data) {
        const title = document.getElementById('gift-title');
        const msg = document.getElementById('gift-msg');
        const imgEl = document.getElementById('gift-img');
        const decoLine = document.querySelector('.deco-line');
        const quizContainer = document.getElementById('quiz-container');

        title.innerText = `Day ${data.id}`;
        msg.innerText = data.msg;
        msg.style.color = "";
        msg.style.fontWeight = "normal";
        quizContainer.innerHTML = '';

        const mistletoeDays = [17, 21, 23];
        if (mistletoeDays.includes(data.id)) {
            decoLine.innerText = "🌿 • 🌿 • 🌿";
            decoLine.style.color = "#2ecc71";
        } else {
            decoLine.innerText = "❄️ • ❄️ • ❄️";
            decoLine.style.color = "";
        }

        if (data.interaction && data.interaction.type === 'quiz') {

            const correctBtn = document.createElement('button');
            correctBtn.className = 'quiz-btn btn-correct';
            correctBtn.innerText = data.interaction.correct;
            correctBtn.onclick = () => {
                msg.innerText = data.interaction.successMsg;
                msg.style.color = "#2ecc71";
                msg.style.fontWeight = "bold";
                fireConfetti();
                quizContainer.innerHTML = '';
            };

            const wrongBtn = document.createElement('button');
            wrongBtn.className = 'quiz-btn btn-wrong';
            wrongBtn.innerText = data.interaction.wrong;

            wrongBtn.addEventListener('mouseover', () => {
                const moveX = (Math.random() - 0.5) * 500;
                const moveY = (Math.random() - 0.5) * 500;
                wrongBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            wrongBtn.onclick = () => {
                alert("WRONG FUCKING ANSWER THE BUTTON IS LITERALLY RUNNING AWAY FROM YOU DO YOU NOT GET THE HINT");
            }

            quizContainer.appendChild(correctBtn);
            quizContainer.appendChild(wrongBtn);
        }

        imgEl.src = data.img;
        imgEl.onerror = function() { this.src = `https://placehold.co/300x300/ff9ebd/ffffff?text=Image+${data.id}`; };

        if(giftModal) giftModal.classList.add('active');
    };

    window.closeGiftModal = () => {
        if(giftModal) giftModal.classList.remove('active');
        const quizContainer = document.getElementById('quiz-container');
        if(quizContainer) quizContainer.innerHTML = '';
    };

    const caseTrigger = document.getElementById('case-trigger');
    const envelopeTrigger = document.getElementById('envelope-trigger');
    const cs2Modal = document.getElementById('cs2-modal');
    const reel = document.getElementById('reel');
    const cs2Status = document.getElementById('cs2-status');
    const letterModal = document.getElementById('letter-modal');

    function getRandomItem() {
        const rand = Math.random();

        if (rand < 0.75) {
            const options = [
                { emoji: '🚿', name: 'shower picture' },
                { emoji: '🚿', name: 'shower picture' },
                { emoji: '🚿', name: 'shower picture' },
                { emoji: '🚿', name: 'shower picture' },
                { emoji: '🚿', name: 'shower picture' }
            ];
            const pick = options[Math.floor(Math.random() * options.length)];
            return { color: 'blue', emoji: pick.emoji, name: pick.name };
        }

        if (rand < 0.90) {
            const options = [
                { emoji: '🍆', name: 'cock picture' },
                { emoji: '🍆', name: 'cock picture' },
                { emoji: '🍆', name: 'cock picture' },
                { emoji: '🍆', name: 'cock picture' },
                { emoji: '🍆', name: 'cock picture' }
            ];
            const pick = options[Math.floor(Math.random() * options.length)];
            return { color: 'purple', emoji: pick.emoji, name: pick.name };
        }

        if (rand < 0.97) {
            const options = [
                { emoji: '🔊', name: 'cum audio' },
                { emoji: '🔊', name: 'cum audio' },
                { emoji: '🔊', name: 'cum audio' },
                { emoji: '🔊', name: 'cum audio' }
            ];
            const pick = options[Math.floor(Math.random() * options.length)];
            return { color: 'pink', emoji: pick.emoji, name: pick.name };
        }

        const options = [
            { emoji: '🎥', name: 'cum video' },
            { emoji: '🎥', name: 'cum video' },
            { emoji: '🎥', name: 'cum video' },
            { emoji: '🎥', name: 'cum video' }
        ];
        const pick = options[Math.floor(Math.random() * options.length)];
        return { color: 'red', emoji: pick.emoji, name: pick.name };
    }

    if (caseTrigger) caseTrigger.addEventListener('click', startCaseOpening);

    function startCaseOpening() {
        if (!cs2Modal) return;
        cs2Modal.classList.add('active');
        reel.innerHTML = '';
        const winnerIndex = 55; const totalItems = 70; const cardWidth = 186;

        for (let i = 0; i < totalItems; i++) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('reel-item');

            if (i === winnerIndex) {
                itemDiv.classList.add('gold');
                itemDiv.innerHTML = `
                    <img src="ohne.gif" alt="GOLD" onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                    <div style="display:none; font-size: 4rem;">🏆</div>
                `;
            } else {
                const drop = getRandomItem();
                itemDiv.classList.add(drop.color);
                itemDiv.innerHTML = `
                    <div style="font-size: 3.5rem; margin-bottom: 10px; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));">${drop.emoji}</div>
                    <span>${drop.name}</span>
                `;
            }
            reel.appendChild(itemDiv);
        }

        const variance = Math.floor(Math.random() * 60) - 30;
        const distance = (winnerIndex * cardWidth) + (cardWidth / 2) + variance;

        reel.style.transition = 'none'; reel.style.transform = 'translateX(0)'; reel.offsetHeight;

        setTimeout(() => {
            reel.style.transition = 'transform 8.5s cubic-bezier(0.12, 0.8, 0.05, 1)';
            reel.style.transform = `translateX(-${distance}px)`;
        }, 50);

        setTimeout(() => { if(cs2Status) cs2Status.innerText = "Slowing down..."; }, 5500);
        setTimeout(() => {
            if(cs2Status) { cs2Status.innerText = "GOLD GOLD GOLD!"; cs2Status.style.color = "#ffd700"; }
            fireConfetti();
        }, 8500);
        setTimeout(() => {
            cs2Modal.classList.remove('active');
            if(caseTrigger) caseTrigger.classList.add('hidden');
            if(envelopeTrigger) envelopeTrigger.classList.remove('hidden');
        }, 10500);
    }

    if(envelopeTrigger) {
        envelopeTrigger.addEventListener('click', () => {
            if(letterModal) letterModal.classList.add('active');
            fireConfetti();
        });
    }

    window.closeLetterModal = () => { if(letterModal) letterModal.classList.remove('active'); };

    function fireConfetti() {
        if(typeof confetti !== 'undefined') {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#ff4757', '#ffffff', '#ffd700'] });
        }
    }

    setInterval(() => {
        const snowContainer = document.getElementById('snow-container');
        if (snowContainer) {
            const snow = document.createElement('div'); snow.classList.add('snowflake'); snow.innerHTML = '❄';
            snow.style.left = Math.random() * 100 + 'vw';
            snow.style.opacity = Math.random() * 0.5 + 0.5;
            const size = Math.random() * 15 + 15;
            snow.style.fontSize = size + 'px';
            snow.style.animationDuration = (Math.random() * 3 + 2) + 's';
            snowContainer.appendChild(snow); setTimeout(() => snow.remove(), 5000);
        }
    }, 150);
});