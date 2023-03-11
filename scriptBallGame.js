const firstSong = new Audio('01. ClownGame_ Song of Storms.mp3');
const secondSong = new Audio('02. ClownGame_Lost Woods.mp3');
const thirdSong = new Audio('03. ClownGame_ Gerudo Valley.mp3');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth; // max. width for the canvas
canvas.height = innerHeight; // max. heigt for the canvas

const x = canvas.width / 2;
const y = canvas.height / 2;

let currentScore = document.getElementById('currentScore');
let highScore = document.getElementById('highScore');

const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


const projectileArr = [];

const evilBallonsArr = [];

const explosionsArr = [];

let animationGame;
let currentScoreEl = 0;
let highScoreEl = 0;

const slowingDown = 0.99;

let speed = 0;
let evilBallonSpawningIntensity;



const speedUp = () => {
    if (currentScoreEl >= 50 && currentScoreEl < 12500) {
        firstSong.play();
    }
    if (currentScoreEl >= 1500 && currentScoreEl < 5000) {
        speed = 1.5;
    }
    if (currentScoreEl >= 5000 && currentScoreEl < 10000) {
        speed = 2.5;
    }
    if (currentScoreEl >= 7500 && currentScoreEl < 12500) {
        speed = 3.5;
    }
    if (currentScoreEl >= 12500 && currentScoreEl < 20000) {
        firstSong.pause();
        firstSong.currentTime = 0;
        secondSong.play();
        speed = 4.5;
    }
    if (currentScoreEl >= 17500) {
        secondSong.pause();
        secondSong.currentTime = 0;
        thirdSong.play();
        speed = 5.5;
    }
    if (currentScoreEl >= 22500) {
        speed = 6;
    }
}



let playerHit = false;
let explosions = [];




// // game over
// const gameOver = () => {
//     // select score and high score el
//     const currentScoreVar = document.querySelector('.game-over-score .current');
//     const highScoreVar = document.querySelector('.game-over-score .high');

//     // calculate the high score
//     highScore = Math.max(score, highScore);
//     localStorage.setItem('high-score', highScore);

//     // update the score and high score el
//     currentScoreVar.innerHTML = `Current-Score ${score}`;
//     highScoreVar.innerHTML = `High-Score ${highScore}`;



class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}




//  character design


let player = new Player(x, y, 30, 'beige');


//  hair


let hair1 = new Player(x + 10, y - 33, 5, 'red');

let hair2 = new Player(x + 15, y - 31, 5, 'red');

let hair3 = new Player(x + 20, y - 27, 5, 'red');

let hair4 = new Player(x + 25, y - 22, 5, 'red');

let hair6 = new Player(x + 30, y - 15, 5, 'red');

let hair7 = new Player(x - 10, y - 33, 5, 'red');

let hair8 = new Player(x - 15, y - 31, 5, 'red');

let hair9 = new Player(x - 20, y - 27, 5, 'red');

let hair10 = new Player(x - 25, y - 22, 5, 'red');

let hair11 = new Player(x - 30, y - 15, 5, 'red');

let hair12 = new Player(x - 10, y - 30, 5, 'red');

let hair13 = new Player(x, y - 35, 8, 'red');


// eyebrows


let hair5_1 = new Player(x + 10, y - 20, 7, 'orange');

let hair5_2 = new Player(x - 10, y - 20, 7, 'orange');


// left eye


let eye1 = new Player(x + 10, y - 10, 5, 'white');

let eyeLid1_1 = new Player(x + 10, y - 4, 5, 'beige');

let eyeLid1_2 = new Player(x + 10, y - 16, 6, 'beige');

let innerEye1 = new Player(x + 10, y - 10, 2, 'black');


// right eye


let eye2 = new Player(x - 10, y - 10, 5, 'white');

let eyeLid2_1 = new Player(x - 10, y - 4, 5, 'beige');

let eyeLid2_2 = new Player(x - 10, y - 16, 6, 'beige');

let innerEye2 = new Player(x - 10, y - 10, 2, 'black');


// mouth, beard and nose



let lips = new Player(x, y + 12, 7, 'red');

let mouth = new Player(x, y + 12, 6, 'white');

