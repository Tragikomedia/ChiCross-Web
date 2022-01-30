const path = "save";
const delimiter = " ";

const fromMemory = (memory) => [...memory].join(delimiter);

const fromStorage = (storage) => {
  const item = storage.getItem(path) ?? "";
  const save = item.split(delimiter).map(id => parseInt(id)).filter(id => !isNaN(id));
  return save;
}

const save = {
 fromStorage, fromMemory, path
}

export default save;