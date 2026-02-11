function imgToPngBlob(img: HTMLImageElement): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to convert to PNG'));
    }, 'image/png');
  });
}

export default function copyImageToClipboard(img: HTMLImageElement): Promise<void> {
  return navigator.clipboard.write([
    new ClipboardItem({ 'image/png': imgToPngBlob(img) }),
  ]);
}
