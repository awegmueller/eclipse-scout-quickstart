videogames.Menu = function() {
  videogames.Menu.parent.call(this);

  this.menuItems = [
    ['\uf0e7', 'Kürzlich gespielt'],
    ['\uf187', 'Archiv'],
    ['\uf06b', 'Wunschliste'],
    ['\uf0c0', 'Freunde spielen'],
    ['\uf059', 'Hilfe und Feedback']
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
    var $item = this.$container.appendDiv('vg-menu-item');
    var $icon = $item.appendDiv('icon');
    $item
      .text(item[1])
      .data('menuItem', item)
      .on('mousedown', this._onMenuItemClick.bind(this));
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