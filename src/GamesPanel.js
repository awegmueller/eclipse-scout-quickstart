videogames.GamesPanel = function() {
  videogames.GamesPanel.parent.call(this);

  this.games = [];
  this.selectedGame = null;
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

  var desktop = this.session.desktop,
    gameForm = scout.create('videogames.GameForm', {
    parent: desktop,
    game: game
  });
  desktop.showForm(gameForm);
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

