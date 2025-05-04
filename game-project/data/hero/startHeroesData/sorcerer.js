const sorcererData = {
  characteristics : {
    base : {
      life : 30,
      mana : 70,
      strength  : 15,
      dexterity : 15,
      magic     : 35,
      vitality  : 20
    },
    max : {
      strength  : 45,
      dexterity : 85,
      magic     : 250,
      vitality  : 80
    }
  },

  attackSpeed : {
    swords : {
      readiness : 0.60,
      swiftness : 0.55,
      speed     : 0.50,
      haste     : 0.50
    },
    axes : {
      readiness : 0.80,
      swiftness : 0.75,
      speed     : 0.70,
      haste     : 0.70
    },
    staves : {
      readiness : 0.60,
      swiftness : 0.55,
      speed     : 0.50,
      haste     : 0.50
    },
    bows : {
      readiness : 0.80,
      swiftness : 0.75,
      speed     : 0,
      haste     : 0
    }
  }
}
export default sorcererData;