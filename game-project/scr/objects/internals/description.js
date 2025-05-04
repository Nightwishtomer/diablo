
/**
 * The Description class generates a description of an item based on the passed data.
 */
export class Description {
   /**
   * Constructor of the Description class.
   * @param {string} [type=false] - Object type (must be "objects").
   * @param {Object} [data=false] - Item details.
   * @returns {Object|boolean} An object with the item's parameters, or `false` if an invalid type was passed.
   */
  constructor(type = false, data = false) {  
    this.name = data.name;
    if (type == "objects") {
   
      let result = {
        name: data.name,
        description: data.description,
        unique: data.unique,
        canBeUsed: data.canBeUsed,
        required: this._required(data.required),
        property: false,
      };

      /**
       * Map of correspondences between types of objects and their properties.
       * @type {Object<string, string[]>}
       */
      const propertiesMap = {
        armor:  ["_weight", "_armorClass", "_durability", "_indestructible"],
        axe:    ["_durability", "_indestructible", "_damage", "_doubleHand"],
        bows:   ["_durability", "_indestructible", "_damage", "_doubleHand"],
        helmet: ["_armorClass", "_durability", "_indestructible"],
        mace:   ["_durability", "_indestructible", "_damage", "_doubleHand"],
        shield: ["_armorClass", "_durability", "_indestructible"],
        staff:  ["_indestructible", "_damage", "_doubleHand"],
        sword:  ["_durability", "_indestructible", "_damage", "_doubleHand"]
      };

      // If the item type has properties in propertiesMap, we add them
      if (propertiesMap[data.type]) {
        result.property = propertiesMap[data.type]
          .map(method => this[method](data[method.replace("_", "")])) // We call the corresponding methods
          .filter(Boolean); // Filtering empty values
      }
      return result;
    }
    return false;
  }

  /**
   * Converting parameters "Weight" to string
   * @param {(number|Array)} param - Input data for output
   * @returns {string} - String with parameters
   */
  _weight(param) {
    let value = Array.isArray(param) ? param.join("-") : param;
    return `Weight: ${value}`;
  }

  /**
   * Converting parameters "armorClass" to string
   * @param {(number|Array)} param - Input data for output
   * @returns {string} - String with parameters
   */
  _armorClass(param){
    let value = Array.isArray(param.value) ? param.value.join("-") : param.value;
    return `Armor Class: ${value}`;
  }

  /**
   * Converting parameters "durability" to string
   * @param {(number|Array)} param - Input data for output
   * @returns {string} - String with parameters
   */
  _durability(param){
    let value = Array.isArray(param.value) ? param.value.join("-") : param.value;
    return (value !== null) ? `durability: ${value}` : false;
  }

  /**
   * Converting parameters "indestructible" to string
   * @param {boolean} param - Input data for output
   * @returns {string} - String with parameters
   */
  _indestructible(param){
    return (param) ? "Destructible" : "Indestructible";
  }

  /**
   * Converting parameters "Damage" to string
   * @param {(number|Array)} param - Input data for output
   * @returns {string} - String with parameters
   */
  _damage(param){
    let value = Array.isArray(param) ? param.join("-") : param;
    return (value !== null) ? `Damage: ${value}` : false;
  }
  
  /**
   * Converting parameters "DoubleHand" to string
   * @param {boolean} param - Input data for output
   * @returns {string} - String with parameters
   */
  _doubleHand(param){
    return (param) ? "Two-handed weapon" : "One-handed weapon";
  }

  /**
   * Converts required parameters into an array of strings
   * @param {Object} required - Required parameters
   * @returns {(Array|boolean)} - Array with strings of required parameters or false if empty
   */
  _required(required) {
    if (!Object.keys(required).length) return false;

    /**
     * Map of compliance of parameters with requirements.
     * @type {Object<string, string>}
     */
    const labels = {
        level: "Level required",
        magic: "Magic required",
        strength: "Strength required",
        dexterity: "Dexterity required"
    };

    return Object.entries(required)
        .filter(([key]) => labels[key]) // We leave only the necessary keys
        .map(([key, value]) => `${labels[key]}: ${value}`);
  }
}
