type EmojiStickerProps = {
  image: string;
  alt: string;
  size?: number;
  className?: string;
};

export function EmojiSticker({
  image,
  alt,
  size = 120,
  className = ""
}: EmojiStickerProps) {
  return (
    <img
      src={image}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={`inline-block h-auto max-w-full align-middle ${className}`}
    />
  );
}
