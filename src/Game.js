videogames.Game = function() {
  videogames.Game.parent.call(this);

  this.title = null;
  this.genre = null;
  this.developer = null;
  this.image = null;
  this.selected = false;
}
scout.inherits(videogames.Game, scout.Widget);

videogames.Game.prototype._render = function($parent) {
  this.$container = $parent.appendDiv('game');
  this.$imageBox = this.$container.appendDiv('image-box');
  this.$image = this.$imageBox.appendElement('<img>', 'image')
    .attr('src', this.image);
  this.$info = this.$container.appendDiv('info');
  this.$title = this.$info.appendDiv('title')
    .text(this.title);
  this.$developer = this.$info.appendDiv('developer')
    .text(this.developer);
  this.$genre = this.$info.appendDiv('genre')
    .text(this.genre);

  this.$container.on('click', this._onClick.bind(this));
};

videogames.Game.prototype._renderProperties = function() {
  videogames.Game.parent.prototype._renderProperties.call(this);
  this._renderSelected();
};

videogames.Game.prototype._onClick = function(event) {
  this.trigger('selected', {game: this});
};

videogames.Game.prototype.setSelected = function(selected) {
  this.setProperty('selected', selected);
};

videogames.Game.prototype._renderSelected = function() {
  this.$container.toggleClass('selected', this.selected);
};