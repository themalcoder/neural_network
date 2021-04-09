
let nn1;
let nn2;
let table;
let india_cases;
let india_cases_numerical = [];
let date_data = [];
let covid_train_data = [];

test_data = [
   {data: [0,0], target: [0]},
   {data: [1,0], target: [1]},
   {data: [1,1], target: [0]},
   {data: [0,1], target: [1]}
  ];


function preload() {
  table = loadTable('datasets/new_cases.csv', 'csv', 'header');
}

function setup() {
  india_cases = table.getColumn('India');
  let len = india_cases.length;
  for(let i = 0; i < len; i++) {
    date_data.push(i);
    if(india_cases[i] === "") {
      india_cases_numerical.push(0);
    } else {
      india_cases_numerical.push(parseInt(india_cases[i]));
    }
  }

  for(let i = 0; i < len; i++) {
    covid_train_data.push({data: [date_data[i]], target: [india_cases_numerical[i]]});
  }


  nn1 = new NeuralNetwork(2, 10, 1);
  nn2 = new NeuralNetwork(1, 100, 1);
  createCanvas(400, 400);
  
  for(let i = 0; i < 10000; i++) {
    let data = random(test_data);
    nn1.train(data.data, data.target);
  }

  // console.log(nn.feedForward([0,0]));

  // console.log(india_cases_numerical);
  // console.log(date_data);

  for(let i = 0; i < 10000; i++) {
    let data = random(covid_train_data);
    nn2.train(data.data, data.target);
  }

  console.log(covid_train_data.length);
  // console.log(test_data);
}



function draw() {
  background(0);
  // translate(0, height/2);
  for(let i = 0; i < 10000; i++) {
    let data = random(covid_train_data);
    nn2.train(data.data, data.target);
  }
  plotData(india_cases_numerical);
  plotUsingChartAPI();
}


function plotData(data) {
  stroke(255);
  let xpos, ypos;
  let minNum = min(data);
  let maxNum = max(data);
  for(let i = 0; i < data.length; i++) {
    let val = data[i];
    xpos = map(i, 0, data.length, 0, width);
    ypos = map(val, minNum, maxNum, height, 0);
    point(xpos, ypos);
  }
}

function plotUsingChartAPI() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}