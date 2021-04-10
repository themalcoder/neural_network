void setup() {
  size(28, 28);
  background(255);
  //saveAsBinary();
  //circle(width/2, height/2, 10);
  //save("test");
  
  loadIm();
}

void draw(){
  //saveAsBinary();
}

void loadIm() {
  PImage im = loadImage("../data/circle0001.png");
  
  image(im, 0, 0);
}

void saveAsBinary() {
  
  byte[] data = loadBytes("../npy-data/test.npy");
  println(data.length);
  //int start = data.length - 784;
  int start = 80;
  println(start);
  int total = (data.length - start) / 784;
  println(total);
  
  PImage img = createImage(28, 28, RGB);
  img.loadPixels();
  for(int i = 0; i < 784; i++) {
    int index = i + start;
    int val = data[index];
    img.pixels[i] = val;
  }
  img.updatePixels();
  image(img, 0, 0);
}

void generate() {
  for (int i = 0; i < 3; i++) {
    background(255);
    pushMatrix();
    strokeWeight(random(1, 3));
    float r = random(4, 16);
    float x = random(r, width - r);
    float y = random(r, height - r);
    //stroke(random(100), random(100), random(100));
    stroke(0);
    translate(x, y);
    if (i == 0) {
      circle(0, 0, r * 2);
      saveFrame("data/circle####.png");
    } 
    else if (i == 1) {
      rectMode(CENTER);
      rotate(random(-0.1, 0.1));
      square(0, 0, r * 2);
      saveFrame("data/square####.png");
    } else if (i == 2) {
      rotate(random(-0.1, 0.1));
      triangle(0, -r, r, r, -r, r);
      saveFrame("data/triangle####.png");
    }
    popMatrix();
  }

  if (frameCount == 1000) {
    exit();
  }
  strokeWeight(3);
  translate(width/2, height/2);
  circle(0, 0, 10);
  saveFrame("test.bin");
  exit();

}
