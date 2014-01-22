(function() {
	var GridPack = (function() {
		var GridPack = function() {
			this.isPacked = false;
		}

		Object.defineProperty(GridPack.prototype, 'grid', {
			get: function grid() {
				return (this.isPacked ? this.packed : this.unpacked);
			},

			set: function grid(value) {
				if (value.length) {
					this.isPacked = false;
					this.unpacked = value;
				}
				else {
					this.isPacked = true;
					this.packed = value;
				}
			}
		});

		Object.defineProperty(GridPack.prototype, 'packed', {
			get: function packed() {
				if (this._packed != undefined) {
					return this._packed;
				}
				else if (this._unpacked != undefined) {
					return this.pack();
				}
			},

			set: function packed(value) {
				this._packed = value;
			}
		});

		Object.defineProperty(GridPack.prototype, 'unpacked', {
			get: function unpacked() {
				if (this._unpacked != undefined) {
					return this._unpacked;
				}
				else if (this._packed != undefined) {
					return this.unpack();
				}
			},

			set: function unpacked(value) {
				this._unpacked = value;
			}
		});

		GridPack.prototype.pack = function() {
			var i = 0, axis = ['x', 'y'];

			this._packed = this._unpacked;

			while (this._packed.length > 1 && i < 100) {
				for (var xy in axis) {
					var remaining = [];
					var result = [];

					for (var i in this._packed) {
						remaining.push(this._packed[i]);
					}

					while (remaining.length) { 
						var item = remaining[0];

						this.removeFromArray(item, remaining);

						if (neighbours = this.getNeighbours(item, axis[xy])) {
							for (var n in neighbours) {
								this.removeFromArray(neighbours[n], remaining);
							}

							neighbours.push(item);

							item = {w:0,h:0,children:neighbours};

							this.computeGroupDimensions(item);				
						}

						result.push(item);
					}

					this._packed = result;
				}

				i++;
			}

			this.isPacked = true;

			return this._packed;
		}

		GridPack.prototype.unpack = function(packed) {
			packed = packed || this._packed;

			this._unpacked = [];

			for (var i in packed) {
				if (packed[i].children) {
					this._unpacked = this._unpacked.concat(this.unpack(packed[i].children));
				}
				else {
					this._unpacked.push(packed[i]);
				}
			}

			this.isPacked = false;

			return this._unpacked;
		}

		GridPack.prototype.getNeighbours = function(item, axis) {
			var self = this, neighbour, neighbours = [], directions = (axis == 'x' ? ['r', 'l'] : ['b', 't']);

			directions.forEach(function(direction) {
				neighbour = item;
				while (neighbour = self.getNeighbour(neighbour, direction)) {
					neighbours.push(neighbour);
				}
			});

			return neighbours.length ? neighbours : false;
		}

		GridPack.prototype.getNeighbour = function(item, direction) {
			for (var i in this.packed) {
				if (direction == 'l'
				 && this.packed[i].y == item.y && this.packed[i].h == item.h
				 && this.packed[i].x + this.packed[i].w == item.x) {
					return this.packed[i];
				}
				if (direction == 'r'
				 && this.packed[i].y == item.y && this.packed[i].h == item.h
				 && this.packed[i].x == item.x + item.w) {
					return this.packed[i];
				}
				else if (direction == 'b'
				 && this.packed[i].x == item.x && this.packed[i].w == item.w
				 && this.packed[i].y == item.y + item.h) {
					return this.packed[i];
				}
				else if (direction == 't'
				 && this.packed[i].x == item.x && this.packed[i].w == item.w
				 && this.packed[i].y + this.packed[i].h == item.y) {
					return this.packed[i];
				}
			}

			return false;
		}

		GridPack.prototype.removeFromArray = function(item, arr) {
			var i = arr.length
			while (i--) {
				if (arr[i] == item) {
					arr.splice(i, 1);
				}
			}
		}

		GridPack.prototype.computeGroupDimensions = function(group) {
			var minX, maxX, minY, maxY;

			for (var i in group.children) {
				if (!('x' in group) || group.children[i].x < group.x) {
					group.x = group.children[i].x;
				}
				if (!('y' in group) || group.children[i].y < group.y) {
					group.y = group.children[i].y;
				}
			}
			
			for (var i in group.children) {
				if (minX == undefined || group.children[i].x < minX) {
					minX = group.children[i].x;
				}
				if (maxX == undefined || group.children[i].x + group.children[i].w > maxX) {
					maxX = group.children[i].x + group.children[i].w;
				}
				group.w = maxX - minX;

				if (minY == undefined || group.children[i].y < minY) {
					minY = group.children[i].y;
				}
				if (maxY == undefined || group.children[i].y + group.children[i].h > maxY) {
					maxY = group.children[i].y + group.children[i].h;
				}
				group.h = maxY - minY;
			}
		}

		return GridPack;
	})();

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = GridPack;
	}
	else {
		window.GridPack = GridPack;
	}
})();