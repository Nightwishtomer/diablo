const rogueData = {
  characteristics : {
    base : {
      life : 45,
      mana : 22,
      strength  : 20,
      dexterity : 30,
      magic     : 15,
      vitality  : 20
    },
    max : {
      strength  : 55,
      dexterity : 250,
      magic     : 70,
      vitality  : 80
    }
  },

  attackSpeed : {
    swords : {
      readiness : 0.50,
      swiftness : 0.45,
      speed     : 0.40,
      haste     : 0.40
    },
    axes : {
      readiness : 0.65,
      swiftness : 0.60,
      speed     : 0.55,
      haste     : 0.55
    },
    staves : {
      readiness : 0.55,
      swiftness : 0.50,
      speed     : 0.45,
      haste     : 0.45
    },
    bows : {
      readiness : 0.35,
      swiftness : 0.30,
      speed     : 0,
      haste     : 0
    }
  }
}

  
export default rogueData;