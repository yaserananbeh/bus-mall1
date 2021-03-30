'use strict';
const allowedRoundsTimes=20;
let renderTimes=1;
const productNames=['bag.jpg','banana.jpg','sweep.png','bathroom.jpg','boots.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','usb.gif','pet-sweep.jpg','scissors.jpg','shark.jpg','tauntaun.jpg','unicorn.jpg','breakfast.jpg','water-can.jpg','wine-glass.jpg'];
/*----------------------------------------------*/
const productContainer=document.getElementById('productContainer');
const leftProductContainer=document.getElementById('leftProductImage');
const middleProductContainer=document.getElementById('middleProductImage');
const rightProductContainer=document.getElementById('rightProductImage');
const showResultBtn=document.getElementById('showResultBtn');
const ulContainer=document.getElementById('ulContainer');
/*-----------------------------------------*/
let firstRandomProduct;
let secondRandomProduct;
let thirdRandomProduct;
let previousIteration=[];
let votes=[];
let views=[];
/*-------------------------------------------*/
function ProductObject(name){
  this.name=name.slice(0, -4),
  this.path=`./img/${name}`,
  this.votes=0,
  this.show=0,
  ProductObject.all.push(this);
}
ProductObject.all=[];

for (let i = 0; i < productNames.length; i++) {
  new ProductObject(productNames[i]);
}
// console.log(ProductObject.all);

function generatThreeRandomProduct() {
  firstRandomProduct=getRandomNumber(0,productNames.length-1);
  secondRandomProduct=getRandomNumber(0,productNames.length-1);
  thirdRandomProduct=getRandomNumber(0,productNames.length-1);
  // return firstRandomProduct,secondRandomProduct,thirdRandomProduct;
}
function renderProducts() {

  generatThreeRandomProduct();
  // console.log(firstRandomProduct,secondRandomProduct,thirdRandomProduct);

  while(firstRandomProduct===secondRandomProduct||secondRandomProduct===thirdRandomProduct||firstRandomProduct===thirdRandomProduct){ //this while to be sure if the one iteration contain different Products
    generatThreeRandomProduct();
  }
  // console.log(firstRandomProduct,secondRandomProduct,thirdRandomProduct);
  while(previousIteration.includes(firstRandomProduct)||previousIteration.includes(secondRandomProduct)||previousIteration.includes(thirdRandomProduct)||firstRandomProduct===secondRandomProduct||secondRandomProduct===thirdRandomProduct||firstRandomProduct===thirdRandomProduct){
    generatThreeRandomProduct();
  }
  console.log(previousIteration);
  previousIteration=[];

  /* Start the dom actions to display the first image */
  previousIteration.push(firstRandomProduct);
  ProductObject.all[firstRandomProduct].show++;
  leftProductContainer.src= ProductObject.all[firstRandomProduct].path;
  leftProductContainer.title=ProductObject.all[firstRandomProduct].name;
  leftProductContainer.alt=ProductObject.all[firstRandomProduct].name;

  /* Start the dom actions to display the second Product */
  previousIteration.push(secondRandomProduct);
  ProductObject.all[secondRandomProduct].show++;
  middleProductContainer.src= ProductObject.all[secondRandomProduct].path;
  middleProductContainer.title=ProductObject.all[secondRandomProduct].name;
  middleProductContainer.alt=ProductObject.all[secondRandomProduct].name;

  /* Start the dom actions to display the third Product */
  previousIteration.push(thirdRandomProduct);
  ProductObject.all[thirdRandomProduct].show++;
  rightProductContainer.src= ProductObject.all[thirdRandomProduct].path;
  rightProductContainer.title=ProductObject.all[thirdRandomProduct].name;
  rightProductContainer.alt=ProductObject.all[thirdRandomProduct].name;
  console.log(previousIteration);
}
renderProducts();

productContainer.addEventListener('click',handleClick);
function handleClick(event) {
  // console.log(event.target);
  if (renderTimes<=allowedRoundsTimes) {

    if(event.target.id !== productContainer.id){
      // console.log(event.target.id);
      if (event.target.id===leftProductContainer.id) {
        // console.log('left');
        ProductObject.all[firstRandomProduct].votes++;
      }
      else if (event.target.id===middleProductContainer.id) {
        // console.log('middle');
        ProductObject.all[secondRandomProduct].votes++;
      }
      else{
        // console.log('right');
        ProductObject.all[secondRandomProduct].votes++;
      }
      console.log(ProductObject.all);
      renderProducts();
    }
    renderTimes++;
  }
  else{
    showResultBtn.style.display='block';
    productContainer.addEventListener('click',handleClick);
  }
}
showResultBtn.addEventListener('click',handleBtnClick);
function handleBtnClick(){
  console.log('hi');
  for (let i = 0; i < productNames.length; i++) {
    // console.log(`${Products.all[i].name} had ${Products.all[i].votes} Votes, And was seen ${Products.all[i].show} Times.`);
    let litextContent=`${ProductObject.all[i].name} had ${ProductObject.all[i].votes} Votes, And was seen ${ProductObject.all[i].show} Times.`;
    votes.push(ProductObject.all[i].votes);
    views.push(ProductObject.all[i].show);
    let li=document.createElement('li');
    ulContainer.appendChild(li);
    li.textContent=litextContent;


  }
  // console.log(`Total Rounds : ${clickTimes}` );
  let resultH1=document.createElement('h1');
  ulContainer.appendChild(resultH1);
  resultH1.textContent=`Total Rounds : ${allowedRoundsTimes}`;
  // button.removeEventListener('click',renderTheResults);
  let canvasTag=document.getElementById('myChart');
  canvasTag.style.display = 'block';
  showResultBtn.removeEventListener('click',handleBtnClick);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
