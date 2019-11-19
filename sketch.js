let horizontal1, horizontal2, vertical1, vertical2;
let hStripe, vStripe;
let plaidMenue;
let h1cp, h2cp, v1cp, v2cp;
let rColor;
let h1C, h2C, v1C, v2C;
let widthRange;

function setup() {
  createCanvas(windowWidth, windowHeight);
//makes the extra menue to edit plaid
  plaidMenue = createGraphics(windowWidth, windowHeight/2);
  
//increases possible stripe width based on canvas size
  widthRange = (height+width)/1000;
  
//sliders change width of stripes
  horizontal1 = createSlider(1, 20*widthRange, 5);
  horizontal1.position((0*windowWidth/4)+windowWidth/40, 6*windowHeight/5);
  horizontal1.size(windowWidth/5);
  horizontal2 = createSlider(1, 20*widthRange, 5);
  horizontal2.position((1*windowWidth/4)+windowWidth/40, 6*windowHeight/5);
  horizontal2.size(windowWidth/5);
  vertical1 = createSlider(1, 20*widthRange, 5);
  vertical1.position((2*windowWidth/4)+windowWidth/40, 6*windowHeight/5);
  vertical1.size(windowWidth/5);
  vertical2 = createSlider(1, 20*widthRange, 5);
  vertical2.position((3*windowWidth/4)+(windowWidth/40), 6*windowHeight/5);
  vertical2.size(windowWidth/5);
  
//makes color pickers to change colors of stripes
  rColor = color(random(255), random(255), random(255));
  h1cp = createColorPicker(rColor);
  h1cp.position((0*windowWidth/4)+windowWidth/40, 4*windowHeight/3);
  h1cp.size(windowWidth/5, windowHeight/10);
  rColor = color(random(255), random(255), random(255));
  h2cp = createColorPicker(rColor);
  h2cp.position((1*windowWidth/4)+windowWidth/40, 4*windowHeight/3);
  h2cp.size(windowWidth/5, windowHeight/10);
  rColor = color(random(255), random(255), random(255));
  v1cp = createColorPicker(rColor);
  v1cp.position((2*windowWidth/4)+windowWidth/40, 4*windowHeight/3);
  v1cp.size(windowWidth/5, windowHeight/10);
  rColor = color(random(255), random(255), random(255));
  v2cp = createColorPicker(rColor);
  v2cp.position((3*windowWidth/4)+windowWidth/40, 4*windowHeight/3);
  v2cp.size(windowWidth/5, windowHeight/10);
  
//used for # of stripes
  hStripe = 0;
  vStripe = 0;
  
    
//text for plaid menue
  plaidMenue.background(220);
  plaidMenue.fill(0);
  plaidMenue.textSize(13*((width+height)/1000));
  plaidMenue.text('Main Horizontal Stripe', (0*windowWidth/4)+windowWidth/40, windowHeight/15);
  plaidMenue.text('Stripe Width', (0*windowWidth/4)+windowWidth/40, windowHeight/6);
  plaidMenue.text('Stripe Color', (0*windowWidth/4)+windowWidth/40, windowHeight/3.5);
  plaidMenue.text('Minor Horizontal Stripe', (1*windowWidth/4)+windowWidth/40, windowHeight/15);
  plaidMenue.text('Stripe Width', (1*windowWidth/4)+windowWidth/40, windowHeight/6);
  plaidMenue.text('Stripe Color', (1*windowWidth/4)+windowWidth/40, windowHeight/3.5);
  plaidMenue.text('Main Vertical Stripe', (2*windowWidth/4)+windowWidth/40, windowHeight/15);
  plaidMenue.text('Stripe Width', (2*windowWidth/4)+windowWidth/40, windowHeight/6);
  plaidMenue.text('Stripe Color', (2*windowWidth/4)+windowWidth/40, windowHeight/3.5);
  plaidMenue.text('Minor Vertical Stripe', (3*windowWidth/4)+windowWidth/40, windowHeight/15);
  plaidMenue.text('Stripe Width', (3*windowWidth/4)+windowWidth/40, windowHeight/6);
  plaidMenue.text('Stripe Color', (3*windowWidth/4)+windowWidth/40, windowHeight/3.5);
}

function draw() {
  
//shows menue at bottom
  plaidMenue.show();
  
//width values recieved from sliders
  const h1 = horizontal1.value();
  const h2 = horizontal2.value();
  const v1 = vertical1.value();
  const v2 = vertical2.value();
  
//number of horizontal and vertical stripes
  hStripe = height/(2*(h1+h2));
  vStripe = width/(2*(v1+v2));
  
//puts 0, 0 at center of screen
  translate(width/2, height/2);
//everything is drawn from center of rectangle, 3rd and 4th parameters are used like a radius
  rectMode(RADIUS);
  noStroke();
 
//takes color from color picker input
  h1C = h1cp.color();
  h2C = h2cp.color();
  v1C = v1cp.color();
  v2C = v2cp.color();
  
//fill uses r, g, and b values from its specific color picker, callRectMake draws rectangles starting from center of screen, using widths of both main and minor stripes and stripe count to determine where to draw rectangle/stripe
//h1
  fill(red(h1C), green(h1C), blue(h1C), 255/2);
  callRectMake(0, 0, hStripe, width/2, h1, 0, 0, -h1, -h2);
  callRectMake(0, +2*(h1+h2), hStripe, width/2, h1, 0, 0, h1, h2);
//h2
  fill(red(h2C), green(h2C), blue(h2C), 255/2);
  callRectMake(0, -(h1+h2), hStripe, width/2, h2, 0, 0, -h1, -h2);
  callRectMake(0, +(h1+h2), hStripe, width/2, h2, 0, 0, h1, h2);
//v1
  fill(red(v1C), green(v1C), blue(v1C), 255/2);
  callRectMake(0, 0, vStripe, v1, height/2, -v1, -v2, 0, 0);
  callRectMake(+2*(v1+v2), 0, vStripe, v1, height/2, v1, v2, 0, 0);
//v2
  fill(red(v2C), green(v2C), blue(v2C), 255/2);
  callRectMake(-(v1+v2), 0, vStripe, v2, height/2, -v1, -v2, 0, 0);
  callRectMake(+(v1+v2), 0, vStripe, v2, height/2, v1, v2, 0, 0);
}

//this function loops rectMake, uses push and pop so that each rectangle is drawn based off of the position of the last
  //tx and ty are changes in x and y translation
  //sNUM is the amount of stripes that needs to be drawn, loops the function
  //w and h are width and height, recieved from sliders
  //l1 and l2 decide whether stripes are drawn towards the left or right of the screen, used for vertical stripes
  //l3 and l4 decide whether stripes are drawn towards the top or bottom of the screen, used for horizontal stripes
function callRectMake(tx, ty, sNUM, w, h, l1, l2, l3, l4) {
  push();
  translate(0+tx, 0+ty);
  while(sNUM/4 > -1) {
    rectMake(0, 0, w, h, l1, l2, l3, l4);
    sNUM--;
  }
  pop();
}

//rectMake draws the rectangles, is looped by callRectMake
  //x and y should always be 0, center of the rectangle becuse it translates to that position based off of the position of the last rectangle
  //w and h and the width and height of the rectangle, one should be the value from its slider, the other sould be half of either the width or height of the canvas
  //l1 and l2 are used by vertical stripes, l3 and l4 are used by horizontal stripes, takes widths of main and minor stripes to figure out where to translate to for the next stripe
function rectMake(x, y, w, h, l1, l2, l3, l4) {
  rect(x, y, w, h);
  translate(x+2*(l1+l2), y+2*(l3+l4));
}