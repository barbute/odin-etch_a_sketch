/*
 * Copyright (c) 2025 barbute
 * 
 * This file is part of etch_a_sketch and is licensed under the MIT License.
 * See the LICENSE file in the root of the project for more information.
 */

const Tool = {
  DRAW: "draw",
  ERASER: "erase",
  RAINBOW: "rainbow"
}

const container = document.querySelector(".container");

// The total amount of space the container can take up with pixels
const totalSpacePX = 360;

// Every pixel will have a light border that will be visible so the user can
// see the pixels - NOTE This MUST be in multiples of 0.5, I think it has
// something to do with how I'm adding it to the grid's full size
const pixelBorderSizePX = 0.5;

let selectedTool = Tool.DRAW;

function paintGrid(canvasSizeX, canvasSizeY) {
  // Adding styles to constrain the number of grid squares
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.flexBasis = `${totalSpacePX}px`;

  // How many screen pixels each canvas pixel should be
  const pixelSizeXPX = (totalSpacePX / canvasSizeX) - (pixelBorderSizePX * 2);
  const pixelSizeYPX = (totalSpacePX / canvasSizeY) - (pixelBorderSizePX * 2);

  // Generate grid
  for (let x = 0; x < canvasSizeX; x++) {
    for (let y = 0; y < canvasSizeY; y++) {
      const pixel = document.createElement("div");
      // Assign pixel class so we can apply a style to all pixels on the canvas
      pixel.setAttribute("class", "pixel");

      pixel.style.flexBasis = `${pixelSizeXPX}px`;
      pixel.style.height = `${pixelSizeYPX}px`;
      pixel.style.border = `${pixelBorderSizePX}px #d4d4d4 dashed`;

      container.appendChild(pixel);
    }
  }

  // Add event listeners for paint events after the canvas has been populated
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", (event) => {
      if (event.buttons === 1) {
        pixel.style.backgroundColor = "black";
        pixel.style.borderColor = "black";
      }
    }, true);
    pixel.addEventListener("mouseover", function(event) {
      if (event.buttons === 1) {
        switch (selectedTool) {
          case Tool.DRAW:
            pixel.style.backgroundColor = "black";
            pixel.style.borderColor = "black";
            break;
          case Tool.ERASER:
            pixel.style.backgroundColor = "white";
            pixel.style.borderColor = "#d4d4d4";
            break;
          case Tool.RAINBOW:
            let red = (Math.random() * 255).toFixed(0);
            let green = (Math.random() * 255).toFixed(0);
            let blue = (Math.random() * 255).toFixed(0);
            pixel.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            pixel.style.borderColor = `rgb(${red}, ${green}, ${blue})`;
            break;
          default:
            console.log("ERROR: Invalid tool selected")
            break;
        }
      }
    }, true);
  });
}

// Grid size slider logic
const sizeSlider = document.querySelector("#size");
const sizeDimensionDisplay = document.querySelector("#size-count");
// When the grid slider changes...
sizeSlider.oninput = function() {
  // Update label on display
  const gridSize = sizeSlider.value;
  sizeDimensionDisplay.innerHTML = gridSize;

  // Clear the container
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    container.removeChild(pixel);
  });

  // Update and repaint the grid
  paintGrid(gridSize, gridSize)
}

function updateSelectedToolHighlight() {
  // Reset backgroun colors
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });

  switch (selectedTool) {
    case Tool.DRAW:
      drawButton.classList.add("selected");
      break;
    case Tool.ERASER:
      eraserButton.classList.add("selected");
      break;
    case Tool.RAINBOW:
      rainbowButton.classList.add("selected");
      break;
    default:
      console.log("ERROR: Invalid tool selected")
      break;
  }
}

// Menu bar button logic
const drawButton = document.querySelector(".draw");
drawButton.addEventListener("click", function() {
  selectedTool = Tool.DRAW;
  updateSelectedToolHighlight()
})

const eraserButton = document.querySelector(".eraser");
eraserButton.addEventListener("click", function() {
  selectedTool = Tool.ERASER;
  updateSelectedToolHighlight()
})

const rainbowButton = document.querySelector(".rainbow");
rainbowButton.addEventListener("click", function() {
  selectedTool = Tool.RAINBOW;
  updateSelectedToolHighlight()
})

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", function() {
  let currentGridSize = sizeSlider.value;

  // Clear the container
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    container.removeChild(pixel);
  });

  // Update and repaint the grid
  paintGrid(currentGridSize, currentGridSize)
})

// Initial grid paint
paintGrid(16, 16);

// Initial update selected tool highlight
updateSelectedToolHighlight();