import random from 'lodash.random';
import shuffle from 'lodash.shuffle';

const words = ['april', 'june', 'july', 'august', 'september'];

const currentWord = words[random(0, words.length - 1)];

const shuffleWords = shuffle(currentWord).join("");

const dragContainer = document.querySelector(".drag-container");
const dropContainer = document.querySelector(".drop-container");

const notification = document.querySelector(".notification");


const getContainerValues = () => {
    const dropElement = Array.from(dropContainer.querySelectorAll("div"));
    const dropValues = [];
    dropElement.forEach((dropElement) => {
        dropValues.push(dropElement.innerText.trim());
    });

    return dropValues.join("");
};

for (let i = 0; i < currentWord.length; i++) {
    //Draggables
    const dragItem = document.createElement("div");
    dragItem.setAttribute("draggable", true);
    const currentChar = shuffleWords[i];
    dragItem.innerHTML = currentChar;
    dragContainer.appendChild(dragItem);

    dragItem.addEventListener("dragstart", (event) => {
        dragItem.classList.add("dragging");

        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData("text/plain", currentChar);
    });
    dragItem.addEventListener("dragend", () => {
        dragItem.classList.remove("dragging");
    });

    //DropaBles
    const dropItem = document.createElement("div");
    dropContainer.appendChild(dropItem);

    dropItem.addEventListener("dragenter", (event) => {
        dropItem.classList.add("drag-select");

        event.dataTransfer.dropEffect = "move";
    });

    dropItem.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dropItem.addEventListener("drop", (event) => {
        dropItem.classList.remove("drag-select");

        const char = event.dataTransfer.getData("text/plain");
        dropItem.innerHTML = char;

        if (getContainerValues() === currentWord) {
            notification.style.display = "flex";

            setTimeout(() => {
                notification.style.display = "none";
            }, 3000);
        }
    });

}