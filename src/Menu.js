videogames.Menu = function() {
  videogames.Menu.parent.call(this);

  this.menuItems = [
    ['\uf0e7', 'green', 'Kürzlich gespielt'],
    ['\uf187', null, 'Archiv'],
    ['\uf06b', null, 'Wunschliste'],
    ['\uf0c0', null, 'Freunde spielen'],
    ['\uf059', null, 'Hilfe und Feedback']
  ];
};
scout.inherits(videogames.Menu, scout.Popup);

videogames.Menu.prototype._init = function(model) {
  videogames.Menu.parent.prototype._init.call(this, model);
};

videogames.Menu.prototype._render = function($parent) {
  // FIXME awe - es ist wichtig, dass man das macht bevor das element dem DOM hinzugefügt wird
  // versteht das jemand?
  this._glassPaneRenderer = new scout.GlassPaneRenderer(this.session, this, true);
  this._glassPaneRenderer.renderGlassPanes();

  videogames.Menu.parent.prototype._render.call(this, $parent);
  this.$container.addClass('vg-menu-box');

  // add profile
  this._renderProfileMenuItem();

  this.menuItems.forEach(function(item) {
    var $item = this.$container.appendDiv('vg-menu-item')
      .on('mousedown', this._onMenuItemClick.bind(this))
      .data('menuItem', item);
    var $icon = $item.appendDiv('vg-icon')
      .text(item[0]);
    if (item[1]) {
      $icon.addClass(item[1]);
      $icon.addClass(item[1]);
    }
    var $text = $item.appendDiv('vg-text')
      .text(item[2]);
  }, this);
};

videogames.Menu.prototype._renderProfileMenuItem = function() {
  var $item = this.$container.appendDiv('vg-menu-item profile')
    .on('mousedown', this._onMenuItemClick.bind(this));
  var $userName = $item.appendDiv('user-name')
    .text('Emily Kaldwin');
  var $label = $item.appendDiv('label')
    .text('Einstellungen');
};

videogames.Menu.prototype._onMenuItemClick = function(event) {
  var item = $(event.currentTarget).data('menuItem');
  console.log('Clicked on', item);
};

videogames.Menu.prototype._remove = function() {
  videogames.Menu.parent.prototype._remove.call(this);

  this._glassPaneRenderer.removeGlassPanes();
};