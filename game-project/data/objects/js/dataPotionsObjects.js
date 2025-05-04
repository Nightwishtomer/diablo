const data = {
  "1" : {
    "name"            : "Potion of Healing",
    "type"            : "potion",
    "required"        : { "level" : 1 },
    "price"           : 50,
    "action" : [ { 
      type: "partial", // partial, full
      restore : "life", // mana, life
      percentValue : {
        min : 20,  // 20 
        max : 50,  // 50 
        value : 100 // 100
      },
    },],
    
    "textureObjectId" : 44,
    "activity"        : true,
    "belt"            : true, 
    "cursor"          : true,
    "description"     : "Зелья восстановления. Восстанавливает 20-50% жизни"
  },
  "2" : {
    "name"            : "Potion of Full Healing",
    "type"            : "potion",
    "required"        : { "level" : 1 },
    "price"           : 150,
    "action" : [{
      type: "full", // partial, full
      restore : "life", // mana, life
      percentValue : {
        min : 20,
        max : 50,
        value : 100
      },
    }],
    
    "textureObjectId" : 46,
    "activity"        : true,
    "belt"            : true, 
    "cursor"          : true,
    "description"     : "Зелья восстановления. Восстанавливает всю жизнь"
  },
  "3" : {
    "name"            : "Potion of Mana",
    "type"            : "potion",
    "required"        : { "level" : 1 },
    "price"           : 50,
    "action" : [{
      type: "partial", // partial, full
      restore : "mana", // mana, life
      percentValue : {
        min : 20,
        max : 50,
        value : 100
      },
    },],
    
    "textureObjectId" : 51,
    "activity"        : true,
    "belt"            : true, 
    "cursor"          : true,
    "description"     : "Зелья восстановления. Восстанавливает 20-50% маны"
  },
  "4" : {
    "name"            : "Potion of Full Mana",
    "type"            : "potion",
    "required"        : { "level" : 1 },
    "price"           : 150,
    "action" : [{
      type: "full", // partial, full
      restore : "mana", // mana, life
      percentValue : {
        min : 20,
        max : 50,
        value : 100
      },
    },],
    
    "textureObjectId" : 12,
    "activity"        : true,
    "belt"            : true, 
    "cursor"          : true,
    "description"     : "Зелья восстановления. Восстанавливает всю ману"
  },
  "5" : {
    "name"            : "Potion of Rejuvenation",
    "type"            : "potion",
    "required"        : { "level" : 3 },
    "price"           : 120,
    "action" : [{
      type: "partial", // partial, full
      restore : "life", // mana, life
      percentValue : {
        min : 20,  // 20 
        max : 50,  // 50 
        value : 100 // 100
      },
    }, {
      type: "partial", // partial, full
      restore : "mana", // mana, life
      percentValue : {
        min : 20,
        max : 50,
        value : 100
      },
    }],
    
    "textureObjectId" : 45,
    "activity"        : true,
    "belt"            : true, 
    "cursor"          : true,
    "description"     : "Зелья восстановления. Восстанавливает 20-50% жизни и маны"
  },
  "6" : {
    "name"            : "Potion of Full Rejuvenation",
    "type"            : "potion",
    "required"        : { "level" : 7 },
    "price"           : 600,
    "action" : [{
      type: "full", // partial, full
      restore : "life", // mana, life
      percentValue : {
        min : 20,
        max : 50,
        value : 100
      },
    }, {
      type: "full", // partial, full
      restore : "mana", // mana, life
      percentValue : {
        min : 20,
        max : 50,
        value : 100
      },
    }],
    
    "textureObjectId" : 49,
    "activity"        : true,
    "belt"            : true, 
    "cursor"          : true,
    "description"     : "Зелья восстановления. Восстанавливает всю ману и жизни"
  }
}
export default data;