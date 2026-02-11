export default function copyImageToClipboard(url: string): Promise<void> {
  return navigator.clipboard.write([
    new ClipboardItem({
      'text/html': new Blob([`<img src="${url}" />`], { type: 'text/html' }),
    }),
  ]);
}
