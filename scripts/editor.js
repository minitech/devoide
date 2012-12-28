'use strict';

function addFile(file) {
	var blobUri = URL.createObjectURL(file);

	// Create a preview image:
	var previewImage = document.createElement('img');

	previewImage.src = 'images/loading.svg';
	previewImage.dataset.video = blobUri;

	document.body.appendChild(previewImage);

	var videoElement = document.createElement('video');

	videoElement.addEventListener('loadeddata', function() {
		videoElement.addEventListener('seeked', function() {
			// Draw the current state onto a canvas:
			var canvas = document.createElement('canvas');
			canvas.width = 200;
			canvas.height = 120;

			var g = canvas.getContext('2d');
			g.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

			// Save the canvas to the preview image:
			previewImage.src = canvas.toDataURL('image/png');
		});

		// Is 5 seconds a good time?
		// TODO: What does it do for videos of less than 5 seconds?
		videoElement.currentTime = 5;
	});

	videoElement.src = blobUri;
	videoElement.load();
}

Accelerate.addEventListener('ready', function() {
	var uploadBox = document.getElementById('upload-box');

	uploadBox.onchange = function() {
		Array.prototype.forEach.call(uploadBox.files, addFile);
		uploadBox.value = null;
	};
});
