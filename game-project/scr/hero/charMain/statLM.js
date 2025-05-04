/**
 * Класс для управления характеристиками, такими как здоровье и мана.
 */
export class StatLM {
    /**
     * Создает экземпляр StatLM.
     * @param {number} [baseValue=0] - Базовое значение характеристики.
     */
    constructor(baseValue = 0) {
        /** @private @type {number} */ this._baseValue = baseValue; // Базовое значение
        /** @private @type {number} */ this._bonus = 0; // Бонус от предметов
        /** @private @type {number} */ this._tempBonus = 0; // Временные бонусы
        /** @private @type {number} */ this._cachedValue = 0; // Итоговое максимальное значение (кеш)
        /** @private @type {number} */ this._currentValue = baseValue; // Текущее значение
        /** @private @type {number} */ this._ratio = 100; // Отношение текущего к максимальному
        this._calculate();
    }
    
    /** @returns {number} Базовое значение характеристики. */
    get base() {
        return this._baseValue;
    }
    
    /** @returns {number} Сумма бонусов от предметов и временных эффектов. */
    get totalBonus() {
        return this._bonus + this._tempBonus;
    }
    
    /** @returns {number} Итоговое максимальное значение характеристики. */
    get maxValue() {
        return this._cachedValue;
    }
    
    /** @returns {number} Бонус от предметов. */
    get equipmentBonus() {
        return this._bonus;
    }
    
    /** @returns {number} Временные бонусы. */
    get temporaryBonus() {
        return this._tempBonus;
    }
    
    /** @returns {number} Текущее значение характеристики. */
    get value() {
        return this._currentValue;
    }
    
    /** @returns {number} Отношение текущего к максимальному значению (в процентах). */
    get ratio() {
        return this._ratio;
    }
    
    /** Пересчитывает все значения. */
    _calculate() {
        this._calculateMaxValue();
        this._calculateRatio();
    }
    
    /** Пересчитывает итоговое максимальное значение. */
    _calculateMaxValue() {
        this._cachedValue = this._baseValue + this._bonus + this._tempBonus;
    }
    
    /** Пересчитывает отношение текущего значения к максимальному. */
    _calculateRatio() {
        this._ratio = Math.round(((this._currentValue * 100) / this._cachedValue) * 10) / 10;
    }
    
    /**
     * Устанавливает бонус от предметов.
     * @param {number} value - Значение бонуса.
     */
    setEquipmentBonus(value) {
        this._bonus = value;
        this._calculate();
    }
    
    /**
     * Добавляет бонус от предметов.
     * @param {number} value - Значение добавляемого бонуса.
     */
    addEquipmentBonus(value) {
        this._bonus += value;
        this._calculate();
    }
    
    /**
     * Удаляет бонус от предметов.
     * @param {number} value - Значение удаляемого бонуса.
     */
    removeEquipmentBonus(value) {
        this._bonus -= value;
        this._calculate();
    }
    
    /** Сбрасывает бонус от предметов. */
    resetEquipmentBonus() {
        this._bonus = 0;
        this._calculate();
    }
    
    /**
     * Устанавливает временный бонус.
     * @param {number} value - Значение временного бонуса.
     */
    setTemporaryBonus(value) {
        this._tempBonus = value;
        this._calculate();
    }
    
    /**
     * Добавляет временный бонус.
     * @param {number} value - Значение добавляемого бонуса.
     */
    addTemporaryBonus(value) {
        this._tempBonus += value;
        this._calculate();
    }
    
    /**
     * Удаляет временный бонус.
     * @param {number} value - Значение удаляемого бонуса.
     */
    removeTemporaryBonus(value) {
        this._tempBonus -= value;
        this._calculate();
    }
    
    /** Сбрасывает временные бонусы. */
    resetTemporaryBonus() {
        this._tempBonus = 0;
        this._calculate();
    }
    
    /**
     * Увеличивает базовое значение характеристики.
     * @param {number} amount - Величина увеличения.
     */
    increaseBase(amount) {
        this._baseValue += amount;
        this._calculate();
        this._currentValue = this._cachedValue;
        this._calculateRatio();
    }
    
    /**
     * Уменьшает базовое значение характеристики.
     * @param {number} amount - Величина уменьшения.
     */
    decreaseBase(amount) {
        this._baseValue = Math.max(0, this._baseValue - amount);
        this._calculate();
    }
    
    /**
     * Наносит урон, уменьшая текущее значение.
     * @param {number} value - Величина урона.
     */
    damage(value) {
        this._currentValue -= value;
        this._calculate();
    }
    
    /**
     * Восстанавливает часть характеристики.
     * @param {number} value - Величина восстановления.
     */
    healing(value) {
        this._currentValue = Math.min(this._currentValue + value, this._cachedValue);
        this._calculate();
    }
    
    /** Полностью восстанавливает характеристику. */
    restore() {
        this._currentValue = this._cachedValue;
        this._calculate();
    }

}