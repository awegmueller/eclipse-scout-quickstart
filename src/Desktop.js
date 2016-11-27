videogames.Desktop = function() {
  videogames.Desktop.parent.call(this);

  this.vgMenu = null;
  this.gamesPanel = null;
};
scout.inherits(videogames.Desktop, scout.Desktop);

videogames.Desktop.prototype._init = function(model) {
  videogames.Desktop.parent.prototype._init.call(this, model);

  // FIXME: das sollte default sein, wenn es keine outlines gibt
  this.setNavigationVisible(false);
  this.setNavigationHandleVisible(false);



  this.gamesPanel = scout.create('videogames.GamesPanel', {
    parent: this
  });

  var deusEx = scout.create('videogames.Game', {
    parent: this.gamesPanel,
    title: 'Deux Ex Mankind Divided',
    genre: 'Stealth Action',
    developer: 'Square Enix',
    image: '/img/deus-ex-mankind-divided.jpg'
  });

  var dontStarve = scout.create('videogames.Game', {
    parent: this.gamesPanel,
    title: 'Don\'t Starve',
    genre: 'Open World Survival',
    developer: 'Klei Entertainment',
    image: '/img/dont-starve.jpeg'
  });

  var uncharted = scout.create('videogames.Game', {
    parent: this.gamesPanel,
    title: 'Uncharted 4',
    genre: 'Action Adventure',
    developer: 'Naughty Dog',
    image: '/img/uncharted4.jpg'
  });

  var metalGear = scout.create('videogames.Game', {
    parent: this.gamesPanel,
    title: 'Metal Gear Solid V',
    genre: 'Stealth Shooter',
    developer: 'Koijma Productions',
    image: '/img/mgsv.png'
  });

  this.gamesPanel.games = [deusEx, dontStarve, uncharted, metalGear]; // FIXME make a setter
};

videogames.Desktop.prototype._renderProperties = function() {
  videogames.Desktop.parent.prototype._renderProperties.call(this);

  // FIXME das ist falsch: die header instanz im desktop wird erst im renderHeader
  // gemacht. wegen dem !check gehen die menus vom init komplett verloren.
  // Muss ins Desktop#_init Dann kann man auch setMenus im init machen
  this.mainMenu = scout.create('Menu', {
    cssClass: 'desktop-tool-box-item menu-box-item', // FIXME warum werden die nicht automatisch gesetzt?
    horizontalAlignment: -1,
    iconId: 'font:awesomeIcons \uf0c9',
    parent: this
  });
  this.mainMenu.on('doAction', this._onMainMenuAction.bind(this));
  this.setMenus([this.mainMenu]);

  this._renderGamesPanel();
};

videogames.Desktop.prototype._render = function($parent) {
  videogames.Desktop.parent.prototype._render.call(this, $parent);

  // FIXME das macht man wohl auch nur wenn man Scout committer ist :-(
  // Der Hauptnachteil ist wirklich, dass wenn man mit den bestehenden Scout Widgets arbeiten will, nicht mehr
  // mit Standard Mitteln arbeiten kann, sondern nur noch via API / JavaScript. Man könnte zwar seine eigenen, rein
  // CSS basierten Widgets machen. Aber dann nutzt man ja eigentlich fast nichts mehr von Scout. Das ist Schade, denn
  // viele Widgets wären sehr nützlich, z.B. Popup
  this.header.toolBox.setHorizontalAlignment(-1);
};

// FIXME das ist auch etwas seltsam, besser wäre es hier wenn man den bench entweder komplett ersetzen könnte
// (widget) oder immerhin auf dem bench eine Methode setContent vorhanden wäre.
videogames.Desktop.prototype._renderGamesPanel = function() {
  this.gamesPanel.render(this.bench.$container);
};

videogames.Desktop.prototype._onMainMenuAction = function(event) {
  var leftX = scout.graphics.getSize(this.$container).width;

  // FIXME: irgendwie ist es schweine kompliziert ein popup zu machen. Wenn ich Scout nicht ein
  // bisschen kennen würde wäre ich vermutlich daran verzweifelt. Dinge die mit etwas CSS ganz einfach
  // sind, sind plötzlich schwierig. Und anstatt einfach CSS auszuprobieren, muss ich häufig die API
  // der Scout widgets studieren oder mir den Source-Code davon anschauen. Aber vielleicht hilft hier eine gute
  // Doku mit vielen Beispieln auch?
  this.vgMenu = scout.create('videogames.Menu', {
    parent: this,
    $anchor: this.mainMenu.$container,
    windowPaddingX: 0, // FIXME: oh mann :-( ewig gesucht
    location: {
      x: 0,
      y: 0
    }
  });
  this.vgMenu.setCssClass('slide-in');
  this.vgMenu.open();
  this.vgMenu.setLocation(new scout.Point(-200, 0));
};