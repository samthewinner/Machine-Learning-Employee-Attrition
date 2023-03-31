let a = [];
let n = 7;
let order = [];
let globalMinimum = Infinity
let optimalPath = []
function setup(){
  createCanvas(600,600);
  background(0)
  for(let i=0;i<n;i++){
    a[i] = createVector(random(width) , random(height))    
    order.push(i+1)
  }
}

function generatePermutations(){
  // background(0)  
  
  let largestI = -1;
  for(let i=0;i<n-1;i++){
    if(order[i] < order[i+1])
      largestI = i    
  }
  if(largestI == -1)
    {
      console.log('Finished')
      // noLoop();
      return;
    }
  let largestJ = -1
  for(let i =0;i<n;i++){
    if(order[largestI] < order[i]){
      largestJ = i
    }
  }
  if(largestJ == -1)
    return ;
  swap(order,largestI , largestJ)  
  swap(a,largestI  ,largestJ)
  let b = order.splice(largestI+1, a.length)
  b.reverse()
  order = order.concat(b)    
  let s = order.join(",")
  console.log(s)
  textSize(64)
  text(s, 20 , height-50)
  return ;
}


function createShape() {
  fill(255)
  for(let i in a){
    ellipse(a[i].x , a[i].y , 8 , 8)
  }

  strokeWeight(2);  
  noFill()
  stroke(255)
  beginShape()
  let sum = 0
  for(let i =0;i<n;i++){    
    vertex(a[i].x , a[i].y)

    if(i){
      sum+=dist(a[i].x , a[i].y , a[i-1].x , a[i-1].y)
    }
  }
  if(sum < globalMinimum){
    globalMinimum = sum;
    optimalPath = a
  }
  endShape();
}

function draw(){
  background(0)    
  generatePermutations()
  createShape()
  console.log(globalMinimum)
  noLoop()
}

const swap = (a,i,j) =>{
  [a[i] , a[j] ] = [a[j] , a[i]]
  
}
