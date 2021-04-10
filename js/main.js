var resultBtn = document.querySelector('input[name=result]');
var restartBtn;
var statusList = ['過輕', '理想', '過重', '輕度肥胖', '中度肥胖', '重度肥胖']
var TypeList = ['thin', 'good', 'fat', 'over-fat-2', 'over-fat-2', 'over-fat-2']
var localdata;

isInit = init();

function init(){
    localdata = JSON.parse(localStorage.getItem('data')) || new Array();
    for(idx=0; idx<localdata.length; idx++){
        var data = localdata[idx];
        addResult(data,false);
    }
    resultBtn.addEventListener('click', result);
    return true;
}

function result(e){
    if(e.target.name == 'result'){
        resultBtn.name = 'finish';
        var inputHeight = document.querySelector('input[name=height]').value;
        var inputWeight = document.querySelector('input[name=weight]').value;
        if(inputHeight == '' || inputWeight == ''){
            alert('請輸入正確的數值');
            return;
        }
        var data = calculateBMI(inputHeight, inputWeight);
        addResult(data);
    }

    resultBtn.className = 'result ' + TypeList[data.STATUS];
    resultBtn.value = data.BMI_RESULT;
    var typeText = document.createElement('h2');
    var img = document.createElement('img');
    var restart = document.createElement('div');
    var resultdiv = document.querySelector('.result-btn');


    typeText.className = 'type-text';
    restart.className = 'restart ' + TypeList[data.STATUS];
    typeText.textContent = data.TYPE;
    img.src = 'asserts/icons_loop.png';
    
    restart.appendChild(img);
    resultdiv.innerHTML += restart.outerHTML + typeText.outerHTML;

    restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', refresh);
}


function calculateBMI(Height, Weight){
    var BMI = (parseFloat(Weight) / Math.pow(parseFloat(Height)*1e-2, 2)).toFixed(2);   console.log('BMI is : ' + BMI);
    var status = -1;
    if(BMI < 18.5){
        status = 0
    }else if(BMI >= 18.5 && BMI < 24){
        status = 1
    }else if(BMI >= 24 && BMI < 27){ 
        status = 2
    }else if(BMI >= 27 && BMI < 30){
        status = 3
    }else if(BMI >= 30 && BMI < 35){
        status = 4
    }else if(BMI >= 35){
        status = 5
    }
    console.log(statusList[status]);

    

    var today = new Date().toISOString().slice(0, 10);  console.log(today);
    var data = {
        DATE: today,
        BMI_RESULT: BMI,
        HEIGHT: Height,
        WEIGHT: Weight,
        TYPE: statusList[status],
        STATUS: status,
    }
    console.log(data)

    return data;
}

function addResult(data, save2local=true){
    var result_list = document.querySelector('.result-list')
    var newlist = document.createElement('li');
    var type = document.createElement('h3');
    var bItem = document.createElement('div');
    var bh3 = document.createElement('h3');
    var bh4 = document.createElement('h4');

    var wItem = document.createElement('div');
    var wh3 = document.createElement('h3');
    var wh4 = document.createElement('h4');

    var hItem = document.createElement('div');
    var hh3 = document.createElement('h3');
    var hh4 = document.createElement('h4');

    var datp = document.createElement('p');

    type.textContent = data.TYPE;

    bh3.textContent  = data.BMI_RESULT;
    bh4.textContent  = 'BMI';
    bItem.innerHTML  = bh4.outerHTML + bh3.outerHTML;

    wh3.textContent  = data.WEIGHT + 'kg';
    wh4.textContent  = 'weight';
    wItem.innerHTML  = wh4.outerHTML + wh3.outerHTML;

    hh3.textContent  = data.HEIGHT + 'cm';
    hh4.textContent  = 'height';
    hItem.innerHTML  = hh4.outerHTML + hh3.outerHTML;

    datp.textContent = data.DATE;

    newlist.classList.add('bmi-card', TypeList[data.STATUS])
    wItem.setAttribute('class', 'item');
    hItem.setAttribute('class', 'item');
    bItem.setAttribute('class', 'item');

    newlist.innerHTML = type.outerHTML + bItem.outerHTML + wItem.outerHTML + hItem.outerHTML + datp.outerHTML;
    result_list.appendChild(newlist);

    // Save data to localstroage
    if(save2local){
        localdata.push(data);
        localStorage.setItem('data', JSON.stringify(localdata));
        console.log(`'${localdata.length} Add data to localstorage...'`);
    }
}

function refresh(e){
    var typeText = document.querySelector('h2');
    resultBtn = document.querySelector('input[name=finish]');
    resultBtn.addEventListener('click', result);
    typeText.remove();
    restartBtn.remove();
    resultBtn.name = 'result';
    resultBtn.className = 'normal'
    resultBtn.value = '看結果'
    
}