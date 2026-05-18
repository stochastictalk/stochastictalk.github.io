// Embedded variant of dvd.js: instance-mode p5 sketch with transparent
// background, rendered into #dvd-host fixed over the bio page.
// Exposes window.__dvdToggle() to start / stop.

(function () {
  var instance = null;

  function start() {
    if (instance) return;

    instance = new p5(function (s) {
      var c = 0;
      var c_w = window.innerWidth;
      var c_h = window.innerHeight;
      var img_h = 30;
      var img_w = Math.floor(2.21 * img_h);
      var x = c_w / 2;
      var y = c_h / 2;
      var M = 2;
      var v_x = Math.sqrt(M);
      var v_y = Math.sqrt(M);
      var imgs;
      var min_x = img_w / 2;
      var max_x = c_w - img_w / 2;
      var min_y = img_h / 2;
      var max_y = c_h - img_h / 2;
      var threshold = 50;
      var n_colors = 10;
      var dt = 0.1;
      var MAX_LENGTH = 50;
      var mouseHistory = new Array(MAX_LENGTH).fill(NaN);

      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      function toggleImageColor(img) {
        img.loadPixels();
        var color = [getRandomInt(255), getRandomInt(255), getRandomInt(255)];
        for (var i = 0; i < img.pixels.length; i += 4) {
          if (img.pixels[i + 3] > threshold) {
            img.pixels[i] = color[0];
            img.pixels[i + 1] = color[1];
            img.pixels[i + 2] = color[2];
          }
        }
        img.updatePixels();
      }

      s.preload = function () {
        imgs = [];
        for (var j = 0; j < n_colors; j++) {
          imgs.push(s.loadImage('/assets/dvd.png'));
        }
      };

      s.setup = function () {
        var canvas = s.createCanvas(c_w, c_h);
        canvas.parent('dvd-host');
        for (var k = 0; k < imgs.length; k++) {
          toggleImageColor(imgs[k]);
        }
        s.colorMode(s.HSB);
        s.strokeWeight(1);
        s.noFill();
      };

      s.draw = function () {
        s.clear();

        mouseHistory.shift();
        if (s.mouseIsPressed) {
          mouseHistory.push([s.mouseX, s.mouseY]);
          var a_x = (x - s.mouseX);
          var a_y = (y - s.mouseY);
          var m_a = Math.sqrt(a_x * a_x + a_y * a_y);
          if (m_a > 0) {
            v_x = v_x + dt * a_x / m_a;
            v_y = v_y + dt * a_y / m_a;
          }
        } else {
          mouseHistory.push(NaN);
        }

        x += v_x;
        y += v_y;

        if (x < min_x) { x += 2 * Math.abs(min_x - x); v_x = -v_x; c++; }
        if (x > max_x) { x -= 2 * Math.abs(x - max_x); v_x = -v_x; c++; }
        if (y < min_y) { y += 2 * Math.abs(min_y - y); v_y = -v_y; c++; }
        if (y > max_y) { y -= 2 * Math.abs(y - max_y); v_y = -v_y; c++; }

        for (var i = 0; i < mouseHistory.length - 1; i++) {
          if (Array.isArray(mouseHistory[i]) && Array.isArray(mouseHistory[i + 1])) {
            s.stroke((s.mouseX - s.mouseY), 90, 90, i / mouseHistory.length);
            s.line(mouseHistory[i][0], mouseHistory[i][1], mouseHistory[i + 1][0], mouseHistory[i + 1][1]);
          }
        }

        s.image(imgs[c % n_colors], x - img_w / 2, y - img_h / 2, img_w, img_h);
      };

      s.windowResized = function () {
        c_w = window.innerWidth;
        c_h = window.innerHeight;
        max_x = c_w - img_w / 2;
        max_y = c_h - img_h / 2;
        s.resizeCanvas(c_w, c_h);
      };
    });
  }

  function stop() {
    if (instance) {
      instance.remove();
      instance = null;
    }
  }

  window.__dvdToggle = function () {
    if (instance) stop();
    else start();
  };
})();
