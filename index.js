import p5 from 'p5';
import './styles/style.scss';
import tree from './img/tree.png';

const containerElement = document.getElementById('p5_container'); 

const sketch = (p) => {
  let x = 100;
  let y = 100;
  let img;
  const treeWidth = 5;
  const treeHeight = 5;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  p.preload = () => {
    img = p.loadImage(tree);
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    const margin = { 
      left: windowWidth * .1, 
      right: windowWidth * .1,
      top: windowHeight * .1,
      bottom: windowHeight * .1
    }
  };

  p.draw = () => {
    p.background('lightgrey');
    p.image(img, 10, 10, treeWidth, treeHeight);
  };
};

new p5(sketch, containerElement);