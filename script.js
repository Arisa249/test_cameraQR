// 外カメラ優先で起動
navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
}).then(stream => {
  document.getElementById('camera').srcObject = stream;
});

let lastPhotoData = null;

// 撮影処理
document.getElementById('capture').onclick = () => {
  const video = document.getElementById('camera');
  const frame = document.getElementById('frame');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

  lastPhotoData = canvas.toDataURL("image/png");

  // プレビュー表示
  document.getElementById('preview').src = lastPhotoData;
  document.getElementById('camera-container').style.display = "none";
  document.getElementById('preview-container').style.display = "block";
};

// 保存
document.getElementById('save').onclick = () => {
  const link = document.createElement('a');
  link.href = lastPhotoData;
  link.download = 'photo.png';
  link.click();
};

// 撮り直し
document.getElementById('retake').onclick = () => {
  document.getElementById('preview-container').style.display = "none";
  document.getElementById('camera-container').style.display = "block";
};