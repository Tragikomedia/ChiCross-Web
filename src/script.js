import { State } from './state/state.js';
import { getList } from './menu/list.js'; 

let list = getList();
let state = State.change(list);
state.refresh();