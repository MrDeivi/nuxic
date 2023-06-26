export function getImageSrc(md5Image: string, size: 'small' | 'medium' | 'big' = 'medium') {
  const dimensions = {
    small: '56x56',
    medium: '250x250',
    big: '500x500',
  }
  return `https://e-cdns-images.dzcdn.net/images/cover/${md5Image}/${dimensions[size]}-000000-80-0-0.jpg`
}
