// Canvas Setup
var cnv = document.getElementById("myCanvas");
var ctx = cnv.getContext("2d");
cnv.width = 900;
cnv.height = 700;

let snowflakeArray = [];
for (let i = 0; i < 100; i++) {
  let randX = Math.random() * cnv.width;
  snowflakeArray.push({
    x: randX,
    y: Math.random() * cnv.height,
    radius: Math.random() * 3 + 1,
    dy: Math.random() * 4 + 2, // moves snowflakes down
    dx: Math.random() * 1, // moves snowflakes left/right (snowflake drift)
    initialX: randX,
  });
}

// let circle = {
//   x: 200,
//   y: 200,
//   dx: 3,
//   initialX: 200,
// };

let snowBuildupCounter = 1;

// Keyboard Events
document.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
  console.log(event.code);

  if (event.code == "ArrowRight") {
    for (let i = 0; i < 10; i++) {
      let randX = Math.random() * cnv.width;
      snowflakeArray.push({
        x: randX,
        y: Math.random() * cnv.height,
        radius: Math.random() * 3 + 1,
        dy: Math.random() * 4 + 2, // moves snowflakes down
        dx: Math.random() * 1, // moves snowflakes left/right (snowflake drift)
        initialX: randX,
      });
    }
  }

  if (event.code == "ArrowLeft") {
    for (let i = 0; i < 10; i++) {
      snowflakeArray.pop();
    }
  }

  if (event.code == "ArrowUp") {
    for (let i = 0; i < snowflakeArray.length; i++) {
      if (snowflakeArray[i].dy > 11) {
        break;
      }
      snowflakeArray[i].dy++;
    }
  }

  if (event.code == "ArrowDown") {
    for (let i = 0; i < snowflakeArray.length; i++) {
      if (snowflakeArray[i].dy < 2) {
        break;
      }
      snowflakeArray[i].dy--;
    }
  }
}

// Animation
requestAnimationFrame(draw);

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height); // black sky
  ctx.fillStyle = "white";
  ctx.fillRect(0, 600, cnv.width, 100); // white rectangle at bottom
  ctx.fillStyle = "gray";
  ctx.beginPath(); // triangle mountain
  ctx.moveTo(350, 700);
  ctx.lineTo(625, 200);
  ctx.lineTo(900, 700);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath(); // triangle mountain
  ctx.moveTo(710, 700);
  ctx.lineTo(835, 300);
  ctx.lineTo(960, 700);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "wheat";
  ctx.beginPath(); // moon
  ctx.arc(65, 65, 40, 4.5, 7, Math.PI);
  ctx.fill();

  ctx.fillStyle = "sienna";
  ctx.fillRect(100, 550, 150, 100); // house shape
  ctx.beginPath(); // triangle roof
  ctx.moveTo(80, 550);
  ctx.lineTo(175, 490);
  ctx.lineTo(270, 550);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "sandybrown";
  ctx.strokeRect(100, 550, 150, 100); // house shape outline
  ctx.beginPath(); // triangle roof outline
  ctx.moveTo(80, 550);
  ctx.lineTo(175, 490);
  ctx.lineTo(270, 550);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = "dimgray";
  ctx.fillRect(120, 590, 25, 58); // house door
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(141, 621, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillRect(183, 573, 44, 44); // window frame
  ctx.fillStyle = "yellow";
  ctx.fillRect(185, 575, 40, 40); // window light
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath(); // horizontal window line
  ctx.moveTo(185, 595);
  ctx.lineTo(225, 595);
  ctx.stroke();
  ctx.beginPath(); // vertical window line
  ctx.moveTo(205, 575);
  ctx.lineTo(205, 615);
  ctx.stroke();

  // Draw Snowflakes
  ctx.fillStyle = "white";
  for (let i = 0; i < snowflakeArray.length; i++) {
    ctx.beginPath();
    ctx.arc(
      snowflakeArray[i].x,
      snowflakeArray[i].y,
      snowflakeArray[i].radius,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  for (let i = 0; i < snowflakeArray.length; i++) {
    snowflakeArray[i].y += snowflakeArray[i].dy; // moves down

    snowflakeArray[i].x += snowflakeArray[i].dx; // moves left/right
    if (snowflakeArray[i].x > snowflakeArray[i].initialX + 15) {
      snowflakeArray[i].dx *= -1;
    }
    if (snowflakeArray.x < snowflakeArray.initialX - 15) {
      snowflakeArray[i].dx *= -1;
    }

    if (snowflakeArray[i].y > cnv.height) {
      // move to top of canvas
      snowflakeArray[i].y = -snowflakeArray[i].radius;

      // randomize x value and initalX
      let newRandX = Math.random() * cnv.width;
      snowflakeArray[i].x = newRandX;
      snowflakeArray[i].initialX = newRandX;
    }
  }

  // Snow Buildup Animation
  if (snowflakeArray.length > 0) {
    snowBuildupCounter += 0.01;
  }

  // console.log(snowBuildupCounter);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 700 - snowBuildupCounter, 900, 0 + snowBuildupCounter);

  if (snowBuildupCounter >= 265) {
    snowBuildupCounter = 265;
  }

  // // Circle demo
  // ctx.fillStyle = "red";
  // ctx.beginPath();
  // ctx.arc(circle.x, circle.y, 50, 0, 2 * Math.PI);
  // ctx.fill();

  // circle.x += circle.dx;
  // circle.y += 2;

  // if (circle.x > circle.initialX + 100) {
  //   circle.dx *= -1;
  // }

  // if (circle.x < circle.initialX - 100) {
  //   circle.dx *= -1;
  // }

  // Request new draw frame
  requestAnimationFrame(draw);
}
