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

  this._installScrollbars();
  this._installScrollbars();
};

// FIXME cgu fragen warum desktop im chrome mobile modus viel zu breit ist
// und warum die scrollbars nicht funktionieren. Brauchen die ein Layout?

videogames.GamesPanel.prototype._installScrollbars = function() {
  scout.scrollbars.install(this.$games, {
    parent: this,
    axis: 'x',
    nativeScrollbars: true
  });
};

videogames.GamesPanel.prototype._remove = function($parent) {
  scout.scrollbars.uninstall(this.$games, this.session);
};

