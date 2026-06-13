interface HeaderPhotoProps {
  photoEvent?: string;
}

export default function HeaderPhoto({ photoEvent }: HeaderPhotoProps) {
  if (!photoEvent) return null;
  return <img src={photoEvent} alt="" style={{ marginTop: '22px', width: '100%' }} />;
}
