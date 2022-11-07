export default function UnsplashImages({ images, selected, setSelected }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {images.map((image) => (
        <li
          key={image.id}
          className={"relative"}
          onClick={() => setSelected(image)}
        >
          <div
            className={
              selected?.id === image?.id
                ? "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 ring-4 ring-vibez-primary ring-offset-2 ring-offset-gray-100"
                : "group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100"
            }
          >
            <picture>
              <img
                src={image?.urls?.small}
                alt=""
                className="object-cover pointer-events-none group-hover:opacity-75 w-full h-24"
              />
            </picture>
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            ></button>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-xs font-medium text-white">
            {image.user.name}
          </p>{" "}
        </li>
      ))}
    </ul>
  )
}