let beardLeft1 = new Player(x - 5, y + 10, 5, 'brown');

let beardLeft2 = new Player(x - 10, y + 12, 5, 'brown');

let beardMiddle = new Player(x, y + 8, 5, 'brown');

let beardRight1 = new Player(x + 5, y + 10, 5, 'brown');

let beardRight2 = new Player(x + 10, y + 12, 5, 'brown');

let nose = new Player(x, y, 6, 'red');


// bow tie


let leftBowTie1 = new Player(x - 5, y + 35, 5, 'blue');

let leftBowTie2 = new Player(x - 10, y + 35, 5, 'blue');

let leftBowTie3 = new Player(x - 10, y + 40, 5, 'blue');

let leftBowTie4 = new Player(x - 7, y + 37, 5, 'blue');

let leftBowTie5 = new Player(x - 7, y + 32, 5, 'blue');

let leftBowTie6 = new Player(x - 10, y + 30, 5, 'blue');


let rightBowTie1 = new Player(x + 5, y + 35, 5, 'blue');

let rightBowTie2 = new Player(x + 10, y + 35, 5, 'blue');

let rightBowTie3 = new Player(x + 10, y + 40, 5, 'blue');

let rightBowTie4 = new Player(x + 7, y + 37, 5, 'blue');

let rightBowTie5 = new Player(x + 7, y + 32, 5, 'blue');

let rightBowTie6 = new Player(x + 10, y + 30, 5, 'blue');

let middleBowTie = new Player(x, y + 35, 6, 'darkblue');



// create projectiles class


class Projectile {
    constructor(x, y, radius, color, velocity) {

        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    updateProjectile() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}


addEventListener('click', (event) => {
    const projectileAngle = Math.atan2(event.clientY - (y + 10), event.clientX - x)
    const projectileVelocity = {
        x: Math.cos(projectileAngle) * (speed / 2 + 7),   // Speed for the Projectiles
        y: Math.sin(projectileAngle) * (speed / 2 + 7)    // Speed for the Projectiles
    }
    projectileArr.push(new Projectile(x, y + 18, 6, getRandomColor(), projectileVelocity))
})


// create evilBallons class


class EvilBallon {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.hit = false
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    updateEvilBallon() {
        this.x += this.velocity.x
        this.y += this.velocity.y

        // reducing speed to half if hit
        if (this.hit) {
            this.velocity.x *= 0.5
            this.velocity.y *= 0.5
            setTimeout(() => {
                this.velocity.x *= 2
                this.velocity.y *= 2
                this.hit = false
            }, 250)
        }

        this.draw()
    }
}


//  spawn evilBallons


const spawnEvilBallons = () => {
    setInterval(() => {
        const radius = Math.random() * (40 - 8) + 8

        let x
        let y
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        }
        else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const color = getRandomColor()
        const evilBallonAngle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        let evilBallonVelocity = {
            x: Math.cos(evilBallonAngle) * (1 + speed / 1.25),    // ballon speed
            y: Math.sin(evilBallonAngle) * (1 + speed / 1.25)    // ballon speed 
        }

        evilBallonsArr.push(new EvilBallon(x, y, radius, color, evilBallonVelocity))
    }, evilBallonSpawningIntensity = 1250 - (speed * 100))
}


// explosion by hitting evil ballons


