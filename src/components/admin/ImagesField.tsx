import styles from "./Admin.module.css";

/** Image URLs (one per line, first = main image) plus file upload. */
export default function ImagesField({ images, name = "images", uploadName = "newImages", multiple = true, label = "Images" }: { images: string[]; name?: string; uploadName?: string; multiple?: boolean; label?: string }) {
  return <div className={styles.field}>
    <span>{label}</span>
    {images.length > 0 && <div className={styles.thumbs}>
      {/* eslint-disable-next-line @next/next/no-img-element -- admin preview */}
      {images.slice(0, 8).map(src => <img key={src} src={src} alt="" />)}
    </div>}
    {multiple
      ? <textarea name={name} rows={4} defaultValue={images.join("\n")} placeholder="One image URL per line. The first one is the main image." />
      : <input name={name} defaultValue={images[0] ?? ""} placeholder="Image URL" />}
    <label className={styles.upload}>Upload {multiple ? "images" : "an image"}: <input type="file" name={uploadName} accept="image/*" multiple={multiple} /></label>
  </div>;
}
