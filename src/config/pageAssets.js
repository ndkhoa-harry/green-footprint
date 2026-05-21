import logoImg from '../assets/logo.png'
import loadingLogo from '../assets/loading_logo.png'

import inputBg from '../assets/home_background.png'
import inputMascot from '../assets/mascot_2.png'

import instructBg from '../assets/home_background.png'
import phase1Icon from '../assets/phase_1_icon.png'
import phase2Icon from '../assets/phase_2_icon.png'
import phase3Icon from '../assets/phase_3_icon.png'
import bullet1 from '../assets/bullet_icon_1.png'
import bullet2 from '../assets/bullet_icon_2.png'
import bullet3 from '../assets/bullet_icon_3.png'
import bullet4 from '../assets/bullet_icon_4.png'
import bullet5 from '../assets/bullet_icon_5.png'
import bullet6 from '../assets/bullet_icon_6.png'
import bullet7 from '../assets/bullet_icon_7.png'

import mapBg from '../assets/home_background.png'
import mapImg from '../assets/map.png'
import mapMascot from '../assets/mascot_2.png'

import homeBg from '../assets/home_background.png'
import trophyImg from '../assets/trophy.png'
import lb1 from '../assets/leaderboard_1.png'
import lb2 from '../assets/leaderboard_2.png'
import lb3 from '../assets/leaderboard_3.png'

import resultBg from '../assets/result_background.png'
import resultRibbon from '../assets/result_ribbon.png'
import badgeImg from '../assets/badge.png'
import resultMascot from '../assets/mascot_4.png'

import p1Home from '../assets/home_background.png'
import p1Bedroom from '../assets/game_1_background.png'
import p1Mascot from '../assets/mascot_1.png'
import p1Extraction from '../assets/extraction_bottle.png'
import p1Containers from '../assets/containers.png'
import p1ReusableBottle from '../assets/reusable_bottle.png'
import p1PlasticBottle from '../assets/plastic_bottle.png'
import p1PowerBank from '../assets/power_bank.png'
import p1ReusableBag from '../assets/reusable_bag.png'
import p1Shampoo from '../assets/shampoo.png'
import p1WetWipes from '../assets/wet_wipes.png'

import p2Home from '../assets/home_background.png'
import p2Scene from '../assets/game_2_background.png'
import p2Rock from '../assets/rock.png'
import p2Mascot from '../assets/mascot_3.png'
import p2t1 from '../assets/trash_1.png'
import p2t2 from '../assets/trash_2.png'
import p2t3 from '../assets/trash_3.png'
import p2t4 from '../assets/trash_4.png'
import p2t5 from '../assets/trash_5.png'
import p2t6 from '../assets/trash_6.png'
import p2t7 from '../assets/trash_7.png'
import p2t8 from '../assets/trash_8.png'
import p2t9 from '../assets/trash_9.png'
import p2t10 from '../assets/trash_10.png'
import p2t11 from '../assets/trash_11.png'
import p2t12 from '../assets/trash_12.png'

import p3Home from '../assets/home_background.png'
import p3Instr from '../assets/game_3_scene_1.png'
import p3Play from '../assets/game_3_scene_2.png'
import p3t1 from '../assets/trash_1.png'
import p3t2 from '../assets/trash_2.png'
import p3t3 from '../assets/trash_3.png'
import p3t4 from '../assets/trash_4.png'
import p3t5 from '../assets/trash_5.png'
import p3t6 from '../assets/trash_6.png'
import p3t7 from '../assets/trash_7.png'
import p3t8 from '../assets/trash_8.png'
import p3t9 from '../assets/trash_9.png'
import p3t10 from '../assets/trash_10.png'
import p3t11 from '../assets/trash_11.png'
import p3t12 from '../assets/trash_12.png'

/** Always preloaded (navbar logo + loading art). */
export const COMMON_ASSETS = [logoImg, loadingLogo]

const TRASH = [p2t1, p2t2, p2t3, p2t4, p2t5, p2t6, p2t7, p2t8, p2t9, p2t10, p2t11, p2t12]

export const PAGE_ASSETS = {
  '/': [inputBg, inputMascot],
  '/instructions': [
    instructBg,
    phase1Icon,
    phase2Icon,
    phase3Icon,
    bullet1,
    bullet2,
    bullet3,
    bullet4,
    bullet5,
    bullet6,
    bullet7,
  ],
  '/map': [mapBg, mapImg, mapMascot],
  '/home': [homeBg, trophyImg, lb1, lb2, lb3],
  '/results': [resultBg, resultRibbon, badgeImg, resultMascot],
  '/phase/1': [
    p1Home,
    p1Bedroom,
    p1Mascot,
    p1Extraction,
    p1Containers,
    p1ReusableBottle,
    p1PlasticBottle,
    p1PowerBank,
    p1ReusableBag,
    p1Shampoo,
    p1WetWipes,
  ],
  '/phase/2': [p2Home, p2Scene, p2Rock, p2Mascot, ...TRASH],
  '/phase/3': [p3Home, p3Instr, p3Play, ...TRASH],
}

export function getAssetsForPath(pathname) {
  const pageAssets = PAGE_ASSETS[pathname] ?? []
  return [...COMMON_ASSETS, ...pageAssets]
}
