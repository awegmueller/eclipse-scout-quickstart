videogames.GamesPanel = function() {
  videogames.GamesPanel.parent.call(this);

  this.games = [];
  this.selectedGame = null;
  this.infoPanel = null;
  this.gameSelectedHandler = this._onGameSelected.bind(this);
};
scout.inherits(videogames.GamesPanel, scout.Widget);

videogames.GamesPanel.prototype._init = function(model) {
  videogames.GamesPanel.parent.prototype._init.call(this, model);

  this.games.forEach(function(game) {
    game.setParent(this);
    game.on('selected', this.gameSelectedHandler);
  }, this);
};

videogames.GamesPanel.prototype._onGameSelected = function(event) {
  var game = event.game;
  if (this.selectedGame) {
    this.selectedGame.setSelected(false);
  }
  if (game) {
    game.setSelected(true);
  }
  this.selectedGame = game;
  this._showInfoPanel();
};

videogames.GamesPanel.prototype._showInfoPanel = function() {
  // fade out the old info panel
  var desktop = this.session.desktop;
  var oldInfoPanel = this.infoPanel;

  if (oldInfoPanel) {
    oldInfoPanel.hide();
    this.infoPanel = null;
  }

  // fade in the new panel
  if (this.selectedGame) {
    var newInfoPanel = scout.create('videogames.InfoPanel', {
      parent: desktop,
      game: this.selectedGame
    });
    newInfoPanel.show();
    this.infoPanel = newInfoPanel;
  }
};

videogames.GamesPanel.prototype._render = function($parent) {
  this.$container = $parent.appendDiv('games-panel');
  this.$games = this.$container.appendDiv('games');
  this.$status = this.$container.appendDiv('status');
  this.games.forEach(function(game) {
    game.render(this.$games);
  }, this);
  this._installScrollbars();
};

videogames.GamesPanel.prototype._installScrollbars = function() {
  scout.scrollbars.install(this.$games, {
    parent: this,
    axis: 'x'
  });
};

videogames.GamesPanel.prototype._remove = function($parent) {
  scout.scrollbars.uninstall(this.$games, this.session);
};

