export default function sketch(p) {
  let waves = [];
  let sparkles = [];

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for (let i = 0; i < 10; i++) {
      waves.push({
        y: p.height * 0.1 * i,
        speed: p.random(0.01, 0.03),
        offset: p.random(100),
      });
    }
  };

  p.draw = function () {
    p.background(0, 105, 148);
    // Draw waves
    for (let wave of waves) {
      p.noFill();
      p.stroke(224, 247, 250, 150);
      p.strokeWeight(3);
      p.beginShape();
      for (let x = 0; x < p.width; x += 10) {
        let y = wave.y + p.sin(x * 0.01 + p.frameCount * wave.speed + wave.offset) * 50;
        p.vertex(x, y);
      }
      p.endShape();
    }
    // Draw sparkles
    if (p.random() < 0.2) {
      sparkles.push({ x: p.random(p.width), y: p.random(p.height), size: p.random(2, 8), alpha: 255 });
    }
    for (let sparkle of sparkles) {
      p.fill(255, sparkle.alpha);
      p.noStroke();
      p.ellipse(sparkle.x, sparkle.y, sparkle.size);
      sparkle.alpha -= 5;
    }
    sparkles = sparkles.filter((s) => s.alpha > 0);
  };

  p.mousePressed = function () {
    sparkles.push({ x: p.mouseX, y: p.mouseY, size: p.random(5, 10), alpha: 255 });
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}