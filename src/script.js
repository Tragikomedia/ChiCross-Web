import { State } from './state/state.js';
import { createList } from './menu/list.js'; 
import { levels } from './levels/levels.js';

let list = createList(levels);
let state = State.change(list);
state.refresh();