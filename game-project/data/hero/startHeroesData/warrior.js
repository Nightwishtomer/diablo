const warriorData = {
  characteristics : {
    base : {
      life : 70,
      mana : 10,
      strength  : 30,
      dexterity : 20,
      magic     : 10,
      vitality  : 25
    },
    max : {
      strength  : 250,
      dexterity : 60,
      magic     : 50,
      vitality  : 100
    }
  },

  attackSpeed : {
    swords : { 
      readiness : 0.45,
      swiftness : 0.40,
      speed     : 0.35,
      haste     : 0.40
    },
    axes : {
      readiness : 0.45,
      swiftness : 0.50,
      speed     : 0.40,
      haste     : 0.40
    },
    staves : {
      readiness : 0.55,
      swiftness : 0.50,
      speed     : 0.45,
      haste     : 0.45
    },
    bows : {
      readiness : 0.55,
      swiftness : 0.50,
      speed     : 0,
      haste     : 0
    }
  }
}
export default warriorData;
