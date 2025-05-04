export const LEVELSETTINGS = {
  cathedral : { // Собор
    size : { // Размер зала
      width : 80, // Ширина зала
      height : 80 // Высота зала
    },
    centralRoom : { // Центральная комната
      size : { // Размер центральной комнаты
        width : 20, // Ширина центральной комнаты
        height : 20 // Высота центральной комнаты
      }
    },
    recursionDepth : 50, // глубина рекурсии при создании маленьких комнат // recursion depth when creating small rooms 
    mapLegend : { // Легенда карты
      floor     : ".", // ASCII Значек пол // ASCII Icon floor
      wall      : "#", // ASCII Значек стена // ASCII Icon wall
      grate     : "", // ASCII Значек решетка // ASCII Icon grate 
      door      : "*", // ASCII Значек дверь // ASCII Icon door
      doorGrate : "", // ASCII Значек дверь с решеткой // ASCII Icon door with grate
      arch      : "-", // ASCII Значек арка // ASCII Icon arch with grate
      archGrate : "+", // ASCII Значек арка с решеткой // ASCII Icon arch with grate   
      cornerTL  : "A", // ASCII Значек угол верх Лево // ASCII Icon corner top left
      cornerTR  : "B", // ASCII Значек угол верх право // ASCII Icon corner top right
      cornerBL  : "C", // ASCII Значек угол низ Лево // ASCII Icon corner bottom left
      cornerBR  : "D", // ASCII Значек угол низ право // ASCII Icon corner bottom right
    }
    
    
  }
}