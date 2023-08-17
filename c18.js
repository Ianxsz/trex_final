var trex, trex_running, diedtrex, edges;
var groundImage;
var solo;
var soloinv;
var nuvens;
var obs1, obs2, obs3, obs4, obs5, obs6;
var pts = 0;
var estado = "inicial";
var Gameover;
var Restart;
var Gameoverimg;
var Restartimg;
var jumpsound;
var diesound;
var checksound;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  diedtrex = loadAnimation ("trex_collided.png");
  groundImage = loadImage("ground2.png");
  nuvens = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  Gameoverimg = loadImage("gameOver.png");
  Restartimg = loadImage("restart.png");
  jumpsound = loadSound("jump.mp3");
  diesound = loadSound("die.mp3");
  checksound = loadSound ("checkpoint.mp3");
}

  function setup(){
    createCanvas(windowWidth, windowHeight);
    //createCanvas(600, 200);

    grupoNuvens = createGroup();
    grupoObstaculos = createGroup();

  //criando o trex
  trex = createSprite(50,height-50,20,50);
  trex.addAnimation("died", diedtrex);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50;

  soloinv = createSprite (50, height-50, 50, 1);
  soloinv.visible = false;

  solo=createSprite(200, height-50, 400, 20);
  solo.addImage (groundImage);
  
  Gameover = createSprite(width*0.5, height*0.5);
  Gameover.addImage (Gameoverimg);
  Gameover.scale = 0.5;
  Gameover.visible = false;
  
  Restart = createSprite(width*0.5, height*0.75);
  Restart.addImage (Restartimg);
  Restart.scale = 0.5;
  Restart.visible = false;
  
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
  //registrando a posição y do trex
  //console.log(trex.y)

  
  if (estado == "inicial") {
    solo.velocityX = 0;
    trex.changeAnimation("running");

  }

  else if(estado == "jogando") {
    //pular quando tecla de espaço for pressionada
    solo.velocityX = -7;
    gcactos();

    aleatorio(); 
    pts = pts + Math.round(frameCount/60);

  }

  else {
    grupoNuvens.setLifetimeEach(-1);
    grupoNuvens.setVelocityXEach(0);
    grupoObstaculos.setLifetimeEach(-1);
    grupoObstaculos.setVelocityXEach(0);
    solo.velocityX = 0;
    Gameover.visible = true;
    Restart.visible = true;
    trex.changeAnimation("died");
  }

  if(grupoObstaculos.isTouching(trex)){
    estado = "END";
  }

  console.log (estado)
   
  if(keyDown("space") && estado == "inicial"){
    estado = "jogando";
  }

  //pular quando tecla de espaço for pressionada
  if((keyDown("space") || touches.lenght>0) && trex.y>height-50){
    estado = "jogando";
    trex.velocityY = -10;
    jumpsound.play();
    touches=[];
  }

  if(solo.x<0){
    solo.x = solo.width/2;
  }
  //console.log(solo.width);
  trex.velocityY = trex.velocityY + 0.5;

  if (mousePressedOver (Restart)){
      estado = "inicial";
      pts = 0;
      Gameover.visible = false;
      Restart.visible = false;
      grupoNuvens.destroyEach();
      grupoObstaculos.destroyEach();
      
      
  }

  

 
  
 //impedir que o trex caia
  trex.collide(soloinv);
  //text("("+mouseX+","+mouseY+")",  mouseX, mouseY);
  text(pts, 555, 15);
  drawSprites();
  
}

function aleatorio (){
  if (frameCount %50 === 0){
      var aparicao = createSprite(601, random (0, 100), 40, 10);
      aparicao.velocityX = -3;
      aparicao.addImage(nuvens);
      aparicao.scale = random(0.5, 0.8);
      aparicao.depth = trex.depth - 0.2;
      aparicao.lifetime =  Math.abs (width/aparicao.velocityX);
      //console.log([trex.depth, aparicao.depth]);
      grupoNuvens.add (aparicao);
    
  }
  
}

function gcactos() {
  if (frameCount %65 === 0){
    var variacao = createSprite(601, 170, 10, 10);
    variacao.velocityX = solo.velocityX;
    var num = Math.round(random(1, 6));
    variacao.lifetime = Math.abs (width/variacao.velocityX);
    switch(num){
      case 1:
        variacao.addImage (obs1);
        break;
        
      case 2:
        variacao.addImage (obs2);
        break;

      case 3:
        variacao.addImage (obs3);
        break;

      case 4:
        variacao.addImage (obs4);
        break;      
        
      case 5:
        variacao.addImage (obs5);
        break; 
        
      case 6:
        variacao.addImage (obs6);
        break;        
          
    }
    variacao.scale = 0.5  ;
    grupoObstaculos.add (variacao);
  }
}