class Explosion {
    constructor(x, y, radius, color, velocity) {

        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.fadeAway = 1
    }
    draw() {
        ctx.save()
        ctx.globalFadeAway = this.fadeAway
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    updateExplosion() {
        this.draw()
        this.velocity.x *= slowingDown
        this.velocity.y *= slowingDown
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.fadeAway -= 0.0045
    }
}


//  animate all objects


const animateObjects = () => {

    animationGame = requestAnimationFrame(animateObjects)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    player.draw()
    hair1.draw()
    hair2.draw()
    hair3.draw()
    hair4.draw()
    hair6.draw()
    hair7.draw()
    hair8.draw()
    hair9.draw()
    hair10.draw()
    hair11.draw()
    hair12.draw()
    hair13.draw()
    hair5_1.draw()
    hair5_2.draw()
    eye1.draw()
    eyeLid1_1.draw()
    eyeLid1_2.draw()
    innerEye1.draw()
    eye2.draw()
    eyeLid2_1.draw()
    eyeLid2_2.draw()
    innerEye2.draw()
    lips.draw()
    mouth.draw()
    beardLeft1.draw()
    beardLeft2.draw()
    beardMiddle.draw()
    beardRight1.draw()
    beardRight2.draw()
    nose.draw()
    leftBowTie1.draw()
    leftBowTie2.draw()
    leftBowTie3.draw()
    leftBowTie4.draw()
    leftBowTie5.draw()
    leftBowTie6.draw()
    rightBowTie1.draw()
    rightBowTie2.draw()
    rightBowTie3.draw()
    rightBowTie4.draw()
    rightBowTie5.draw()
    rightBowTie6.draw()
    middleBowTie.draw()

    explosionsArr.forEach((explosion, index) => {
        if (explosion.fadeAway <= 0) {
            explosionsArr.splice(index, 1)
        } else {
            explosion.updateExplosion()
        }
    })


    projectileArr.forEach((projectile, index) => {
        projectile.updateProjectile();

        // removing projectiles when passing screen size
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
        ) {
            setTimeout(() => {
                projectileArr.splice(index, 1)
            }, 0);
        }
    })


    evilBallonsArr.forEach((evilBallon, evilBallonIndex) => {
        evilBallon.updateEvilBallon()
        const distance = Math.hypot(player.x - evilBallon.x, player.y - evilBallon.y)

        if (distance - evilBallon.radius - player.radius < 1) {

            explosions = [
                { x: player.x, y: player.y },
                { x: mouth.x, y: mouth.y },
                { x: lips.x, y: lips.y },
                { x: nose.x, y: nose.y },
                { x: nose.x, y: nose.y },
                { x: nose.x, y: nose.y },
                { x: nose.x, y: nose.y },
                { x: nose.x, y: nose.y },
                { x: nose.x, y: nose.y },
                { x: eye1.x, y: eye1.y },
                { x: eye2.x, y: eye2.y },
                { x: middleBowTie.x, y: middleBowTie.y },
                { x: middleBowTie.x, y: middleBowTie.y },
                { x: middleBowTie.x, y: middleBowTie.y }
            ].map((explosion) => {
                return new Explosion(
                    explosion.x,
                    explosion.y,
                    Math.random() * 2,
                    getRandomColor(),
                    {
                        x: (Math.random() - 0.5) * (Math.random() * 20),
                        y: (Math.random() - 0.5) * (Math.random() * 20)
                    }
                )
            })

            // add the explosions to the explosions array
            explosionsArr.push(...explosions)



            setTimeout(() => {
                cancelAnimationFrame(animationGame)
            }, 450);
        }


        projectileArr.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - evilBallon.x, projectile.y - evilBallon.y)

            // projectiles are hitting the evilBallons
            if (distance - evilBallon.radius - projectile.radius < 1) {

                // set hit property to true
                evilBallon.hit = true

                for (let i = 0; i < evilBallon.radius * 1.5; i++) {
                    explosionsArr.push(new Explosion(projectile.x, projectile.y, Math.random() * 2, evilBallon.color, { x: (Math.random() - 0.4) * (Math.random() * 5), y: (Math.random() - 0.5) * (Math.random() * 3) }));

                }

                if (evilBallon.radius - 7.5 >= 12.5) {
                    gsap.to(evilBallon, {
                        radius: evilBallon.radius - 7.5
                    })

                    // increasing score by every hit evilBallon
                    currentScoreEl += 50
                    currentScore.innerHTML = currentScoreEl
                    highScore.innerHTML = highScoreEl + currentScoreEl


                    setTimeout(() => {
                        projectileArr.splice(projectileIndex, 1)

                    }, 0);
                } else {

                    // increasing score by every hit evilBallon
                    currentScoreEl += 100
                    currentScore.innerHTML = currentScoreEl
                    highScore.innerHTML = highScoreEl + currentScoreEl

                    speedUp();

                    setTimeout(() => {
                        evilBallonsArr.splice(evilBallonIndex, 1)
                        projectileArr.splice(projectileIndex, 1)
                    }, 0);
                }
            }
        })
    })
}

spawnEvilBallons();
animateObjects();