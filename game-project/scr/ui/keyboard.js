export let keys = {
	ArrowUp      : { state : false, funcUp : null, funcDown : null, },
  ArrowDown    : { state : false, funcUp : null, funcDown : null, },
  ArrowLeft    : { state : false, funcUp : null, funcDown : null, },
  ArrowRight   : { state : false, funcUp : null, funcDown : null, },
  Space        : { state : false, funcUp : null, funcDown : null, },
  Enter        : { state : false, funcUp : null, funcDown : null, },
  Tab          : { state : false, funcUp : null, funcDown : null, },
  AltLeft      : { state : false, funcUp : null, funcDown : null, },
  AltRight     : { state : false, funcUp : null, funcDown : null, },
  ControlLeft  : { state : false, funcUp : null, funcDown : null, },
  ControlRight : { state : false, funcUp : null, funcDown : null, },
  Backspace    : { state : false, funcUp : null, funcDown : null, },
  ShiftLeft    : { state : false, funcUp : null, funcDown : null, },
  ShiftRight   : { state : false, funcUp : null, funcDown : null, },
  Digit1       : { state : false, funcUp : null, funcDown : null, },
  Digit2       : { state : false, funcUp : null, funcDown : null, },
  Digit3       : { state : false, funcUp : null, funcDown : null, },
  Digit4       : { state : false, funcUp : null, funcDown : null, },
  Digit5       : { state : false, funcUp : null, funcDown : null, },
  Digit6       : { state : false, funcUp : null, funcDown : null, },
  Digit7       : { state : false, funcUp : null, funcDown : null, },
  Digit8       : { state : false, funcUp : null, funcDown : null, },
  Digit9       : { state : false, funcUp : null, funcDown : null, },
  Digit0       : { state : false, funcUp : null, funcDown : null, },
  Escape       : { state : false, funcUp : null, funcDown : null, },
  Delete       : { state : false, funcUp : null, funcDown : null, },
  
};

export class Keyboard {
  constructor(){
    document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
      
      if(keys[e.code] !== undefined){
				if(!keys[e.code].state){
          e.preventDefault();
          keys[e.code].state = true;
          if(keys[e.code].funcDown != null){ keys[e.code].funcDown(); }		
          //(settings.consoleOutKeyboard){console.log("Press Down: '" + e.code + "'  state: " + keys[e.code].state);}			     
				}     
      }
      return keys;
		}
		
		function keyUpHandler(e) {
      if(keys[e.code] !== undefined){
				if(keys[e.code].state){
          e.preventDefault();
          keys[e.code].state = false;
          if(keys[e.code].funcUp != null){ keys[e.code].funcUp(); }		
          //if(settings.consoleOutKeyboard){console.log("Press Up: '" + e.code + "'  state: " + keys[e.code].state);}		     
				}
      }
      return keys;
		}
  }

}

  
  // функция для обнуления массива кнопок
  export function setAllKeyboardNull(){
    
    for (var keyId in keys) { keys[keyId] = setNull(); }   
  }

  // функция для обнуления кнопоки
  export function setButtonNull(button){
    keys[button] = setNull();  
  }

  
  // внутренняя функция для обнуления кнопоки
  function setNull(){
    return { state : false, funcUp : null, funcDown : null, };
  }