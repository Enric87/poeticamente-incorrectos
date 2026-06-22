// Importa todos los frames reales de Adri extraídos del spritesheet
// y los expone organizados por animación.

import idle1 from "../assets/sprites/adri_idle_1.png";
import idle2 from "../assets/sprites/adri_idle_2.png";
import idle3 from "../assets/sprites/adri_idle_3.png";
import idle4 from "../assets/sprites/adri_idle_4.png";

import run1 from "../assets/sprites/adri_run_1.png";
import run2 from "../assets/sprites/adri_run_2.png";
import run3 from "../assets/sprites/adri_run_3.png";
import run4 from "../assets/sprites/adri_run_4.png";
import run5 from "../assets/sprites/adri_run_5.png";
import run6 from "../assets/sprites/adri_run_6.png";

import jump1 from "../assets/sprites/adri_jump_1.png";
import jump2 from "../assets/sprites/adri_jump_2.png";

import shout1 from "../assets/sprites/adri_shout_1.png";
import shout2 from "../assets/sprites/adri_shout_2.png";
import shout3 from "../assets/sprites/adri_shout_3.png";
import shout4 from "../assets/sprites/adri_shout_4.png";

import hit1 from "../assets/sprites/adri_hit_1.png";
import hit2 from "../assets/sprites/adri_hit_2.png";

import pose1 from "../assets/sprites/adri_pose_1.png";
import pose2 from "../assets/sprites/adri_pose_2.png";

import heroRun from "../assets/sprites/adri_hero_run.png";
import heroJump from "../assets/sprites/adri_hero_jump.png";
import heroShout from "../assets/sprites/adri_hero_shout.png";

export const adriFrames = {
  idle: [idle1, idle2, idle3, idle4],
  run: [run1, run2, run3, run4, run5, run6],
  jump: [jump1, jump2],
  shout: [shout1, shout2, shout3, shout4],
  hit: [hit1, hit2],
  pose: [pose1, pose2],
};

// Poses grandes individuales (ilustración a mayor detalle), útiles para
// momentos destacados como la intro o pantallas promocionales.
export const adriHero = {
  run: heroRun,
  jump: heroJump,
  shout: heroShout,
};

export type AdriAnimation = keyof typeof adriFrames;
