videogames.GamesPanel = function() {
  videogames.GamesPanel.parent.call(this);

  this.games = [];
};
scout.inherits(videogames.GamesPanel, scout.Widget);

videogames.GamesPanel.prototype._render = function($parent) {
  this.$container = $parent.appendDiv('games-panel');
  this.$games = this.$container.appendDiv('games');
  this.$status = this.$container.appendDiv('status');
  this.games.forEach(function(game) {
    game.render(this.$games);
  }, this);
};