import CardDeck from '@/services/CardDeck'
import GoodTokens from '@/services/GoodTokens'
import DiceModification from '@/services/enum/DiceModification'
import Good from '@/services/enum/Good'

/**
 * Determine the next good to delivery via goat/community delivery.
 */
export default function determineDeliveryGood(goodTokens: GoodTokens, cardDeck: CardDeck) : void {
  let good : Good|undefined = cardDeck.currentRoundCard?.diceValue
  if (!good) {
    return
  }

  // select good as indicated by game round card
  if (useGood(goodTokens, good)) {
    return
  }

  // otherwise search next good up or down in list based on auxiliary card direction
  const diceModification = cardDeck.drawAuxiliary().diceModification
  while (goodTokens.reserve.length > 0) {
    if (diceModification == DiceModification.UP) {
      if (good == 6) {
        good = 1
      }
      else {
        good++
      }
    }
    else {
      if (good == 1) {
        good = 6
      }
      else {
        good--
      }
    }
    if (useGood(goodTokens, good)) {
      return
    }
  }
}

function useGood(goodTokens: GoodTokens, good: Good) : boolean {
  if (goodTokens.used.includes(good) || !goodTokens.reserve.includes(good)) {
    return false
  }
  goodTokens.use(good)
  return true
}
