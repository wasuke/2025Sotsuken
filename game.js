const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 450;

const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});


window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Mobile Controls Setup
function setupMobileControls() {
    const btnMap = {
        'btnUp': 'ArrowUp',
        'btnDown': 'ArrowDown',
        'btnLeft': 'ArrowLeft',
        'btnRight': 'ArrowRight',
        'btnShoot': 'Space'
    };

    Object.keys(btnMap).forEach(id => {
        const btn = document.getElementById(id);
        const code = btnMap[id];

        if (btn) {
            const press = (e) => {
                e.preventDefault();
                keys[code] = true;
            };
            const release = (e) => {
                e.preventDefault();
                keys[code] = false;
            };

            btn.addEventListener('mousedown', press);
            btn.addEventListener('mouseup', release);
            btn.addEventListener('touchstart', press, { passive: false });
            btn.addEventListener('touchend', release, { passive: false });
            btn.addEventListener('mouseleave', release); // Handle drag out
        }
    });
}
setupMobileControls();


class Player {
    constructor() {
        this.width = 120; // Approx visual width (2 chars * 20px * 3 scale)
        this.height = 40; // Approx visual height (20px * 2 scale)
        this.x = 50;
        this.y = canvas.height / 2;
        this.speed = 4.5; // 5 * 0.9
        this.color = '#00ff00';
        this.bullets = [];
        this.cooldown = 0;
    }

    update() {
        // Boundary checks using new dimensions
        if (keys['ArrowUp'] && this.y > 0) this.y -= this.speed;
        if (keys['ArrowDown'] && this.y < canvas.height - this.height) this.y += this.speed;
        if (keys['ArrowLeft'] && this.x > 0) this.x -= this.speed;
        if (keys['ArrowRight'] && this.x < canvas.width - this.width) this.x += this.speed;

        if (keys['Space'] && this.cooldown <= 0) {
            this.shoot();
            this.cooldown = 22; // 20 / 0.9 approx
        }
        if (this.cooldown > 0) this.cooldown--;

        this.updateBullets();
    }

    shoot() {
        // Spawn bullet at the right edge of the player
        this.bullets.push(new Bullet(this.x + this.width, this.y + this.height / 2));
    }

    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update();
            if (this.bullets[i].markedForDeletion) {
                this.bullets.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;

        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // Scale: Stretched text
        // "教員" is 2 chars. To keep it stretched but functional, use 3x width, 2x height.
        ctx.scale(3, 2);
        ctx.fillText("教員", 0, 0);

        ctx.restore();

        this.bullets.forEach(bullet => bullet.draw(ctx));
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60; // "添削" 2 chars * 20px * 1.5 scale approx
        this.height = 30;
        this.speed = 9; // 10 * 0.9
        this.markedForDeletion = false;
    }

    update() {
        this.x += this.speed;
        if (this.x > canvas.width) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y - 15); // Adjust Y to center text
        ctx.fillStyle = '#ffff00';
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        ctx.scale(1.5, 1.5);
        ctx.fillText("添削", 0, 0);

        ctx.restore();
    }
}

class Enemy {
    constructor() {
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - 40);
        this.width = 120; // Match player size for "卒論"
        this.height = 40;
        this.speed = Math.random() * 1.8 + 1.8; // (2+2) * 0.9
        this.markedForDeletion = false;
    }

    update() {
        this.x -= this.speed;
        if (this.x < -150) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'red';

        ctx.font = "20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // Scale: 3x width, 2x height
        ctx.scale(3, 2);
        ctx.fillText("卒論", 0, 0);

        ctx.restore();
    }
}

