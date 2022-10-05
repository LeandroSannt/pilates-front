export const downloadFile = (blob: Blob, filename: string) => {
  const objectURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
