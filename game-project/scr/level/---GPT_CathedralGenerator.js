class CathedralGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.map = this.createEmptyMap();
        this.rooms = [];
    }

    createEmptyMap() {
        return Array.from({ length: this.height }, () =>
            Array(this.width).fill('#') // '#' — стена, '.' — пол
        );
    }

    generate() {
        const centerX = Math.floor(this.width / 2);
        const centerY = Math.floor(this.height / 2);

        // Создаём центральные комнаты
        this.createRoom(centerX - 4, centerY - 4, centerX + 4, centerY + 4);
        this.createRoom(centerX - 10, centerY - 2, centerX + 10, centerY + 2);
        
        // Генерируем остальные комнаты
        this.generateRooms(centerX - 4, centerY - 4, centerX + 4, centerY + 4, 4);

        // Соединяем комнаты коридорами
        this.connectRooms();

        // Добавляем стены
        this.placeWalls();

        return this.map;
    }

    createRoom(x1, y1, x2, y2) {
        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                if (this.isInsideMap(x, y)) {
                    this.map[y][x] = '.';
                }
            }
        }
        this.rooms.push({ x1, y1, x2, y2, cx: Math.floor((x1 + x2) / 2), cy: Math.floor((y1 + y2) / 2) });
    }

    generateRooms(x1, y1, x2, y2, depth) {
        if (depth <= 0) return;

        const directions = [
            { dx: 0, dy: -1 }, // вверх
            { dx: 0, dy: 1 },  // вниз
            { dx: -1, dy: 0 }, // влево
            { dx: 1, dy: 0 }   // вправо
        ];
        directions.forEach(({ dx, dy }) => {
            if (Math.random() < 0.6) {
                let w = 4 + Math.floor(Math.random() * 4);
                let h = 4 + Math.floor(Math.random() * 4);
                let nx1 = x1 + dx * (w + 2);
                let ny1 = y1 + dy * (h + 2);
                let nx2 = nx1 + w;
                let ny2 = ny1 + h;

                if (this.isInsideMap(nx1, ny1) && this.isInsideMap(nx2, ny2)) {
                    this.createRoom(nx1, ny1, nx2, ny2);
                    this.generateRooms(nx1, ny1, nx2, ny2, depth - 1);
                }
            }
        });
    }

    connectRooms() {
        for (let i = 1; i < this.rooms.length; i++) {
            let roomA = this.rooms[i - 1];
            let roomB = this.rooms[i];

            let x1 = roomA.cx, y1 = roomA.cy;
            let x2 = roomB.cx, y2 = roomB.cy;

            if (Math.random() < 0.5) {
                this.createHorizontalCorridor(x1, x2, y1);
                this.createVerticalCorridor(y1, y2, x2);
            } else {
                this.createVerticalCorridor(y1, y2, x1);
                this.createHorizontalCorridor(x1, x2, y2);
            }
        }
    }

    createHorizontalCorridor(x1, x2, y) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            if (this.isInsideMap(x, y)) this.map[y][x] = '.';
        }
    }

    createVerticalCorridor(y1, y2, x) {
        for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            if (this.isInsideMap(x, y)) this.map[y][x] = '.';
        }
    }

    placeWalls() {
        for (let y = 1; y < this.height - 1; y++) {
            for (let x = 1; x < this.width - 1; x++) {
                if (this.map[y][x] === '.' && this.hasAdjacentWall(x, y)) {
                    this.map[y][x] = '#';
                }
            }
        }
    }

    hasAdjacentWall(x, y) {
        return (
            this.map[y - 1][x] === '#' ||
            this.map[y + 1][x] === '#' ||
            this.map[y][x - 1] === '#' ||
            this.map[y][x + 1] === '#'
        );
    }

    isInsideMap(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    printMap() {
        console.log(this.map.map(row => row.join('')).join('\n'));
    }
}

const generator = new CathedralGenerator(40, 30);
generator.generate();
generator.printMap();
