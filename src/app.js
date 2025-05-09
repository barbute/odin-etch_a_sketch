/*
 * Copyright (c) 2025 barbute
 * 
 * This file is part of etch_a_sketch and is licensed under the MIT License.
 * See the LICENSE file in the root of the project for more information.
 */

const container = document.querySelector(".container");

// The total amount of space the container can take up with pixels
const totalSpacePX = 360;

// Every pixel will have a light border that will be visible so the user can
// see the pixels - NOTE This MUST be in multiples of 0.5
const pixelBorderSizePX = 0.5;

// How many pixels the canvas grid should be
let gridSizeX = 32;
let gridSizeY = 32;
let gridFullSize = totalSpacePX + (pixelBorderSizePX * gridSizeX * 2);

// How many screen pixels each canvas pixel should be
const pixelSizeXPX = totalSpacePX / gridSizeX;
const pixelSizeYPX = totalSpacePX / gridSizeY;

// Adding styles to constrain the number of grid squares
container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.flexBasis = `${gridFullSize}px`;

// Generate grid
for (let x = 0; x < gridSizeX; x++) {
  for (let y = 0; y < gridSizeY; y++) {
    const pixel = document.createElement("div");
    // Assign pixel class so we can apply a style to all pixels on the canvas.
    pixel.setAttribute("class", "pixel");

    pixel.style.flexBasis = `${pixelSizeXPX}px`;
    pixel.style.height = `${pixelSizeYPX}px`;
    pixel.style.border = `${pixelBorderSizePX}px #d4d4d4 dashed`;

    container.appendChild(pixel);
  }
}