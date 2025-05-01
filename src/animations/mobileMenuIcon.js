export const mobileMenuIconVariants = {
  initial: (direction) => ({
    rotate: direction === "open" ? -90 : 90,
    opacity: 0,
  }),
  animate: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: (direction) => ({
    rotate: direction === "open" ? 90 : -90,
    opacity: 0,
    transition: { duration: 0.2 },
  }),
};
