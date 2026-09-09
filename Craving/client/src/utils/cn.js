export const cn = (...classes) =>
  classes
    .flat(Infinity)
    .filter((className) => typeof className === "string" && className.trim())
    .join(" ");