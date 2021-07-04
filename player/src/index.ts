import Player from "./Player";

export * from "./Context";
export * from "./types";
export type { Player };

// create a singleton instance of player
const player = new Player();
export default player;
