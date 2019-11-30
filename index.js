import p5 from 'p5';
import './styles/style.scss';
import tree from './img/tree.png';

const containerElement = document.getElementById('p5_container'); 

const sketch = (p) => {
    let img;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const treeWidth = 10;
    const treeHeight = 20;
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

      show() {
        p.image(img, this.finalX, this.finalY, treeWidth, treeHeight);
      }
    }

    const trees = []; //array holding tree objects

    const generateTrees = () => {
      let treesInCurrentRow = 0;
      let rowNumber = 0;
      let xStart = margin.left; 
      let xEnd = margin.right;
      let yPos = windowHeight - margin.bottom;
      const xGap = 2.5;
      const yGap = 2.5;
      const numberOfTrees = 3400;
  
      //width of the row is equal to the window width minus the margin
      //there is also a margin on the left side which increases depending on the row number
      let rowWidth = windowWidth - xStart - xEnd;
      const pyramidHeight = windowHeight - margin.top - margin.bottom;

      for (let i = 0; i < numberOfTrees; i++) {

          //if rowNumber is higher than pyramidHeight, stop
          if (rowNumber * (treeHeight + yGap) > pyramidHeight) {
            return;
          }

          //if rowNumber is not higher than pyramidHeight, push tree to array
          trees.push(new Tree(i, xStart, yPos)); //push tree to trees array

          //each tree in the current row has a width and a gap between them
          //if the total of their width and gap is less than or equal to the rowWidth, proceed in the current row
          if (treesInCurrentRow * (treeWidth + xGap) <= rowWidth) {
            treesInCurrentRow += 1; //add tree to current row
            xStart = xStart + treeWidth + xGap; //adjust x position - add treeWidth and xGap
          } else if (treesInCurrentRow * (xGap + treeWidth) > rowWidth) {
            treesInCurrentRow = 0;
            rowNumber += 1;
            xStart = margin.left + (rowNumber * (xGap + treeWidth)); //reset x position to the left margin to the rowNumber times the xGap
            xEnd = margin.right + (rowNumber * (xGap + treeWidth));
            yPos = yPos - (treeHeight + yGap); //move the y position up by the height and gap
            rowWidth = windowWidth - xStart - xEnd;
          };
      };
    };

    generateTrees();

    p.preload = () => {
      img = p.loadImage(tree);
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background('lightgrey');
      
      trees.forEach((tree) => {
        tree.show();
      })
    };
  };

new p5(sketch, containerElement);
