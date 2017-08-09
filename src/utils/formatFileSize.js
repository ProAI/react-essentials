export default function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const pow = 1024 ** i;

  return `${parseFloat(bytes / pow).toFixed(1)} ${sizes[i]}`;
}
