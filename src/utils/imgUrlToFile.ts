export async function imageUrlToFile(imageUrl: string, fileName: string): Promise<File> {
    const response = await fetch(imageUrl, { mode: 'no-cors' });
    const imageBlob = await response.blob();
    const file = new File([imageBlob], fileName, { type: imageBlob.type });
  
    return file
  }