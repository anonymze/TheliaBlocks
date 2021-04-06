import { IBlock, PageType } from "../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { reorder } from "../utils/array";

export let initialState: PageType["jsonContent"] = [];

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    setBlocks(state, action: PayloadAction<IBlock[]>) {
      state = action.payload;
    },
    addBlock(state, action: PayloadAction<IBlock>) {
      state.push(action.payload);
    },
    deleteBlock(state, action: PayloadAction<string>) {
      const index = state.findIndex((block) => block.id === action.payload);
      if (index !== -1) state.splice(index, 1);
    },
    updateBlock(
      state,
      action: PayloadAction<{ id: string; data: IBlock["data"] }>
    ) {
      const index = state.findIndex((block) => block.id === action.payload.id);
      if (index !== -1) state[index].data = action.payload.data;
    },
    moveBlockUp(state, action: PayloadAction<IBlock["id"]>) {
      const index = state.findIndex((block) => block.id === action.payload);
      if (index !== -1 && index !== 0) {
        return reorder(state, index, index - 1);
      }
    },
    moveBlockDown(state, action: PayloadAction<IBlock["id"]>) {
      const index = state.findIndex((block) => block.id === action.payload);
      if (index !== -1 && index < state.length) {
        return reorder(state, index, index + 1);
      }
    },
    reorderBlocks(
      state,
      action: PayloadAction<{ source: number; destination: number }>
    ) {
      if (action.payload.source && action.payload.destination) {
        return reorder(
          state,
          action.payload.source,
          action.payload.destination
        );
      }
    },
  },
});

export const {
  setBlocks,
  addBlock,
  deleteBlock,
  updateBlock,
  reorderBlocks,
  moveBlockUp,
  moveBlockDown,
} = blocksSlice.actions;

export default blocksSlice.reducer;
