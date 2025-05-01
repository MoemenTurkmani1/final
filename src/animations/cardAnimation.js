export const cardAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export const heartAnimation = {
  initial: { rotate: 0 },
  animate: { rotate: 360, scale: 1.2 },
  exit: { rotate: 0, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" },
};