class Boss {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2 - 100;
        this.width = 300; // "優秀\n論文" large scale
        this.height = 200;
        this.hp = 10;
        this.speed = 0.9; // 1 * 0.9
        this.markedForDeletion = false;
        this.flash = 0;
    }

    update() {
        if (this.x > canvas.width - 350) {
            this.x -= this.speed;
        } else {
            // Hover effect
            this.y += Math.sin(Date.now() / 500) * 1;
        }

        if (this.flash > 0) this.flash--;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.flash > 0 ? 'white' : 'red';

        ctx.font = "bold 20px Arial";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        // Scale: 5x width, 5x height for massive presence
        ctx.scale(5, 5);
        ctx.fillText("優秀", 0, 0);
        ctx.fillText("論文", 0, 20); // Second line

        ctx.restore();
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.color = `hsl(${Math.random() * 60 + 10}, 100%, 50%)`; // Fire colors
        this.life = 100;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
class ScorePopup {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.life = 60;
        this.color = 'yellow';
    }
    update() {
        this.y -= 1;
        this.life--;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / 60;
        ctx.fillStyle = this.color;
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

let player = new Player();
let enemies = [];
let particles = [];
let popups = []; // Added popups array
let enemyTimer = 0;
let score = 0;
let gameOver = false;
let gameClear = false;

// Boss State
let bossInstance = null;
let bossWarning = false;
let bossWarningTimer = 0;
let bossSpawned = false;

function animate() {
    if (gameOver && !gameClear) {
        drawGameOver();
        // Ensure score is still drawn correctly on Game Over
        drawScore();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // BG clear

    // Player
    if (!gameClear || particles.length > 0) { // Keep updating player unless fully cleared
        player.update();
        player.draw(ctx);
    }

    // Boss Logic Trigger
    if (score >= 200 && !bossSpawned && !bossWarning) {
        bossWarning = true;
        bossWarningTimer = 133; // 120 / 0.9
    }

    // Normal Enemy Spawning (Stop if boss warning or boss spawned)
    if (score < 200 && !bossWarning && !bossSpawned) {
        if (enemyTimer > 66) { // 60 / 0.9
            enemies.push(new Enemy());
            enemyTimer = 0;
        } else {
            enemyTimer++;
        }
    }

    // Boss Warning Display
    if (bossWarning) {
        ctx.fillStyle = 'yellow';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("優秀論文出現", canvas.width / 2, canvas.height / 2);

        bossWarningTimer--;
        if (bossWarningTimer <= 0) {
            bossWarning = false;
            bossSpawned = true;
            bossInstance = new Boss();
        }
    }

    // Boss Handling
    if (bossInstance) {
        bossInstance.update();
        bossInstance.draw(ctx);

        // Collision: Player Bullets vs Boss
        player.bullets.forEach((bullet) => {
            if (
                !bossInstance.markedForDeletion &&
                bullet.x < bossInstance.x + bossInstance.width &&
                bullet.x + bullet.width > bossInstance.x &&
                bullet.y < bossInstance.y + bossInstance.height &&
                bullet.y + bullet.height > bossInstance.y
            ) {
                bullet.markedForDeletion = true;
                bossInstance.hp--;
                bossInstance.flash = 5;
                if (bossInstance.hp <= 0) {
                    bossInstance.markedForDeletion = true;
                    // Trigger Explosion
                    for (let i = 0; i < 100; i++) {
                        particles.push(new Particle(bossInstance.x + bossInstance.width / 2, bossInstance.y + bossInstance.height / 2));
                    }
                    gameClear = true;
                    score += 100;
                    popups.push(new ScorePopup(bossInstance.x + bossInstance.width / 2, bossInstance.y, "+100"));
                    // Reset enemies
                    enemies = [];
                }
            }
        });

        // Clean up boss if dead
        if (bossInstance.markedForDeletion && bossInstance.hp <= 0) {
            bossInstance = null; // Removed from screen, but particles play
        }
    }

    // Normal Enemies
    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.draw(ctx);
        if (enemy.markedForDeletion) enemies.splice(index, 1);
    });

    // Particles (Explosion)
    particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(index, 1);
    });

    // Score Popups
    popups.forEach((popup, index) => {
        popup.update();
        popup.draw(ctx);
        if (popup.life <= 0) popups.splice(index, 1);
    });

    // Collision Detection (Normal Enemies)
    player.bullets.forEach((bullet) => {
        enemies.forEach((enemy) => {
            if (
                bullet.x < enemy.x + enemy.width - 20 &&
                bullet.x + bullet.width > enemy.x + 20 &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemy.markedForDeletion = true;
                bullet.markedForDeletion = true;
                score += 10;
                popups.push(new ScorePopup(enemy.x + enemy.width / 2, enemy.y, "+10"));
            }
        });
    });

    // Player Hit Logic
    if (!gameClear) {
        enemies.forEach(enemy => {
            if (
                player.x < enemy.x + enemy.width - 20 &&
                player.x + player.width - 20 > enemy.x + 20 &&
                player.y < enemy.y + enemy.height - 10 &&
                player.y + player.height - 10 > enemy.y + 10
            ) {
                gameOver = true;
            }
        });

        if (bossInstance) {
            // Simple boss collision (box)
            if (
                player.x < bossInstance.x + bossInstance.width - 40 &&
                player.x + player.width - 40 > bossInstance.x + 40 &&
                player.y < bossInstance.y + bossInstance.height - 20 &&
                player.y + player.height - 20 > bossInstance.y + 20
            ) {
                gameOver = true;
            }
        }
    }

    drawScore();

    if (gameClear && bossInstance === null && particles.length === 0 && popups.length === 0) {
        drawGameClear();
        // Ensure score is still drawn correctly on Game Clear
        drawScore();
        return; // Stop loop after clear screen
    }

    requestAnimationFrame(animate);
}

function drawScore() {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'left'; // Enforce left alignment
    ctx.fillText('Score: ' + score, 30, 30);
    ctx.restore();
}

function drawGameOver() {
    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Refresh to restart', canvas.width / 2, canvas.height / 2 + 40);
}

function drawGameClear() {
    ctx.fillStyle = 'yellow';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('優秀論文 採択！', canvas.width / 2, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText('CONGRATULATIONS', canvas.width / 2, canvas.height / 2 + 50);
}

animate();
