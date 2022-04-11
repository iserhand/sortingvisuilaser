const shuffleBtn = document.getElementById("shuffle");
shuffleBtn.addEventListener("click", shuffleArray);
const bblsrtBtn = document.getElementById("bblSrtBtn");
bblsrtBtn.addEventListener("click", BubbleSort);
const slctSrtBtn = document.getElementById("slctSrtBtn");
slctSrtBtn.addEventListener("click", SelectionSort);
var container = document.getElementById("array");
var values = [];
const arraySlider = document.getElementById("myArraySize");
const shuffleSlider = document.getElementById("myRange");
arraySlider.addEventListener("input", initializeArray, "change", initializeArray, "click", initializeArray, );
shuffleSlider.addEventListener("input", updateTxt, "change", updateTxt, "click", updateTxt);
initializeArray();

function updateTxt() {
	let arraySize = arraySlider.value;
	let shuffleSize = shuffleSlider.value;
	const element = document.getElementById("arraySizeTxt");
	element.innerHTML = arraySize;
	const element2 = document.getElementById("shuffleCountTxt");
	element2.innerHTML = shuffleSize;
}

function initializeArray() {
	let arraySize = arraySlider.value;
	values = [];
	console.log(arraySize);
	for (var i = 0; i < arraySize; i++) {
		values[i] = i + 1;
		//console.clear();
		//console.log(values);
	}
	updateTxt();
	refreshArray();
}

function refreshArray() {
	container.innerHTML = "";
	let arraySize = arraySlider.value;
	for (var i = 0; i < values.length; i++) {
		value = values[i];
		var array_ele = document.createElement("div");
		// Adding class 'block' to div
		array_ele.classList.add("block");
		// Adding style to div
		array_ele.style.height = `${(value * 175)/arraySize}px`;
		array_ele.style.width = `${28/(arraySize/25)}px`;
		array_ele.style.transform = `translate(${(i * (28/(arraySize/26)))}px)`;
		// Creating label element for displaying 
		// size of particular block
		var array_ele_label = document.createElement("label");
		array_ele_label.classList.add("block_id");
		array_ele_label.innerText = value;
		// Appending created elements to index.html 
		array_ele.appendChild(array_ele_label);
		container.appendChild(array_ele);
		//console.clear();
		//console.log(values);
	}
}
async function shuffleArray(delay = 1) {
	var shuffleCount = document.getElementById("myRange").value;
	var blocks = document.querySelectorAll(".block");
	for (var i = 0; i < shuffleCount * 3; i++) {
		var shuffleCount = document.getElementById("myRange").value;
		let from = Math.floor(Math.random() * blocks.length);
		let to = Math.floor(Math.random() * blocks.length);
		blocks[from].style.backgroundColor = "#FF4949";
		blocks[to].style.backgroundColor = "#FF4949";
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, delay)
		);
		var temp = values[from];
		values[from] = values[to];
		values[to] = temp;
		await swapForShuffle(blocks[from], blocks[to]);
		refreshArray();
		blocks[from].style.backgroundColor = "#6b5b95";
		blocks[to].style.backgroundColor = "#6b5b95";
		blocks = document.querySelectorAll(".block");
	}
	//console.log(values);
}

function swapForShuffle(el1, el2) {
	var shuffleCount = document.getElementById("myRange").value;
	return new Promise((resolve) => {
		// For exchanging styles of two blocks
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;
		window.requestAnimationFrame(function() {

			// For waiting for .25 sec
			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 0);
		});
	});
}

function swap(el1, el2) {
	let arraySize = arraySlider.value;
	return new Promise((resolve) => {
		// For exchanging styles of two blocks
		var temp = el1.style.transform;
		el1.style.transform = el2.style.transform;
		el2.style.transform = temp;

		window.requestAnimationFrame(function() {

			// For waiting for .25 sec
			setTimeout(() => {
				container.insertBefore(el2, el1);
				resolve();
			}, 50000 / (arraySize * arraySize));
		});
	});
}
async function BubbleSort(delay = 1) {
	var blocks = document.querySelectorAll(".block");
	// BubbleSort Algorithm
	for (var i = 0; i < blocks.length; i++) {
		for (var j = 0; j < blocks.length - i - 1; j++) {

			// To change background-color of the
			// blocks to be compared
			blocks[j].style.backgroundColor = "#FF4949";
			blocks[j + 1].style.backgroundColor = "#FF4949";

			// To wait for .1 sec
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve();
				}, delay)
			);

			var value1 = Number(blocks[j].childNodes[0].innerHTML);
			var value2 = Number(blocks[j + 1]
				.childNodes[0].innerHTML);

			// To compare value of two blocks
			if (value1 > value2) {
				await swap(blocks[j], blocks[j + 1]);
				blocks = document.querySelectorAll(".block");
			}

			// Changing the color to the previous one
			blocks[j].style.backgroundColor = "#6b5b95";
			blocks[j + 1].style.backgroundColor = "#6b5b95";
		}

		//changing the color of greatest element 
		//found in the above traversal
		blocks[blocks.length - i - 1]
			.style.backgroundColor = "#13CE66";
	}
}
async function SelectionSort(delay = 1) {
	let arraySize = arraySlider.value;
	var blocks = document.querySelectorAll(".block");
	for (var i = 0; i < blocks.length; i++) {
		var min_idx = i;
		for (var j = i + 1; j < blocks.length; j++) {
			blocks[j].style.backgroundColor = "#FF4949";
			await new Promise((resolve) =>
				window.requestAnimationFrame(function() {
					setTimeout(() => {
						resolve();
					}, 50000 / (arraySize * arraySize))
				})
			);
			var value1 = Number(blocks[j]
				.childNodes[0].innerHTML);
			var value2 = Number(blocks[min_idx]
				.childNodes[0].innerHTML);
			if (value1 < value2) {
				blocks[min_idx].style.backgroundColor = "#6b5b95";
				min_idx = j;
				blocks[min_idx].style.backgroundColor = "#4142CC";
			}
			else{
				blocks[j].style.backgroundColor = "#6b5b95";
			}
			
		}
		await new Promise((resolve) =>
			setTimeout(() => {
				let arraySize = arraySlider.value;
				var temp1 = blocks[min_idx].style.height;
				var temp2 = blocks[min_idx].childNodes[0].innerText;
				blocks[min_idx].style.height = blocks[i].style.height;
				blocks[i].style.height = temp1;
				blocks[min_idx].childNodes[0].innerHTML = blocks[i].childNodes[0].innerHTML;
				blocks[i].childNodes[0].innerText = temp2;
				blocks = document.querySelectorAll(".block");
				resolve();
			}, 30)
		);
		blocks[min_idx].style.backgroundColor = "#6b5b95";
		blocks[i]
			.style.backgroundColor = "#13CE66";

	}
}