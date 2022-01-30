import saveModel from './saveModel.js';

const accessStorage = () => localStorage;

const load = (storage) => saveModel.fromStorage(storage);

const saveVictory = (id) => {
  const storage = accessStorage();
  save(storage, id);
}

const save = (storage, id) => {
  const progressMemory = new Set(load(storage));
  progressMemory.add(id);
  const save = saveModel.fromMemory(progressMemory);
  storage.setItem(saveModel.path, save);
}

const saveSystem = {
  load, accessStorage, saveVictory
}

export default saveSystem;
