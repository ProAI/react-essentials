export default function concatProps(...instances) {
  return instances.filter((instance) => instance).map(({ classes }) => classes);
}
