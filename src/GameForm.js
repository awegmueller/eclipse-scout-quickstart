videogames.GameForm = function() {
  videogames.GameForm.parent.call(this);
};
scout.inherits(videogames.GameForm, scout.Form);

videogames.GameForm.prototype._jsonModel = function() {
  return scout.models.getModel('videogames.GameForm');
};

videogames.GameForm.prototype._init = function(model) {
  videogames.GameForm.parent.prototype._init.call(this, model);
  scout.assertParameter('game', model.game);

  var okButton = this.widget('OkButton');
  okButton.on('doAction', this._onOkAction.bind(this));
  this.widget('CancelButton').on('doAction', this._onCancelAction.bind(this));

  // FIXME - grid layout muss komplett automatisch passieren
  var grid = new scout.HorizontalGroupBoxBodyGrid();
  grid.validate(this.rootGroupBox);

  var menuBar = this.rootGroupBox.menuBar;
  menuBar.bottom();
  // menuBar.setDefaultMenu(okButton);

  // FIXME - ich glaube es ist schwierig zu erklären warum man nicht programmatisch das default menu
  // setzen kann. Die menuBar hat da in updateDefaultMenu seine eigenen Vorstellungen was das default menu sein
  // soll. Dumm auch, als default menu wird ein menu genommen das auf ENTER reagiert, d.h. man muss einen keystroke
  // dafür konfigurieren. Was man in einer reinen touch app vermutlich eher nicht machen will.

  this.title = this.game.title;
  this.widget('TitleField').setValue(this.game.title);
  this.widget('DeveloperField').setValue(this.game.developer);
  this.widget('GenreField').setValue(this.game.genre);
};

videogames.GameForm.prototype._onOkAction = function(event) {
  this.close(); // FIXME - close function ist für Scout JS momentan nicht brauchbar
  this.session.desktop.hideForm(this);
};

videogames.GameForm.prototype._onCancelAction = function(event) {
  this.close();
  this.session.desktop.hideForm(this);
};

videogames.GameForm.prototype._render = function($parent) {
  videogames.GameForm.parent.prototype._render.call(this, $parent);

};
