import classNames from "classnames"
import React, { ReactElement, useState } from "react"

export default function NFTImage({
  width,
  height,
  alt,
  src,
  fit = "cover",
  isBadge = false,
}: {
  width: number
  height?: number
  alt: string
  src?: string
  fit?: string
  isBadge?: boolean
}): ReactElement {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <div
        className={classNames("nft_image_wrapper", {
          badge: isBadge,
        })}
      >
        <div className="nft_image_background" />
        <img
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          className={classNames({
            loading: isLoading,
            badge: isBadge,
          })}
          alt={alt}
          src={src}
          width={width}
          height={height}
          onError={({ currentTarget }) => {
            // eslint-disable-next-line no-param-reassign
            currentTarget.onerror = null // prevents looping
            // eslint-disable-next-line no-param-reassign
            currentTarget.src = "./images/no_preview.svg"
            // eslint-disable-next-line no-param-reassign
            currentTarget.className = ""
          }}
        />
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            background-color: var(--hunter-green);
          }
          50% {
            background-color: var(--green-95);
          }
          100% {
            background-color: var(--hunter-green);
          }
        }

        img {
          width: ${width}px;
          height: ${height ? `${height}px` : "auto"};
          object-fit: ${fit};
          max-height: ${height ?? "100%"};
          max-width: ${width ?? "100%"};
          border-radius: 8px;
          flex-grow: 1;
        }
        img.badge {
          position: absolute;
          top: 0;
          left: 0;
          width: ${width * 0.8}px;
          height: ${height ? `${height * 0.8}px` : "auto"};
          margin: ${width * 0.1}px;
          border-radius: 100%;
        }
        img.loading {
          background-color: var(--hunter-green);
          border-radius: ${isBadge ? "100%" : "8px"};
          animation: pulse 1.1s infinite;
        }

        .nft_image_wrapper {
          border-radius: 8px;
        }
        .nft_image_wrapper.badge {
          overflow: hidden;
          position: relative;
          width: ${width}px;
          height: ${height || width + 40}px;
        }
        .nft_image_wrapper.badge .nft_image_background {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: no-repeat center/200% url(${src});
          filter: blur(20px);
        }
      `}</style>
    </>
  )
}
