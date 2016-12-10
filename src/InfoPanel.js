videogames.InfoPanel = function() {
  videogames.InfoPanel.parent.call(this);

  this.editButton = null;
  this.game = null;
  this.defaultText = '';
};
scout.inherits(videogames.InfoPanel, scout.Widget);

videogames.InfoPanel.prototype._init = function(model) {
  videogames.InfoPanel.parent.prototype._init.call(this, model);

  // FIXME: wenn ich das im CTOR setze wird es wieder überschrieben irgendwo, das sollte nicht sein
  // ist wahrscheinlich ein genrelles problem das wir uns ansehen sollten, also defaults die im ctor
  // gesetzt werden VS defaults die im init gesetzt werden. Wenn etwas im ctor einer sub-klasse gemacht
  // wird, sollte das init der super klasse das nicht kaputt machen.
  // Das ist übrigens auch eines der GUTEN Basis Konzepte die man nicht neu erfinden muss
  // braucht aber auch Doku und Beispiele
  this.animateRemoval = true;

  this.editButton = scout.create('Button', {
    parent: this,
    label: 'Bearbeiten',
    iconId: 'font:awesomeIcons \uf040'
  });
  this.editButton.on('click', this._onEditAction.bind(this));
};

videogames.InfoPanel.prototype._render = function($parent) {
  var hasGame = !!this.game;

  this.$container = $parent.appendDiv('vg-info-panel');
  this.$description = this.$container.appendDiv('description');
  this.$description.html(hasGame ? this.game.description : this.defaultText);

  // FIXME: im vanilla scout sollte nie ein layout gesetzt sein
  this.editButton.render(this.$container);
  this.editButton.htmlComp.setLayout(new scout.NullLayout());
  this.editButton.setVisible(hasGame);
};

videogames.InfoPanel.prototype._onEditAction = function(event) {
  var desktop = this.session.desktop,
    game = desktop.gamesPanel.selectedGame, // FIXME: das hier richtig machen
    gameForm = scout.create('videogames.GameForm', {
      parent: desktop,
      game: game
    });
  desktop.showForm(gameForm);
};

videogames.InfoPanel.prototype.hide = function() {
  this.$container.addClassForAnimation('fade-out');
  this.destroy();
};

videogames.InfoPanel.prototype.show = function() {
  if (!this.parent.rendered) {
    return;
  }
  setTimeout(function() { // FIXME: wie mache ich das am schönsten nach fade-out? evtl. auf destroy listener warten?
    this.render(this.parent.bench.$container);
    this.$container.addClassForAnimation('fade-in');
  }.bind(this), 400);
};

// FIXME: der Button kann nicht verwendet werden, weil im _initKeyStrokeContext, getForm()
// aufgerufen wird, was natürlich nicht vorhanden ist wenn form-less verwendet
scout.Button.prototype._initKeyStrokeContext = function() {
  this.keyStrokeContext = null;
};

