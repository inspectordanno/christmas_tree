import p5 from 'p5';
import './styles/style.scss';
import tree from './img/tree.png';

const containerElement = document.getElementById('p5_container'); 

const sketch = (p) => {
    let img;
    const treeWidth = 10;
    const treeHeight = 20;
    const xGap = 2.5;
    const yGap = 2.5;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const numberOfTrees = 3400;
    const margin = { 
      left: windowWidth * .1, 
      right: windowWidth * .1,
      top: windowHeight * .05,
      bottom: windowHeight * .05
    };

    class Tree {
      constructor(index, finalX, finalY) {
        this.x = 0;
        this.y = 0;
        this.yVel = 5;
        this.index = index;
        this.finalX = finalX;
        this.finalY = finalY;
      }

      move() {

      }

      generate() {
        p.image(img, this.finalX, this.finalY, treeWidth, treeHeight);
      }
    }

    let treesInCurrentRow = 0;
    let rowNumber = 0;
    let xStart = margin.left; 
    let xEnd = margin.right;
    let yPos = windowHeight - margin.bottom;

    //width of the row is equal to the window width minus the margin
    //there is also a margin on the left side which increases depending on the row number
    let rowWidth = windowWidth - xStart - xEnd; 
    console.log(rowWidth)

    const trees = []; //array holding tree objects

    for (let i = 0; i < numberOfTrees; i++) {
      trees.push(new Tree(i, xStart, yPos)); //push tree to trees array
    
        //each tree in the current row has a width and a gap between them
        //if the total of their width and gap is less than or equal to the rowWidth, proceed in the current row
        if (treesInCurrentRow * (treeWidth + xGap) <= rowWidth) {
          treesInCurrentRow += 1; //add tree to current row
          xStart = xStart + treeWidth + xGap; //adjust x position - add treeWidth and xGap
        } else if (treesInCurrentRow * (xGap + treeWidth) > rowWidth) {
          console.log(treesInCurrentRow);
          treesInCurrentRow = 0;
          rowNumber += 1;
          xStart = margin.left + (rowNumber * (xGap + treeWidth)); //reset x position to the left margin to the rowNumber times the xGap
          xEnd = margin.right + (rowNumber * (xGap + treeWidth));
          yPos = yPos - (treeHeight + yGap); //move the y position up by the height and gap
          rowWidth = windowWidth - xStart - xEnd;
    };

    p.preload = () => {
      img = p.loadImage(tree);
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background('lightgrey');
      
      trees.forEach((tree) => {
        tree.generate();
      })
    };
  };
};

new p5(sketch, containerElement);
