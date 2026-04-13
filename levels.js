// moveLimit = ideal minimum moves + 3 buffer
// Tutorial has no move limit (set to 999 as unused)
const levels = [
  {
    title: "Tutorial: Slide to Exit",
    moveLimit: 999, // No limit on tutorial
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 2, y: 2, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 1, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 4, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
    ],
  },
  {
    title: "Level 1: Easy",
    // Ideal: move blocker at (2,1) up 1, target right 3, then clear (2,3) right 1 = ~5 moves. +3 = 8
    moveLimit: 8,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 2, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 2, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 1, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 2, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 4, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
    ],
  },

  {
    title: "Level 2: Moderate",
    // Ideal: ~7 moves to clear path. +3 = 10
    moveLimit: 10,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 1, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 2, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 2, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 1, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 0, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
    ],
  },
  {
    title: "Level 3: Heavy",
    // Ideal: ~8 moves. +3 = 11
    moveLimit: 11,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 2, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 2, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 1, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 3, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 0, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 1, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
    ],
  },

  {
    title: "Level 4: Strain",
    // Ideal: ~9 moves. +3 = 12
    moveLimit: 12,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },

      { x: 2, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 2, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },

      { x: 3, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 1, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },

      { x: 2, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 0, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
    ],
  },

  {
    title: "Level 5: Double-Detour (Hard)",
    // Ideal: ~11 moves. +3 = 14
    moveLimit: 14,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },

      { x: 2, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },

      { x: 1, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 3, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },

      { x: 2, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },

      { x: 3, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },

      { x: 0, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
    ],
  },

  {
    title: "Level 6: Pot-Locked (Kitchen)",
    // Ideal: ~10 moves. +3 = 13
    moveLimit: 13,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 2, y: 0, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 3, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 2, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 0, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
    ],
  },
  {
    title: "Level 7: Carpet Shuffle",
    // Ideal: ~12 moves. +3 = 15
    moveLimit: 15,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 2, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },

      { x: 0, y: 0, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 2, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },

      { x: 0, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 1, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 2, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
    ],
  },
  {
    title: "Level 8: Coffee Table Chaos",
    // Ideal: ~11 moves. +3 = 14
    moveLimit: 14,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 2, y: 0, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 4, y: 2, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 0, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 3, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 0, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 1, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 2, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
    ],
  },
  {
    title: "Level 9: The Final Couch Crush",
    // Ideal: ~13 moves. +3 = 16
    moveLimit: 16,
    blocks: [
      {
        x: 0,
        y: 2,
        w: 2,
        h: 1,
        col: [255, 255, 0],
        isHoriz: true,
        isTarget: true,
      },
      { x: 0, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 2, y: 0, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },

      { x: 2, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 3, y: 1, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },

      { x: 4, y: 2, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },

      { x: 0, y: 3, w: 1, h: 2, col: [255], isHoriz: false, isTarget: false },
      { x: 1, y: 3, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
      { x: 3, y: 4, w: 2, h: 1, col: [255], isHoriz: true, isTarget: false },
    ],
  },
];
