'use strict'

{
class Panel{
  constructor(){
    const section =document.createElement('section');
    //このconstructorでしか使わないのでconst
    section.classList.add('panel');

    this.img = document.createElement('img');
    this.img.src='img/seven.png';

    this.stop = document.createElement('div')
    this.stop.textContent = 'STOP';
    this.stop.classList.add('stop')
    //thisを使うのは他に呼び出されたときに対応するため
  section.appendChild(this.img);
  section.appendChild(this.stop);

  const main = document.querySelector('main');
  main.appendChild(section);
  }
}

const panels=[
  new Panel(),
  new Panel(),
  new Panel(),
];
}