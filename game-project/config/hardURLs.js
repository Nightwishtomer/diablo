/*
export const assetsData = {
  char         : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/char.png'),         // Окно характеристик
  charbut      : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/charbut.png'),      // Кнопки окна характеристик
  inv : {
    rogue    : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/inv_rogue.png'),    // Окно инвентаря Лучницы
    sorcerer : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/inv_sorcerer.png'), // Окно инвентаря Мага
    warrior  : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/inv_warrior.png'),	// Окно инвентаря Воина
  },
  p8bulbs      : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/p8bulbs.png'),	    // Пустые шары здоровья и маны
  mainPanel     : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/mainPanel.png'),       // Нижняя панель 
  spelicon_cel : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spelicon_cel.png'), // Иконки Магии 1
  spellbk      : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spellbk.png'),	    // Окно навыков
  spellbkb     : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spellbkb.png'),     // Кнопки окна навыков
  spelli2_cel  : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/spelli2_cel.png'),  // Иконки Магии 2
  buttonChar   : await Assets.load('./../../../../game-project/assets/images/ui/controlPanel/buttonChar.json'),  // Ассет. Кнопок для повышения хорактеристик
};
*/








const hardURLs = {
  data : {
    ui : {
      cursor : {
        cursor : "../game-project/data/ui/cursor/cursor.json",
      },
      ControlPanel : {
        main : {
          mainPanel : "../game-project/data/ui/ControlPanel/main/mainPanel.json",
        },
        p8bulbs : "../game-project/data/ui/ControlPanel/p8bulbs.json",
        buttonChar : "../game-project/data/ui/ControlPanel/buttonChar.json",
      },
    },
  },


  assets : {
    images : {
      items : {
        objcurs : "../game-project/assets/images/items/objcurs.png",
      },
      ui : {
        logo : {
          "diabloLogoSmal" : "../game-project/assets/images/ui/logo/diabloLogoSmal.png",
        },
      },
    },
    data: {
      objects : {
        objcurs : "../game-project/data/objects/objcurs.json",
        json : "../game-project/data/objects/json/",
      },
      ui : {
        menu : {
          menuLoader : "../game-project/data/ui/menu/",
          loadData : "../game-project/data/ui/controlPanel/",
          loadUserData : "../game-project/data/user/userSaveData.json",

          selectField : "../game-project/assets/images/ui/menu/selectField.png",
          selectChar : "../game-project/assets/images/ui/menu/selectChar.png",
          img_all : "../game-project/assets/images/ui/menu/img_all.png",
          img_rogue : "../game-project/assets/images/ui/menu/img_rogue.png",
          img_sorcerer : "../game-project/assets/images/ui/menu/img_sorcerer.png",
          img_warrior : "../game-project/assets/images/ui/menu/img_warrior.png",





        },
        text : {
          textSmall : "../game-project/data/ui/text/textSmall.json",

          textBig : "../game-project/data/ui/text/textBig.json",
          textMed : "../game-project/data/ui/text/textMed.json",
        },
        spiner : {
          pentagramSpiner : "../game-project/data/ui/spiner/pentagramSpiner.json",
          pentagramSpinerMin : "../game-project/data/ui/spiner/pentagramSpinerMin.json",
        },
      },
    },
  },

  
};








// Экспортируем объект для использования в других модулях
export default hardURLs;