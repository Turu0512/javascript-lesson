'use strict'
{
const question = document.getElementById(`question`)
const choices = document.getElementById(`choices`)
const btn = document.getElementById(`btn`)
const result = document.getElementById(`result`)
const scoreLabel = document.querySelector(`#result > p`)

const quizSet = shuffle([//出題順をシャッフル
  {q:`What is A?`, c:[`A0`,`A1`,`A2`]},
  {q:`What is b?`, c:[`b0`,`b1`,`b2`]},
  {q:`What is c?`, c:[`c0`,`c1`,`c2`]},
  
]);
let currentNum = 0;
let isAnswered;
let score = 0;

function shuffle(arr) {//渡された配列の入れ替えをしている
  for(let i= arr.length -1;i > 0; i--) {//最後の要素i
    const j = Math.floor(Math.random()*(i+1));//配列のなかから選ばれた要素の場所
    [arr[j],arr[i]]=[arr[i],arr[j]];//最後の要素と選ばれた要素の入れ替え
    return arr;
  }
}



function checkAnswer(li) {
  if(isAnswered){
    return;
  }
isAnswered=true;

  if(li.textContent === quizSet[currentNum].c[0]){//0番目が正解になる
    li.classList.add(`correct`)
    score++;
  }else{
    li.classList.add(`wrong`)
  }

  btn.classList.remove(`disabled`);
}

function setQuiz(){
  isAnswered=false;//まだ回答していないという状態
  //checkAnswer(li)が実行されることで、すべてtrueに書き換わる。

  question.textContent = quizSet[currentNum].q;

while(choices.firstChild){//よく使われるテクニック
  choices.removeChild(choices.firstChild);
}//（）内の条件がNullかfalseになるまでループする
//中身がなくなるまで繰り返すということ

  const shuffledChoices =shuffle([...quizSet[currentNum].c]);
  //配列のコピーを渡す。shuffle(quizSet[currentNum].c)では参照を渡してしまうため、中身の配列まで変わってしまう。
  // console.log(quizSet[currentNum].c)
  
  shuffledChoices.forEach(choice =>{
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener(`click`,()=>{
checkAnswer(li);
    });
    choices.appendChild(li);
  });
  if(currentNum === quizSet.length-1){//最後の問題でNextの表示を変える
    btn.textContent = 'Show Score';
  }
}

setQuiz();

btn.addEventListener(`click`,()=>{
  if(btn.classList.contains(`disabled`)){
    return;
  }
  btn.classList.add(`disabled`);

  if(currentNum === quizSet.length - 1){
console.log(`Score:${score}/${quizSet.length}`);
scoreLabel.textContent = `Score:${score}/${quizSet.length}`;
result.classList.remove(`hidden`);
  }else{

    currentNum++;
    setQuiz();
  }
})
}